import axios from "axios";
import { ClientJS } from 'clientjs'
import { publicIpv4 } from 'public-ip';
import { IAllContentResponse } from "../types/http/allContentResponse";
import { IwatchtimeCount } from "../types/http/watchtime";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export interface IVerifyOtpPayload {
    hash: string|undefined;
    otp: number | string;
    phone: number | undefined;
  }

// list of the all endpoints




// auth endpoints
export const verifyOTP = (data: IVerifyOtpPayload) => api.post("/auth/verify-otp", data);
export const login = (data: any) => api.post("/auth/login", data);
export const whoami = () => api.get("/auth/whoami");


export const loginWithEmail = (data: any) => api.post("/auth/login?auth_type=email", data);
export const register = (data: any) => api.post("/auth/register", data);
export const updateUser = (data: any) => api.put("/users/update/self", data, {
  headers: {
    "Content-Type": "multipart/form-data"
   }
});







// get website settings from server
export const getWebsiteSettings = (): Promise<IWebsiteSettings> => api.get("/settings").then((res) => res.data)

// get categorys
export const getCategories = (): Promise<IGetCategories> => api.get("/categories").then((res) => res.data)

// get categorys
export const getCategoryBySlug = (slug:string|undefined): Promise<any> => api.get(`/beta-section?category=${slug}`).then((res) => res.data)





// all sections data
export const getAllSections =(): Promise<IGetSections> =>api.get("/beta-section").then((res) => res.data)

//get content by slug
export const getContentEndpoint = (queryString?: string) => api.get<IAllContentResponse>(`/content?slug=${queryString || ''}`);

//get favorite
export const addFavorite = (id:string|any) => api.post("/favorite",id);
export const delFavorite = (id:string) => api.delete(`/favorite/${id}`)

// subscriptions endpoint
// export const getSubscriptions = (): Promise<IAllSubscription> => api.get(`/subscriptions`).then((res) => res.data)
export const getSubscriptions = (): Promise<IAllSubscription> => api.get(`/subscriptions`).then((res) => res.data)
export const checkIsPrimium = () => api.get("/subscription/check");

//Search endpoint
export const searching = (queryString?: string) => api.get<IAllContentResponse>(`/search?query=${queryString}`);

// watchtime endpoint
export const addWatchTime = (data: IwatchtimeCount, headers: any) => api.post(`/watchtime`, data, { headers });

export const countView = (data: any, headers: any) => api.post(`/views/count`, data, { headers });



// history endpoint
export interface IHistoryPayload {
    id: string;
    currentTime: number;
    current_season?: string;
    current_episode?: string;
  }
  export const addToHistoryEndpoint = (data: IHistoryPayload, headers: any) => api.post(`/history`, data, { headers });
  export const updateHistoryEndpoint = (data: IHistoryPayload, headers: any) => api.put(`/history`, data, { headers });
  export const getHistory = () => api.get(`/history`);

  // contect endpoint
export const getContect = (query: string) => api.get(`/content?${query}`);
export const getContentSignCookieEndPoint = (id: string, query: "url" | "cookie") => api.get(`/content/stream/${id}?type=${query}`);

export const getSections = () => api.get(`/section`);


// payment endpoints
export const checkout = (data:any, headers:any) => api.post(`/payments/checkout`, data, { headers });

export const verifyPayment = (data:any, headers:any) => api.post(`/payments/verify`, data, { headers });

// users endpoint
export const deactivateAccount = () => api.delete(`/users`);


// content endpoints
export const getAllContentEndpoint = (queryString?: string) => api.get<IAllContentResponse>(`/content?${queryString || ''}`);
export const searchContentEndpoint = (queryString?: string) => api.get<IAllContentResponse>(`/search?query=${queryString}`);

// add headers to all requests using async/await
api.interceptors.request.use(async (config: any) => {
    const client = new ClientJS();
    const fingerprint = client.getFingerprint();
    const browser = client.getBrowser();
    const os = client.getOS();
    const ipaddress = await publicIpv4();

    config.headers["fingerprint"] = fingerprint;
    config.headers["browser"] = browser;
    config.headers["os"] = os;
    config.headers["ipaddress"] = ipaddress;
    return config;
});

export default api;