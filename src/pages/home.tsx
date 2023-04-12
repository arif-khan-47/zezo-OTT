import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DefaultCard } from "../components/cards";
import Layout from "../components/layout";
import { HomeSlider } from "../components/sliders";
import PhoneHomeSlider from "../components/sliders/phoneHomeSlider";
import { getWebsiteSettings, getAllSections, getCategories } from "../http";


const HomePage = () => {

  const { data: websiteSetting } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getWebsiteSettings(),
  });
  const { data: allSections } = useQuery({
    queryKey: ["allSections"],
    queryFn: () => getAllSections(),
  });
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getCategories(),
});


  return (
    <Layout hideHeader>
      {allSections?.data &&
        allSections.data.map((section, index) => {
          if (section.type === "slider") {
            return (
              <>
                <div key={index} className="sm:block hidden">
                  <HomeSlider settings={websiteSetting} data={section.content} headerData={categories?.data}/>
                </div>
                <div className="sm:hidden">
                  <PhoneHomeSlider data={section.content} settings={websiteSetting} headerData={categories?.data}/>
                </div>
              </>
            );
          }
          if (section.type === "normal") {
            return <div key={index}><DefaultCard data={section.content} title={section.title} /></div>
          }
          return null;
        })}
    </Layout>
  );
};

export default HomePage;
