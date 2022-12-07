import Layout from '@components/Layout';
import Container from '@components/Container';
import CardPost from '@components/CardPost';
import SectionHeader from '@components/SectionHeader';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getAllPost } from 'service/posts';
import { getAuthor } from 'service/author';
import { getAllCategories } from 'service/categories';
import dayjs from 'dayjs';
import { useRouter } from "next/router"

export default function Posts({data, categories, author}) {
  const [posts, setPosts] = useState([]);
  
  const router = useRouter()


  useEffect(() => {
    if (router.query.search) {
      const filter = router.query.search.toLowerCase()
      const filteredData = data.filter((post) =>
        post.attributes.title.toLowerCase().includes(filter) ||
        post.attributes.category.data.attributes.name.toLowerCase().includes(filter)
      )
      setPosts(filteredData)
      return
    }
    setPosts(data)
  }, [router.query.search])

  return (
    <Layout categories={categories} changeSearch>
      <Head>
        <title>Posts &mdash; Epictetus</title>
      </Head>
      <Container>
        <SectionHeader>{router.query.search}</SectionHeader>
        {!posts.length ? (
          <div className="text-center py-20">
            <h2 className="text-6xl">No result 😥</h2>
            <p className="text-xl mt-4 text-white/60 md:w-6/12 w-full mx-auto">We couldn’t find any posts with the keyword `yahahahayuk`. Please try another keyword.</p>
          </div>
        ) : (
          <div className="flex -mx-4 flex-wrap mt-6">
            {posts.map(post => (
              <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
                <CardPost
                  thumbnail={post.attributes.thumbnail.data.attributes.formats.thumbnail.url}
                  category={post.attributes.category.data.attributes.name}
                  date={dayjs(post.attributes.createdAt).format("MMMM DD, YYYY")}
                  title={post.attributes.title}
                  shortDescription={post.attributes.headline}
                  authorAvatar={author.attributes.avatar.data.attributes.url}
                  authorName={author.attributes.name}
                  authorJob={author.attributes.job}
                  slug={post.attributes.slug}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const author = await getAuthor()
  const posts = await getAllPost()
  const categories = await getAllCategories()

  return {
    props: {
      data: posts.data,
      author: author.data[0],
      categories: categories.data
    },
    revalidate: 10,
  }
}
