import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultCard } from '../components/cards';
import Layout from '../components/layout';
import Header from '../components/shared/header';
import { HomeSlider } from '../components/sliders';
import PhoneSlugHomeSlider from '../components/sliders/phoneSlugHomeSlider';
import SlugHomeSlider from '../components/sliders/slugHomeSlider';
import { getCategories, getCategoryBySlug, getWebsiteSettings } from '../http';


const DetailsPage = ({ }: any) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const { slug } = useParams();


    async function fetchData() {
        const res = await getCategoryBySlug(slug)
        try {
            setData(res)
            setLoading(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData()
    }, [slug])


    const { data: websiteSetting } = useQuery({
        queryKey: ["settings"],
        queryFn: () => getWebsiteSettings(),
    });

    const { data: categories } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories(),
    });


    return (
        <div className='min-h-screen'>
            <Layout hideHeader>
                <div className='z-50'>
                <Header settings={websiteSetting?.data} data={categories?.data} />
                </div>
                {
                    loading ?
                        <div className='m-auto'>Loading...</div>
                        :
                        <div>
                            {data?.data &&
                                data.data.map((section: any, index: any) => {
                                    if (section.type!=='slider') {
                                        <div>ncjdkburgjbhhjkvgbfsj,nk </div>
                                    }
                                    if (section.type === "slider") {
                                        return (
                                            <>
                                                <div key={index} className="sm:block hidden -mt-20">
                                                    <SlugHomeSlider settings={websiteSetting} data={section.content} headerData={categories?.data} />
                                                </div>
                                                <div className="sm:hidden">
                                                    <PhoneSlugHomeSlider data={section.content} settings={websiteSetting} headerData={categories?.data} />
                                                </div>
                                            </>
                                        );
                                    }
                                    if (section.type === "normal") {
                                        return <div key={index}><DefaultCard data={section.content} title={section.title} /></div>
                                    }
                                    return null
                                })}
                        </div>
                }
            </Layout>
        </div>
    );
};

export default DetailsPage;
