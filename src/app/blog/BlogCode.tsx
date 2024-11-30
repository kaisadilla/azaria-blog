import React from 'react';
import { codeToHtml } from 'shiki';
import styles from "./BlogCode.module.scss";

async function BlogCode ({children, ...codeProps}: React.HTMLAttributes<HTMLElement>) {
    const txt = children as string;
    let language: string | null = txt.split(" ")[0];
    const code = txt.substring(language.length + 1);
    
    if (language === "!") language = null;

    let html: string = "";
    let error = false;
    try {
        html = await codeToHtml(code, {
            lang: language ?? 'csharp',
            //theme: "dark-plus",
            theme: "light-plus",
            colorReplacements: {
                "light-plus": {
                    "#ffffff": "var(--color-code-block-bg)",
                }
            },
        });
    }
    catch (ex) {
        console.warn("Error while trying to parse code block.", ex);
        html = code;
        error = true;
    }

    if (error) return (
        <code>{code}</code>
    );
    else return (
        <span
            className={styles.inlineCode}
            dangerouslySetInnerHTML={{__html: html}}
        />
    );
}

export default BlogCode;
