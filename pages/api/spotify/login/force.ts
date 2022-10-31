import { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";
import NextCors from "nextjs-cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const scope = "streaming \ user-read-email \ user-read-private";
	const state = randomUUID();
	const qParams = new URLSearchParams({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID as string,
		scope: scope,
		redirect_uri: "https://spotify-auth-proxy.vercel.app/api/auth/callback",
		state: state,
		show_dialog: "true"
	});

	res.redirect("https://accounts.spotify.com/authorize/?" + qParams.toString());
}