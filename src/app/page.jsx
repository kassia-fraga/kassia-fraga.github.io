import { Container } from '@/components/Container';
import { GithubCards } from '@/components/GithubCards';
import {
    BehanceIcon,
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon,
} from '@/components/SocialIcons';
import { SocialLink } from '@/components/SocialLink';
import { getClient } from "@/lib/client";
import { authorQuery } from '@/lib/queries';
import clsx from 'clsx';
import { Photos } from './components/Photos';
import { Resume } from './components/Resume';

export async function generateMetadata() {
    // read route params
    const slug = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  
    const { data } = await getClient().query({
      query: authorQuery,
      variables: { slug },
      context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });
  
    return {
      title: `Home | ${data.author?.name}` ,
      description: data.author?.title,
      openGraph: {
        images: [
          {
            url: data.author?.picture.url, // Must be an absolute URL
            width: 800,
            height: 600,
          },
        ]
      }
    }
  }

export default async function Home() {
    const { data } = await getClient().query({
        query: authorQuery,
        variables: { slug: process.env.NEXT_PUBLIC_GITHUB_USERNAME },
        context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });

    if(!data.author) return (<div></div>)

    return (
        <div className="relative flex w-full flex-col">
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
                                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
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
                        "mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:gap-y-20 lg:max-w-none lg:grid-cols-2"
                    )
                }>
                    <div className="flex flex-col gap-16">
                        <GithubCards username={process.env.NEXT_PUBLIC_GITHUB_USERNAME} skills={data.author.skills} />
                    </div>


                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Resume works={data.author.works} />
                    </div>
                </div>
            </Container>
            
        </div>
    )
}
