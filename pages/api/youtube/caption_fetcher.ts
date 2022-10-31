import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import axios from "axios";
import xml2js from "xml2js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await NextCors(req, res, {
            methods: ["GET", "POST"],
            origin: ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"],
            optionsSuccessStatus: 200
        });
        
        const { youtubeUrl } = req.query;

        if (typeof youtubeUrl !== "string") {
            res.status(400);
            res.send("must give a youtubeUrl parameter with valid youtube url");
            res.end();
            return;
        }

        const { data } = await axios.get<string>(youtubeUrl as string);

        const match = data.match(/(?<j>(?=\[{"baseUrl":)(.*?)(?<=}\]))/ig)

        if (match === null) {
            res.status(404);
            res.send("No captions found for that video");
            res.end();
            return;
        }

        const parsed = JSON.parse(match[0]) as CaptionsResource[];

        if (parsed === null) {
            res.status(500);
            res.send("error when trying to parse the found match to json: " + JSON.stringify(parsed));
            res.end();
            return;
        }

        if (parsed[0] === null) {
            res.status(500);
            res.send("no first element in the parsed regex match");
            res.end();
            return;
        }

        if (parsed[0].baseUrl === null) {
            res.status(500);
            res.send("baseUrl of first element in the parsed regex match is null or doesnt exist");
            res.end();
            return;
        }

        const captionsXml = await axios.get<string>(parsed[0].baseUrl)

        if (captionsXml.data === null) {
            res.status(500);
            res.send("baseUrl of first element in the parsed regex match is null or doesnt exist");
            res.end();
            return;
        }

        const captionsJson = await xml2js.parseStringPromise(captionsXml.data);
        
        if (captionsJson === null) {
            res.status(500);
            res.send("error when parsing captionsxml to json");
            res.end();
            return;
        }

        const captions: Caption[] = captionsJson.transcript.text.map(({ _, $: { start, dur } }: any) => {
            return {
                caption: _,
                start: start,
                dur: dur
            }
        });

        res.send(captions);
        res.end();
        return;
    } catch(e) {
        res.status(500);
        res.send("meme");
        return;
    }
}