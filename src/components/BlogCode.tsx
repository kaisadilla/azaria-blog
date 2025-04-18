import React from 'react';
import { codeToHtml } from 'shiki';
import styles from "./BlogCode.module.scss";

async function BlogCode ({children, ...codeProps}: React.HTMLAttributes<HTMLElement>) {
    let txt = children as string;

    let language: string | null = null;
    let code: string = txt;

    let firstWord = txt.split(" ")[0];

    // If the code starts with "!", that indicates the language of the code.
    if (firstWord.startsWith("!")) {
        language = firstWord.substring(1);
        code = code.substring(language.length + 2);
    }
    // If it starts with "\!", we are just escaping "!" so it doesn't indicate
    // the language.
    else if (firstWord.startsWith("\\!")) {
        code = code.substring(1);
    }

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
