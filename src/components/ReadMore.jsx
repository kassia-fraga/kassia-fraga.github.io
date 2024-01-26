'use client'

import { useState } from "react";

export const ReadMore = ({ children, maxLength }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <span className="text">
            {isReadMore ? text.slice(0, maxLength ?? 100) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide text-zinc-800 dark:text-zinc-100"
            >
                {isReadMore ? "...read more" : " show less"}
            </span>
        </span>
    );
};
