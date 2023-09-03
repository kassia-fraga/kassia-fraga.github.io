import { Container } from "@/components/Container";
import { LinkIcon, SkillIcons } from "@/components/Icon";
import { getClient } from "@/lib/client";
import { extractGitHubRepoPath } from "@/lib/functions";
import { projectQuery, projectsSlugsQuery } from "@/lib/queries";
import Image from "next/image";
import { Base64 } from "js-base64";


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

async function getGithubRepo(username, repo) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/README.md`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function ProjectDetails({ params: { slugProject } }) {
    let githubData;

    const { data } = await getClient().query({
        query: projectQuery,
        variables: { slug: slugProject },
        context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });


    if(data.project.sourceCode) {
        const { username, repository } = extractGitHubRepoPath(data.project.sourceCode);
        githubData = await getGithubRepo(username, repository);
    }

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

            <div className="mt-16 sm:mt-20">
                {/* {
                    githubData && (
                        <div dangerouslySetInnerHTML={{__html: Base64.decode(githubData.content) }} />
                    )
                } */}
            </div>

        </Container>
    )
}
