declare interface IContentlanguage {
    _id: string,
    name: string,
}

declare interface IContentCast {
    _id: string,
    name: string,
    avatar: string | null,
    castType: string,
}

declare interface ISubtitles {
    title?: string | undefined;
    language?: string | undefined;
    type: 'application/x-subrip' | 'application/ttml+xml' | 'text/vtt';
    url: string;
}

declare interface IContentEpisodes {
    _id: string,
    name: string,
    description: string,
    duration: number,
    source_link: string,
    trailer_source_link: string,
    source_type: 'HLS' | 'MP4',
    content_offering_type: 'FREE' | 'PREMIUM',
    subtitles: ISubtitles[],
    thumbnail: string,
    createdAt: string,
    updatedAt: string,
}

declare interface IContentSeasons {
    _id: string,
    name: string,
    contant_id: string,
    order: number,
    episodes: IContentEpisodes[] | null,
    status: boolean,
    created_by: string,
    createdAt: string,
    updatedAt: string,
}

declare interface IContentCategory {
    _id: string,
    name: string,
}

declare interface IContentGenres {
    _id: string,
    name: string,
}

declare interface IContentPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

declare interface IContentMeta {
    pagination: IContentPagination,
    report: any | null,
}

declare interface IContentData {
    _id: string,
    name: string,
    slug: string,
    u_age: string,
    description: string,
    duration: string,
    rating: number,
    source_link: string | null,
    source_type: 'HLS' | 'MP4' | 'LIVE_STREAM_HLS'
    trailer_source_link: string | null,
    trailer_source_type: 'HLS' | 'MP4',
    language: IContentlanguage[] | null
    cast: IContentCast[] | null,
    poster: string,
    thumbnail: string,
    views: number
    tags: string[],
    job_id: string | null,
    seasons: IContentSeasons[] | null,
    status: 'PUBLIC' | 'PRIVATE' | 'PENDING' | 'REJECTED',
    trash: boolean,
    type: 'series' | 'movie' | 'live_stream',
    content_offering_type: 'FREE' | 'PREMIUM' | 'BUY_OR_RENT',
    updated_by: string,
    created_by: string,
    createdAt: string,
    updatedAt: string,
    category: IContentCategory[] | null,
    genres: IContentGenres[] | null,
    subtitles: ISubtitles[],
    is_buy_or_rent?: "BUY" | "RENT";
    rent_duration?: number | null;
    price?: number | null;
    buy_or_rent_status: {
        _id?: string,
        status?: "valid" | "expired"
    }[]

}

declare interface IContent {
    data: IContentData[],
    meta: IContentMeta,
}

declare interface IRentOrBuyContentData {
    _id: string;
    content_id: IContentData;
    user_id: string;
    status: "valid" | "expired"
    valid_upto: string,
    createdAt: string,
    updatedAt: string,
}
// rent or buy content
declare interface IRentOrBuyContent {
    data: IRentOrBuyContentData[],
    meta: IContentMeta,
}
