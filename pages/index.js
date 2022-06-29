import Head from 'next/head'
import {PostCard, PostWidget,Header, Categories} from '../components'
const posts = [
  {title:'React', excerpt:'Learn react testing'},
  {title:'Tailwind', excerpt:'This will be my next endevour'}
];

export default function Home () {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid lg:grid-cols-12 grid-cols-1 gap-12 '>
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post)=><PostCard post={post} key={post.title}/>)}
          </div>
          <div className='lg:col-span-4 col-span-1 '>
            <div className='lg:sticky relative top-8'>
              <PostWidget />
              <Categories />
            </div>
          </div>
      </div>
    </div>
  )
}


