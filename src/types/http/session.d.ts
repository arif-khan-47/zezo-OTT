export interface ISessionData {
    user: {
      info: {
        id: string;
        name: string;
        phone: number;
        email: string;
        role: 'user' | 'admin';
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
      }
    } | null,
    accessToken: string | null,
    refreshToken: string | null,
    accessTokenExpiry: string | null,
    expires: '2023-01-30T18:24:13.318Z' | null
  }