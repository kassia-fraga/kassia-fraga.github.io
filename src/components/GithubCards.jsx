'use client'

import { useTheme } from "next-themes"
import { BriefcaseIcon } from "./Icon"
import { Code } from "@phosphor-icons/react"

export function GithubCards({ username, skills }) {
    let { resolvedTheme } = useTheme()

    const titleColor = resolvedTheme === 'dark' ? 'f4f4f5' : '18181b'
    const textColor = resolvedTheme === 'dark' ? 'a1a1aa': '525251'

    console.log(skills)

    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Code size={32} color={`#${textColor}`} />
                <span className="ml-3">Skills</span>
            </h2>
            <div className="mt-6 space-y-4">
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        height={'50em'}
                        className="max-w-sm"
                        src={`https://skillicons.dev/icons?i=${skills}`}
                    />
                </div>

                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt=""
                        height={'50em'}
                        className="max-w-sm"
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=7&theme=transparent&title_color=${titleColor}&text_color=${textColor}&hide_border=true`}
                    />
                </div>
            </div>
        </div>
    )
  }
