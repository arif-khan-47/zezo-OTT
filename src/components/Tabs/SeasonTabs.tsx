import React, { useState } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import EpisodeSlider from '../sliders/EpisodeSlider';
// import EpisodeSlider from '../TV/EpisodeSlider';
// import LandscapeSlider from '../TV/LandscapeSlider';

const SeasonTabs = ({ data }: any) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [selectedTab, setSelectedTab] = useState(data[0]._id);
    return (
        <div className=''>
            <div className='flex my-2'>
                {
                    data.map((item: any, index: any) => (
                        <div key={index}>
                            <div className={`text-[10.69px] flex gap-1 px-2 py-1 rounded-md text-white ${selectedTab === item._id ? 'bg-[#2A96FA]' : 'bg-gray-700'} font-bold cursor-pointer mr-2`}
                                onClick={() => setSelectedTab(item._id)}>
                                {item.name}<IoChevronDownSharp className='my-auto' />
                            </div>
                        </div>

                    ))
                }

            </div>
            <div>
                {data.map((item: any, index: any) => (
                    <div className='mt-1'
                        key={index}
                        style={{ display: selectedTab === item._id ? 'block' : 'none' }}
                    >
                        <EpisodeSlider userSession={isAuthenticated} data={item.episodes} />

                    </div>
                ))}

            </div>
        </div>
    );
};

export default SeasonTabs;
