import React from 'react';
import { codeToHtml } from 'shiki';

export interface InlineCodeProps {
    language: string;
    code: string;
}

async function InlineCode ({
    language,
    code,
}: InlineCodeProps) {
    const html = await codeToHtml(code, {
        lang: language,
        theme: 'catppuccin-latte'
    });

    return (
        <span
            dangerouslySetInnerHTML={{__html: html}}
        />
    );
}

export default InlineCode;
