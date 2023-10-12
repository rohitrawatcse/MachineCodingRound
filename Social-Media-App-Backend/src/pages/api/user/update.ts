import { ObjectId } from "mongodb";
import { User } from "@/models/user";
import { connectMongoDB } from "@/lib/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "@/lib/middleware";
import verifyToken from "@/lib/verifyToken";

// GET - GET USER BY ID - POPULATE FOLLOWERS, FOLLOWING, AND BOOKMARKS
// PATCH - UPDATE USER BY ID
// DELETE - DELETE USER BY ID
async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // get auth token from header
    const token = req.headers.authorization;
    // if token is not provided, return error response
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const tokenData: any = verifyToken(token);
    // if token is not valid, return error response
    if (!tokenData) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // if token is valid, extract userId from token
    const userId = tokenData.userId;

    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        await connectMongoDB();

        // UPDATE USER BY ID
        // GET DATA FROM BODY
        const { firstName, lastName, username, email, link, bio, pic, verified } = req.body;
        // UPDATE USER BY ID
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findOneAndUpdate({ _id: new ObjectId(userId) }, {
            firstName,
            lastName,
            username,
            email,
            link,
            bio,
            pic,
            verified,
            updatedAt: new Date()
        });

        return res.status(200).json({ message: "User updated successfully" });
    }

    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

async function getUserById(userId: string) {
    const user = await User.findById(userId)
        .populate('following', '_id firstName pic username')
        .populate('followers', '_id firstName pic username')

    if (user.bookmarks && user.bookmarks.length > 0) {
        await user.populate({
            path: 'bookmarks',
            populate: {
                path: 'author',
                select: '_id firstName pic username'
            }
        });
    }

    return user;
}

export default async function myAPI(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    return handler(req, res);
}  
