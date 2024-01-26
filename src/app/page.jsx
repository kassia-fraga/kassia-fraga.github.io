import { authorsQuery } from '@/lib/queries'
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { getClient } from '@/lib/client';
import Image from 'next/image';
import { Card } from '@/components/Card';
import { SocialLink } from '@/components/SocialLink';
import {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon,
} from '@/components/SocialIcons'

export default async function Home() {
    const { data } = await getClient().query({
        query: authorsQuery,
        context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
    });

    if(!data.authors) return (<div></div>)

    return (
        <div className="relative flex w-full flex-col">
            <div className="flex-auto">
                <Container className="mt-9">
                    <Header />
                    <div>

                        <section className="py-16 sm:py-32">
                            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                                <div className="mx-auto max-w-2xl">
                                    <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">Meet our team</h2>
                                    <p className="leading-8 mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                                        We’re a dynamic group of individuals who are passionate about what we do.
                                    </p>
                                </div>
                                <ul
                                    role="list"
                                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
                                >
                                    {data.authors.map((person) => (
                                        <Card as="li" key={person.name} className={"justify-between items-center"}>
                                            <div>
                                                <div className="relative z-10 flex h-52 w-52 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                                                    <Image
                                                        src={person.picture.url}
                                                        alt=""
                                                        className="h-48 w-48 object-cover rounded-full "
                                                        width={100}
                                                        height={100}
                                                        unoptimized
                                                    />
                                                </div>
                                                <h2 className="mt-6 text-base font-semibold leading-7 text-zinc-800 dark:text-zinc-100">
                                                    <Card.Link href={`/${person.slug}`}>{person.name}</Card.Link>
                                                </h2>
                                                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{person.role}</p>
                                                {/* <ul role="list" className="mt-6 flex justify-center gap-x-6">
                                                    <li>
                                                        <a href={person.xUrl} className="text-gray-400 hover:text-gray-300">
                                                            <span className="sr-only">X</span>
                                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-300">
                                                            <span className="sr-only">LinkedIn</span>
                                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                                clipRule="evenodd"
                                                            />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul> */}

                                                {
                                                    person.social && (
                                                        <ul role="list" className="mt-6 flex justify-center gap-x-6">
                                                            {
                                                                person.social.twitterUrl && (
                                                                    <SocialLink
                                                                        href={person.social.twitterUrl}
                                                                        aria-label="Follow on Twitter"
                                                                        icon={TwitterIcon}
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                person.social.githubUsername && (
                                                                    <SocialLink
                                                                    href={`https://github.com/${person.social.githubUsername}`}
                                                                    aria-label="Follow on Github"
                                                                    icon={GitHubIcon}
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                person.social.linkedinUrl && (
                                                                    <SocialLink
                                                                    href={person.social.linkedinUrl}
                                                                    aria-label="Follow on LinkedIn"
                                                                    icon={LinkedInIcon}
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                person.social.instagramUrl && (
                                                                    <SocialLink
                                                                        href={person.social.instagramUrl}
                                                                        aria-label="Follow on Instagram"
                                                                        icon={InstagramIcon}
                                                                    />
                                                                )
                                                            }
                                                        </ul>
                                                    )
                                                }
                                            </div>
                                        </Card>
                                    ))}
                                </ul>
                            </div>
                        </section>

                    </div>
                </Container>
            </div>
        </div>
    )
}
