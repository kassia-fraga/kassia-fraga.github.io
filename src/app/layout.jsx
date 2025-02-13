import { Providers } from '@/app/providers';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getClient } from "@/lib/client";
import { authorQuery } from '@/lib/queries';

import '@/styles/tailwind.css';

export const metadata = {
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

async function getData() {
  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug: process.env.NEXT_PUBLIC_GITHUB_USERNAME },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  return data
}


export default async function RootLayout({ children }) {
  const data = await getData()

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
              </div>
            </div>

            <div className="relative flex w-full flex-col">
              <div className="relative flex w-full flex-col">
                <Header author={data.author} />
                  <main main className="flex-auto">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
