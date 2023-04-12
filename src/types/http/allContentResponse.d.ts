export interface IAllContentResponse {
    message: string;
    data: {
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
      language: {
        _id: string,
        name: string,
      }[] | null,
      cast: {
        _id: string,
        name: string,
        avatar: string | null,
        type: string,
      }[] | null,
      poster: string,
      thumbnail: string,
      tags: string[],
      seasons: {
        _id: string,
        name: string,
        content_id: string,
        order: number,
        episodes: {
          _id: string,
          name: string,
          description: string,
          duration: number,
          source_link: string,
          source_type: 'HLS' | 'MP4',
          content_offering_type: 'FREE' | 'PREMIUM',
          thumbnail: string,
          createdAt: string,
          updatedAt: string,
        }[] | null,
        status: boolean,
        created_by: string,
        createdAt: string,
        updatedAt: string,
      }[] | null,
      type: 'series' | 'movie' | 'live_stream',
      content_offering_type: 'FREE' | 'PREMIUM',
      updated_by: string,
      created_by: string,
      createdAt: string,
      updatedAt: string,
      category: {
        _id: string,
        name: string,
      }[] | null,
      genres: {
        _id: string,
        name: string,
      }[] | null,
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      },
      report: {
        total: number;
        totalPublic: number;
        totalPrivate: number;
      }
    } | null;
  }