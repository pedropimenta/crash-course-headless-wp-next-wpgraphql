import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { gql, useQuery } from '@apollo/client';
import { client } from '../lib/apollo';

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">
          Headless WordPress Next.js Starter
        </h1>

        <p className="description">
          ÚLTIMOS POSTS
        </p>

        <div className="grid">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}></PostCard>
              )
            })
          }
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps(){

  const GET_POSTS = gql`
      query GetAllPosts {
        posts {
          nodes {
            slug
            title
            content
            uri
            date
          }
        }
      }
    `;
  const response = await client.query({
    query: GET_POSTS
  })
  const posts = response?.data?.posts?.nodes
  return {
    props: {
      posts
    }
  }
}
