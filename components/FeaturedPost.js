import Link from 'next/link';
import InfoPost from '@components/InfoPost';
import dayjs from 'dayjs';

export default function FeaturedPost(props) {
  const { category, createdAt, title, headline, author, thumbnail, slug } = props
  return (
    <article>
      <div className="flex -mx-4 lg:items-center items-start flex-wrap">
        <div className="px-4 lg:w-8/12 md:w-7/12 w-full">
          <Link href={`/${slug}`}>
            <a>
              <img src={thumbnail} className="rounded-xl w-full mb-4 md:mb-0" />
            </a>
          </Link>
        </div>
        <div className="lg:w-4/12 md:w-5/12 w-full px-4">
          <InfoPost
            category={category}
            date={dayjs(createdAt).format("MMMM DD, YYYY")}
            title={title}
            shortDescription={headline}
            authorAvatar={author.attributes.avatar.data.attributes.url}
            authorName={author.attributes.name}
            authorJob={author.attributes.job}
            slug={slug}
          />
        </div>
      </div>
      <hr className="border-white/10 mt-10 md:hidden" />
    </article>
  );
}
