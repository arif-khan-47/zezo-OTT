import { useQuery } from "@tanstack/react-query"
import { getCategories, getWebsiteSettings } from "../http"
import BottomTab from "./shared/bottomTab"
import Footer from "./shared/footer"
import Header from "./shared/header"

interface ILayoutProps {
    children: React.ReactNode,
    hideHeader?: boolean,
}
const Layout = ({ children, hideHeader }: ILayoutProps): JSX.Element => {
    // Querie for website settings
    const { data: websiteSetting } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getWebsiteSettings()
    })

    const { data: categories } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories(),
    });


    if (!hideHeader) {
        return (
            <div className="3xl:container 3xl:mx-auto">
                <header className="">
                    <Header settings={websiteSetting?.data} data={categories?.data} />
                </header>
                <div className="scrollbar pb-24 sm:pb-0">
                    {children}
                    <div className="fixed bottom-[5%] left-[5%] right-[5%] z-50 sm:hidden">
                        <BottomTab />
                    </div>
                </div>
                <footer className="hidden sm:block">
                    <Footer settings={websiteSetting?.data} />
                </footer>
            </div>
        )
    }

    return <div className="3xl:container 3xl:mx-auto pb-24 sm:pb-0">
        {children}
        <div className="fixed bottom-[2%] left-[5%] right-[5%] z-50 sm:hidden">
            <BottomTab />
        </div>
        <footer className="bg-transparent hidden sm:block">
            <Footer settings={websiteSetting?.data} />
        </footer>
    </div>


}

export default Layout