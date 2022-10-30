import { AxiosRequestConfig } from "axios";

export const TwitterConfig: AxiosRequestConfig = {
    baseURL: "https://api.twitter.com/2/",
    headers: {
        "Authorization": `Bearer ${process.env.TWITTER_KEY}`,
        "content-type": "application/json"
    }
}