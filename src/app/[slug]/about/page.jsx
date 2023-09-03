import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { MailIcon } from '@/components/Icon'
import { authorQuery } from '@/lib/queries'
import { getClient } from '@/lib/client'


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
    title: `About | ${data.author.name}` ,
    description: data.author.introAbout
  }
}


export default async function About({ params : { slug } }) {
  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={data.author.picture.url}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              width={1024}
              height={1024}
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {data.author.introAbout}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{__html: data.author.bio.html}} />
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {
              data.author.social.twitterUrl && (
                <SocialLink
                  href={data.author.social.twitterUrl}
                  aria-label="Follow on Twitter"
                  icon={TwitterIcon}
                >
                  Follow on Twitter
                </SocialLink>
              )
            }
            {
              data.author.social.githubUsername && (
                <SocialLink
                  href={`https://github.com/${data.author.social.githubUsername}`}
                  aria-label="Follow on Github"
                  icon={GitHubIcon}
                  className="mt-4"
                >
                  Follow on Github
                </SocialLink>
              )
            }
            {
              data.author.social.linkedinUrl && (
                <SocialLink
                  href={data.author.social.linkedinUrl}
                  aria-label="Follow on LinkedIn"
                  icon={LinkedInIcon}
                  className="mt-4"
                >
                  Follow on LinkedIn
                </SocialLink>
              )
            }
            {
              data.author.social.instagramUrl && (
                <SocialLink
                  href={data.author.social.instagramUrl}
                  aria-label="Follow on Instagram"
                  icon={InstagramIcon}
                  className="mt-4"
                >
                  Follow on Instagram
                </SocialLink>
              )
            }
            <SocialLink
              href={`mailto:${data.author.emai}`}
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              {data.author.email}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}
