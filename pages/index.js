import Head from 'next/head'
import FeaturedPost from '@components/FeaturedPost';
import CardPost from '@components/CardPost';
import Container from '@components/Container';
import Layout from '@components/Layout';
import { getAllPost, getFeaturedPost } from 'service/posts';
import { getAuthor } from 'service/author';
import dayjs from 'dayjs';
import { getAllCategories } from 'service/categories';

export default function Home({posts, featured, author, categories}) {

  return (
    <Layout categories={categories} enterSearch>
      <Head>
        <title>Home &mdash; Epictetus</title>
      </Head>
      <Container>
        <FeaturedPost 
          category={featured.attributes.category.data.attributes.name}
          createdAt={featured.attributes.createdAt}
          title={featured.attributes.title}
          headline={featured.attributes.headline}
          author={author}
          thumbnail={featured.attributes.thumbnail.data.attributes.formats.thumbnail.url}
          slug={featured.attributes.slug}
        />
        <div className="flex -mx-4 flex-wrap mt-6">
          {posts.map(post => (
            !post.attributes.featured && (
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
            )
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = await getAllPost()
  const featured = await getFeaturedPost()
  const author = await getAuthor()
  const categories = await getAllCategories()

  return {
    props: {
      posts: posts.data,
      featured: featured.data[0],
      author: author.data[0],
      categories: categories.data
    },
    revalidate: 10,
  }
}
