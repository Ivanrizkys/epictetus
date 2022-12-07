import Link from 'next/link';
import InfoPost from '@components/InfoPost';

export default function CardPost({ thumbnail, slug, ...infoPost }) {
  return (
    <article>
      <Link href={`/${slug}`}>
        <a>
          <img src={thumbnail} className="w-full rounded mb-4" />
        </a>
      </Link>
      <InfoPost
        slug={slug}
        {...infoPost}
      />
    </article>
  );
}
