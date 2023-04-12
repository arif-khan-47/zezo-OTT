import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Person from '../Icons/svg/person';
import Heart from '../Icons/svg/heart';
import Compass from '../Icons/svg/compass';
import Home from '../Icons/svg/home';

function BottomTab() {
    const [activeTab, setActiveTab] = useState('/');
    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, []);
    return (
        <div className='h-[67px] bg-[#161616] rounded-full text-white'>
            <div className='flex justify-evenly h-full'>
                {/* Home  */}
                <Link to='/' className='my-auto'>
                    {
                        activeTab === '/' ? <Home width={24} color={'#2A96FA'} /> : <Home width={24} color={'#A1A1A1'} />
                    }
                </Link>
                {/* Discover  */}
                <Link to={'/search'} className='my-auto'>
                    {
                        activeTab === '/search' ? <Compass width={24} color={'#2A96FA'} /> : <Compass width={24} color={'#A1A1A1'} />
                    }
                </Link>
                {/* Favorite  */}
                <Link to={'/favorite'} className='my-auto'>
                    {
                        activeTab === '/favorite' ? 
                        <Heart width={25} color={'#2A96FA'} />
                         : <Heart width={25} color={'#A1A1A1'} />
                    }
                </Link>
                {/* Profile  */}
                <Link to={'/profile'} className='my-auto'>
                    {
                        activeTab === '/profile' ? <Person width={24} color={'#2A96FA'} /> : <Person width={24} color={'#A1A1A1'} />
                    }
                </Link>

            </div>
        </div>
    )
}

export default BottomTab
