import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ['js', 'jsx', 'mdx'],
  basePath: process.env.NODE_ENV === 'production' ? `/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}` : "",
  images: {
    unoptimized: true,
    domains: [ 'media.graphassets.com' ]
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
