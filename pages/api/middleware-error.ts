import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
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