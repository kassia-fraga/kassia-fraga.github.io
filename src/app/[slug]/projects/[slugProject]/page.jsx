import { Container } from "@/components/Container";
import { LinkIcon, SkillIcons } from "@/components/Icon";
import { getClient } from "@/lib/client";
import { extractGitHubRepoPath } from "@/lib/functions";
import { projectQuery, projectsSlugsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'

export async function generateMetadata(
    { params },
    parent
  ) {
    // read route params
    const slugProject = params.slugProject

    const { data } = await getClient().query({
      query: projectQuery,
      variables: { slug: slugProject },
      context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });

    return {
      title: `${data.project.authors.map(a => a.name).join(",")} | ${data.project.name}` ,
      description: data.project.description
    }
}


export async function generateStaticParams() {
    const { data } = await getClient().query({
        query: projectsSlugsQuery,
    });
    // Generate two pages at build time and the rest (3-100) on-demand
    return data.projects.map((p) => ({ slugProject: p.slug }));
}


export default async function ProjectDetails({ params: { slugProject } }) {


    const { data } = await getClient().query({
        query: projectQuery,
        variables: { slug: slugProject },
        context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });

    const markdown = data.project.readme

    return (
        <Container className="mt-9">
            <header className="max-w-2xl">
                <div className="flex items-center justify-start space-x-5">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                        <Image
                            src={data.project.thumbnail.url}
                            alt=""
                            className="h-10 w-10 object-contain"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        {data.project.name}
                    </h1>
                </div>
                <div className="space-y-5">
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        {data.project.description}
                    </p>

                    <SkillIcons skills={data.project.tags.map(t => t.toLowerCase()).join(",")} />

                    <div className="space-y-2">
                        {
                            data.project.demo && (
                                <a target={"_blank"} href={data.project.demo}className="relative z-10 flex text-sm font-medium text-teal-500">
                                    <LinkIcon className="h-6 w-6 flex-none" />
                                    <span className="ml-2">Demo</span>
                                </a>
                            )
                        }

                        {
                            data.project.sourceCode && (
                                <a target={"_blank"} href={data.project.sourceCode}className="relative z-10 flex text-sm font-medium text-teal-500">
                                    <LinkIcon className="h-6 w-6 flex-none" />
                                    <span className="ml-2">Source code</span>
                                </a>
                            )
                        }

                    </div>
                </div>
            </header>

            <div>
                <ReactMarkdown className="prose prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl dark:prose-invert" remarkPlugins={[remarkGfm]} >
                    { markdown }
                </ReactMarkdown>
            </div>

            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">Authors</h2>
                <div className="my-3 isolate flex -space-x-2 ">
                    { data.project.authors.map( a => (
                        <Link key={a.slug} href={`/${a.slug}`}>
                            <div className="relative z-30 inline-block">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                                    <Image
                                        className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-14 w-14"
                                        src={a.picture.url}
                                        alt=""
                                        width={64}
                                        height={64}
                                    />
                                </div>
                            </div>
                        </Link>
                    )) }

                </div>
            </div>

        </Container>
    )
}
