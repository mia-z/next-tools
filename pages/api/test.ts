import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
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