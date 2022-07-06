import React from 'react';
import moment from 'moment';
const PostDetail = ({post}) => {

    const getContentFragment = (index, text, obj, type)=>{
        let modifiedText=text;
        if(obj){
            if(obj.bold){
                modifiedText = (<b key={index}>{text}</b>);
            }
            if(obj.italic){
                modifiedText = (<em key={index}>{text}</em>);
            }
            if(obj.underline){
                modifiedText = (<u key={index}>{text}</u>);
            }
        }
        switch (type) {
            case 'heading-three':
                return <h3 key={index} className='text-xl font-semibold mb-4'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>
            case 'paragraph':
                return <p key={index} className='mb-8'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>
            case 'heading-four':
                return <h3 key={index} className='text-md font-semibold mb-4'>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>
            case 'image':
                return (
                    <img
                    key={index}
                    alt={obj.title}
                    height={obj.height}
                    width={obj.width}
                    src={obj.src}
                    />
                )   
        
            default:
                return modifiedText;
        }
    }

    return (
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img 
                    className='object-top h-full w-full rounded-t-lg'
                    alt={post.title}
                    src={post.featuredImage.url}
                />
            </div>
            <div className=' flex justify-between px-4 lg:px-0 mb-8'>
            <div className='flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                     <img 
                      alt={post.author.name}
                      height='25px'
                      width='25px'
                      className='align-middle rounded-full'
                      src={post.author.photo.url}
                      />
                      <p className='inline align-middle text-gray-700 ml-2 text-xl'>{post.author.name}</p>
            </div>
            <div className='text-xs flex-nowrap text-gray-700'>
                     <span className='flex-nowrap'>
                        { moment(post.createdAt).format('MMM DD, YYYY')}
                     </span>
            </div>
            </div>
            <div className='px-8'>
                <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
                {post.content.raw.children.map((typeObj, index)=>{
                    const children= typeObj.children.map((item, itemIndex)=>getContentFragment(itemIndex, item.text, item))
                    return getContentFragment(index, children, typeObj, typeObj.type)
                })}
            </div>
            
        </div>
    );
};

export default PostDetail;