import PostMetaTitle from '@components/PostMetaTitle';
import PostAuthor from '@components/PostAuthor';

export default function InfoPost({
  category,
  date,
  title,
  shortDescription,
  authorAvatar,
  authorName,
  authorJob,
  slug
}) {
  return (
    <>
      <PostMetaTitle 
        category={category} 
        date={date}
        title={title}
        slug={slug}
      />
      <p className="text-white/60 mt-5 cutoff-text">
        {shortDescription}
      </p>
      <PostAuthor
        authorName={authorName}
        authorJob={authorJob}
        authorAvatar={authorAvatar}
      />
    </>
  );
}
