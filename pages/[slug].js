import Head from 'next/head';
import Layout from '@components/Layout';
import Container from '@components/Container';
import PostMetaTitle from '@components/PostMetaTitle';
import PostAuthor from '@components/PostAuthor';
import { getAllPost, getDetailPost } from 'service/posts';
import { getAuthor } from 'service/author';
import { getAllCategories } from 'service/categories';
import dayjs from 'dayjs';

export default function Detail({post, author, categories}) {
  return (
    <Layout categories={categories} enterSearch>
      <Head>
        <title>Detail &mdash; Epictetus</title>
      </Head>
      <Container>
        <div className="md:w-6/12 w-full mx-auto flex items-center flex-col">
          <PostMetaTitle
            category={post.attributes.category.data.attributes.name}
            date={dayjs(post.attributes.createdAt).format("MMMM DD, YYYY")}
            title={post.attributes.title}
            slug={post.attributes.slug}
            center
          />
          <PostAuthor
            authorName={author.attributes.name}
            authorJob={author.attributes.job}
            authorAvatar={author.attributes.avatar.data.attributes.url}
          />
        </div>
        <div className="md:w-10/12 w-full mx-auto my-10">
          <img src={post.attributes.thumbnail.data.attributes.formats.thumbnail.url} className="w-full rounded-lg" />
        </div>
        <div className="md:w-8/12 w-full mx-auto leading-relaxed">
          <p className="text-base mb-4">
            {post.attributes.content}
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
    const posts = await getAllPost()
    const paths = posts.data.map(post => {
        return {
            params: {
                slug: post.attributes.slug
            }
        }
    })
    
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }) => {
    const post = await getDetailPost(params.slug)
    const author = await getAuthor()
    const categories = await getAllCategories()

    return {
        props: {
            post: post.data[0],
            author: author.data[0],
            categories: categories.data
        },
        revalidate: 10,
    }
}