declare type CaptionsResource = {
    baseUrl: string,
    name: {
        simpleText: string,
    },
    vssId: string,
    languageCode: string,
    kind: string,
    isTranslatable: boolean
}

declare type Transcript = {
    captins: Array<Caption>
}

declare type Caption = {
    caption: string,
    start: number,
    dur: number
}