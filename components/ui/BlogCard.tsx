import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type BlogPost = {
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  date?: string;
  image?: string;
};

export default function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-revival-gold/15 bg-revival-warm-white",
        className,
      )}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-revival-gold/10">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3 p-6">
          {post.category ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-revival-gold">
              {post.category}
            </span>
          ) : null}
          <h3 className="text-lg text-revival-dark">{post.title}</h3>
          <p className="text-sm leading-relaxed text-revival-charcoal/80">
            {post.excerpt}
          </p>
          {post.date ? (
            <time className="text-xs text-revival-charcoal/60">{post.date}</time>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
