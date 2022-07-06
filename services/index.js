import { request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () =>{
    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                author {
                    ... on Author {
                    id
                    name
                    bio
                    photo {
                        url
                    }
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `
    const results = await request(graphqlAPI, query);
    return results.postsConnection.edges;
}

export const getPostDetails = async (slug) =>{
    const query = gql`
        query GetPostDetails($slug: String!) {
            posts(where: {slug: $slug}) {
                slug
                title
                author {
                    ... on Author{
                        id
                        name
                        bio
                        photo {
                          url
                        }
                    }
                }
                categories {
                  name
                  slug
                }
                createdAt
                featuredImage {
                  url
                }
                excerpt
                content {
                    raw
                  }
              }
            }
        
    `
    const results = await request(graphqlAPI, query, {slug});
    return results.posts;
}

export const recentPosts = async() =>{
    const query = gql`
        query getPostDetails {
            posts(
                orderBy: createdAt_ASC
                last:3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug

            }
        }
    `
    const results= await request(graphqlAPI, query);
    return results.posts;
}

export const getSimilarPosts = async (categories, slug) =>{
    const query = gql`
        query getSimilarPosts($slug:String!, $categories:[String!]){
            posts(
                where:{slug_not:$slug, AND: {categories_some:{slug_in:$categories}}}
                last:3
             ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const results= await request(graphqlAPI, query, {categories, slug});
    return results.posts;
}

export const getCategories = async () =>{
    const query = gql`
        query getCategories{
            categories{
                name 
                slug
            }
        }
    `
    const results= await request(graphqlAPI, query);
    return results.categories;
}

export const submitComment = async (obj)=>{
    const result = await fetch('/api/comments',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(obj),
    });
    return result.json();
}