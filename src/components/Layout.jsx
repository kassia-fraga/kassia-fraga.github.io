import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children, author }) {

  return (
    <div className="relative flex w-full flex-col">
      <Header author={author} />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
}
