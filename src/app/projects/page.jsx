import Image from 'next/image'

import { Card } from '@/components/Card'
import { LinkIcon } from '@/components/Icon'
import { ReadMore } from '@/components/ReadMore'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getClient } from '@/lib/client'
import { authorQuery, projectsByAuthorQuery } from '@/lib/queries'


export async function generateMetadata(
  { params },
  parent
) {
  // read route params
  const slug = process.env.NEXT_PUBLIC_GITHUB_USERNAME

  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  return {
    title: `Projects` ,
    description: 'Things I’ve made trying to put my dent in the universe.',
  }
}

export default async function Projects() {
  const slug = process.env.NEXT_PUBLIC_GITHUB_USERNAME
  const base = process.env.NODE_ENV === 'production' ? `/${slug}/` : '/'

  const { data } = await getClient().query({
    query: projectsByAuthorQuery,
    variables: { slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      {
        data.projects.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.projects.map((project) => (
              <Card as="li" key={project.slug} className={"justify-between items-start"}>
                <div>
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                      src={project?.thumbnail?.url}
                      alt=""
                      className="h-8 w-8 object-contain"
                      width={100}
                      height={100}
                      unoptimized
                    />
                  </div>
                  <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={`${base}projects/${project.slug}`}>{project.name}</Card.Link>
                  </h2>
                  <Card.Description>
                    <ReadMore>
                      {project.description}
                    </ReadMore>
                  </Card.Description>
                </div>

                {
                  (project.demo || project.sourceCode) && (
                    <p className="w-full relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                      <LinkIcon className="h-6 w-6 flex-none" />
                      <span className="ml-2 truncate ">{project.demo ?? project.sourceCode}</span>
                    </p>
                  )
                }
              </Card>
            ))}
          </ul>
        ) : (
          <div>
            Em breve trarei projetos para vocês! 😉
          </div>
        )
      }

    </SimpleLayout>
  )
}
