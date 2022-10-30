import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import axios from "axios";
import { TwitterConfig } from "../../../../lib/TwitterConfig";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET"],
        origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

    const { username } = req.query;

    try {
        const twitterRes = await  axios.get("users/by/username/" + username + "?user.fields=public_metrics,profile_image_url", TwitterConfig);
        return res.status(twitterRes.status).send(twitterRes.data.data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}