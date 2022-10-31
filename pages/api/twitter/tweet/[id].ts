import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import { TwitterConfig } from "../../../../lib/TwitterConfig";
import axios from "axios";
import { ALLOWED_URLS } from "../../../../lib/Config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await NextCors(req, res, {
            methods: ["GET", "POST"],
            origin: ALLOWED_URLS,
            optionsSuccessStatus: 200
        });
        
        const { id } = req.query;

        const result = await axios.get("tweets/" + id + "?tweet.fields=created_at,in_reply_to_user_id,author_id&expansions=referenced_tweets.id", TwitterConfig);
        if (result.status !== 200) {
            return res.status(result.status).send(result.data);
        }
        return res.status(result.status).send(result.data);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}