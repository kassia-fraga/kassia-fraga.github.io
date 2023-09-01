import { Layout } from '@/components/Layout'

import { getClient } from '@/lib/client'
import { authorQuery } from '@/lib/queries'

async function getData(slug) {
  const { data } = await getClient().query({
    query: authorQuery,
    variables: { slug: slug },
    context: { fetchOptions: { next: { revalidate: 5 } } } // revalidate every 5 seconds
  });

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return data
}


export default async function RootLayout({
  children,
  params: { slug }
}) {
  const data = await getData(slug)

  return (
    <Layout author={data.author}>{children}</Layout>
  )
}
