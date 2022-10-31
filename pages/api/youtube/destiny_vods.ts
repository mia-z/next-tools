import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import axios from "axios";

const vods_playlist_id = "PLFs19LVskfNzQLZkGG_zf6yfYTp_3v_e6";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { results } = req.query;

    const maxResults = results ?? 25;
console.warn(maxResults)
    try {
        const vods = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${vods_playlist_id}&key=${process.env.YOUTUBE_API_KEY}`, 
        { headers: { "Accept": "application/json", "Content-Type": "application/json" } });
        res.send(vods.data);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}