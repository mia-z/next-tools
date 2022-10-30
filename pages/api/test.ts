import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

    try {
        res.status(200);
        res.send("OK");
        res.end();
        return;
    } catch (e) {
        res.status(500);
        res.send(e);
        res.end();
        return;
    }
}