import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import { TwitterConfig } from "../../../../lib/TwitterConfig";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await NextCors(req, res, {
            methods: ["GET", "POST"],
            origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
            optionsSuccessStatus: 200
        });
        
        const { id } = req.query;


        const result = await axios.get("users/" + id + "?user.fields=profile_image_url", TwitterConfig);
        if (result.status !== 200) {
            return res.status(result.status).send(result.data);
        }
        return res.status(result.status).send(result.data);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}