import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';


const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories()
        .then((newCategories)=>setCategories(newCategories))
    },[getCategories])
    return (
        <div className='container mb-8 p-8 bg-white shadow-lg rounded-2xl'>
            <h3 className='text-md font-semibold border-b pb-4 mb-8'>Categories</h3> 
            {categories.map((category)=>(
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3 hover:text-blue-800'>
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
        
    );
};

export default Categories;