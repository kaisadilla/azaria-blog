import React from 'react';
import { codeToHtml } from 'shiki';

export interface CodeBlockProps {
    language: string;
    children: React.ReactNode;
}

async function CodeBlock ({
    language,
    children,
}: CodeBlockProps) {
    const code = children as string;

    const html = await codeToHtml(code, {
        lang: language,
        theme: 'dark-plus',
        colorReplacements: {
            "#ffffff": "#eff1f5",
        },
    });

    return (
        <span
            dangerouslySetInnerHTML={{__html: html}}
        />
    );
}

export default CodeBlock;
