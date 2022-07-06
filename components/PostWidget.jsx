import moment from 'moment';
import React, { useState, useEffect} from 'react';
import { recentPosts, getSimilarPosts } from '../services';
import Link from 'next/link';

const PostWidget = ({categories, slug}) => {
    const [ relatedPosts, setRelatedPosts ] = useState([]);

    useEffect(()=>{
        if(slug){
            getSimilarPosts(categories, slug)
                .then((result)=>setRelatedPosts(result))
        }else{
            recentPosts()
                .then((result)=>setRelatedPosts(result))
        }
    }, [slug, recentPosts])


    return (
        <div className='container mb-8 p-8 bg-white shadow-lg rounded-2xl'>
            <div className='text-md font-semibold border-b pb-4 mb-8 '>
                <h3 >{slug ? 'Related Posts' : 'Recent Posts'}</h3>
            </div>
                {relatedPosts.map((post)=>(
                    <div key={post.title} className=' flex items-center w-full mb-4 '>
                        <div className='w-16 flex-none'>
                        <img height='60px' width='60px' className='align-middle rounded-full' src={post.featuredImage.url} alt={post.title} />
                        </div>
                        <div className='flex-grow ml-4'>
                            <p className='text-xs font-light text-blue-500'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                            <p className='text-sm transition transform hover:translate-x-2'>
                            <Link key={post.title}   href={`/post/${post.slug}`}>
                            {post.title}
                            </Link>
                            </p>
                            
                        </div>
                    </div>

                ))}
            
            
        </div>
    );
};

export default PostWidget;