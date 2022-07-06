import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';


const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories()
            .then((result)=>setCategories(result))
    },[getCategories])
    return (
        <div className='container mx-auto mb-8 px-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                    <div className='md:float-left block'>
                        <Link href='/'>
                            <span className='cursor-pointer font-bold text-4xl text-white'>
                                Bastion Blog
                            </span>
                        </Link>
                    </div>
                
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category)=>(
                        <Link key={category.slug} href={`/category/&{category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer hover:text-blue-500'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;