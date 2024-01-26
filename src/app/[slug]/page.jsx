import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import {
  BehanceIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { getClient } from "@/lib/client";
import { authorQuery } from '@/lib/queries'
import { Resume } from './components/Resume'
import { GithubCards } from '@/components/GithubCards'
import { SocialLink } from '@/components/SocialLink'

export async function generateMetadata(
  { params },
  parent
) {
  // read route params
  const slug = params.slug

  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  return {
    title: `Home | ${data.author?.name}` ,
    description: data.author?.title,
  }
}


export default async function Home({ params: { slug } }) {
  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  if(!data.author) return (<div></div>)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            { data.author.title }
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            { data.author.intro }
          </p>
          {
            data.author.social && (
              <div className="mt-6 flex gap-6">
                {
                  data.author.social.twitterUrl && (
                    <SocialLink
                      href={data.author.social.twitterUrl}
                      aria-label="Follow on Twitter"
                      icon={TwitterIcon}
                    />
                  )
                }
                {
                  data.author.social.githubUsername && (
                    <SocialLink
                      href={`https://github.com/${data.author.social.githubUsername}`}
                      aria-label="Follow on Github"
                      icon={GitHubIcon}
                    />
                  )
                }
                {
                  data.author.social.linkedinUrl && (
                    <SocialLink
                      href={data.author.social.linkedinUrl}
                      aria-label="Follow on LinkedIn"
                      icon={LinkedInIcon}
                    />
                  )
                }
                {
                  data.author.social.instagramUrl && (
                    <SocialLink
                      href={data.author.social.instagramUrl}
                      aria-label="Follow on Instagram"
                      icon={InstagramIcon}
                    />
                  )
                }
                {
                  data.author.social.behanceUrl && (
                    <SocialLink
                      href={data.author.social.behanceUrl}
                      aria-label="Follow on Behance"
                      icon={BehanceIcon}
                    />
                  )
                }
              </div>
            )
          }

        </div>
      </Container>
      <Photos images={data.author.photos.map(p => p.url)} />
      <Container className="mt-24 md:mt-28">
        <div className={
          clsx(
            "mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:gap-y-20  ",
            data.author.social?.githubUsername && "lg:max-w-none lg:grid-cols-2"
          )
        }>
          {
            data.author.social?.githubUsername && (
              <div className="flex flex-col gap-16">
                <GithubCards username={data.author.social?.githubUsername} skills={data.author.skills} />
              </div>
            )
          }

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <Resume works={data.author.works} />
          </div>
        </div>
      </Container>
    </>
  )
}

function Photos({ images }) {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              width={300}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
