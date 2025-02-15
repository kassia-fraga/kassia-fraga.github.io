import { Laptop } from '@/components/PhosphorIcons'
import { parseISO } from 'date-fns'
import Image from 'next/image'


export function Resume({ works }) {

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span className="text-zinc-600 dark:text-zinc-400"><Laptop color='currentColor' className="h-6 w-6 flex-none" /></span>
        <span className="ml-3 ">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {works.map((work, roleIndex) => {
          const start = parseISO(work.start)
          const end = parseISO(work.end ?? new Date())
          return (
            <li key={roleIndex} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image src={work.logo.url} width={50} height={50} alt="" className="h-8 w-8 rounded-full" unoptimized />
              </div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {work.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {work.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${start} until ${end}`}
                >
                  <time dateTime={start}>
                    {start.getFullYear()}
                  </time>{' '}
                  <span aria-hidden="true">—</span>{' '}
                  <time dateTime={end}>
                    {work.isPresent ? "Present" : end.getFullYear()}
                  </time>
                </dd>
              </dl>
            </li>
          )
        })}


      </ol>
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  )
}
