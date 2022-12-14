import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import axios from "axios";

const vods_playlist_id = "PLFs19LVskfNzQLZkGG_zf6yfYTp_3v_e6";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await NextCors(req, res, {
            methods: ["GET", "POST"],
            origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
            optionsSuccessStatus: 200
        });
        
        const { results } = req.query;

        const maxResults = results ?? 25;

        const vods = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${vods_playlist_id}&key=${process.env.YOUTUBE_API_KEY}`, 
        { headers: { "Accept": "application/json", "Content-Type": "application/json" } });
        res.send(vods.data);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}