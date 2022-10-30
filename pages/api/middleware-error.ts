import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

    const { error } = req.query;

    try {
        res.status(500);
        res.send("Middleware error: " + error);
        res.end();
        return;
    } catch (e) {
        res.status(500);
        res.send(e);
        res.end();
        return;
    }
}