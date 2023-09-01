import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

export const metadata = {
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
