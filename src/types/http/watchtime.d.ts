export interface IwatchtimeCount {
  content_id: string;
  episode_id: string | null;
  time: number;
  ip_address: string | null;
  platform: 'web' | null;
  city: string | null;
  location: string | null;
  region: string | null;
  timezone: string | null;
}