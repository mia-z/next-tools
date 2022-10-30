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

    const { id } = req.query;

    try {
        const twitterRes = await  axios.get("tweets/" + id + "?tweet.fields=created_at,in_reply_to_user_id,author_id&expansions=referenced_tweets.id", TwitterConfig);
        return res.status(twitterRes.status).send(twitterRes.data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}