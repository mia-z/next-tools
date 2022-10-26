import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import axios from "axios";

const vods_playlist_id = "PLFs19LVskfNzQLZkGG_zf6yfYTp_3v_e6";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
        optionsSuccessStatus: 200
    });

	const vods = await axios.get(`
        https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails
        &maxResults=25
        &playlistId=${vods_playlist_id}
        &key=${process.env.YOUTUBE_API_KEY}
    `);

    return vods.data;
}