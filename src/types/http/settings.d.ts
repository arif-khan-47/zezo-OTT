declare interface IFooterMenuItem {
    id: string;
    name: string;
    link: string;
    type: "custom" | "category";
}
declare interface IFooter {
    menu: IFooterMenuItem[]
}

declare interface IHeaderMenuItem {
    name: string;
    link: string;
    type: "custom" | "category";
    icon: string;
    id: string;
}

declare interface IHeader {
    menu: IHeaderMenuItem[]
}
declare interface IWebSettings {
    header: IHeader;
    footer: IFooter;
}

declare interface ISocialLinks {
    id: string;
    name: string;
    href: string;
    newTab: boolean;
    status: boolean;
    icon: string;
}

declare interface IWebsiteSettingsData {
    webSettings: IWebSettings;
    _id: string;
    name: string;
    description: string;
    logo: string;
    favicon: string;
    siteUrl: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string[];
    google_teg_manager: string;
    social_links: ISocialLinks[];
    copy_right_text: string;
}

declare interface IWebsiteSettings {
    message: string;
    data: IWebsiteSettingsData;
}