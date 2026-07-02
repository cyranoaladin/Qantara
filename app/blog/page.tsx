import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/data/blog";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog IA — Qantara AI",
  description:
    "Analyses Qantara AI sur l'adoption de l'intelligence artificielle, la formation, les assistants IA, le RAG, les agents et la gouvernance.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Comprendre l'IA utile avant de la déployer."
        description="Articles de fond pour distinguer les effets de mode des choix techniques, pédagogiques et stratégiques qui créent de la valeur."
      />
      <section className="section-padding">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="h-full transition-transform hover:-translate-y-1 hover:border-primary/45">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="mt-5 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                <p className="mt-5 text-xs text-muted">
                  {post.readingTime} · {post.date}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
