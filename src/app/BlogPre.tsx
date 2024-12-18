import React, { ReactElement } from 'react';
import { codeToHtml } from 'shiki';
import styles from "./BlogPre.module.scss";
import { getClassString } from '@/utils';

async function BlogPre (
    {children, ...preProps}: React.HTMLAttributes<HTMLPreElement>
) {
    const $code = children as React.JSX.Element;
    if (!$code.props) {
        return <div>Invalid code block.</div>
    }

    const code = $code.props.children as string;

    const language = getLanguage($code.props);
    const filename = getMeta(preProps, 'filename');

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
        <pre>
            <code>{code}</code>
        </pre>
    );
    else return (
        <div className={styles.codeBlock}>
            {filename !== null && <div
                className={styles.fileName}
            >
                {filename}
            </div>}
            <div
                className={styles.code}
                dangerouslySetInnerHTML={{__html: html}}
            />
            {language !== null && <div
                className={getClassString(
                    styles.language,
                    filename === null && styles.standalone
                )}
            >
                {getLanguageDisplayName(language)}
            </div>}
        </div>
    );
}

function getMeta (preProps: any, field: string) : string | null {
    if (preProps[field]) return preProps[field] as string;
    return null;
}

function getLanguage (codeProps: any) : string | null {
    const className: string | null = codeProps.className;
    if (className === null) return null;
    if (className.startsWith("language-") === false) return null;

    const lang = className.substring(9);
    return lang;
}

function getLanguageDisplayName (language: string) {
    if (language === "c++") return "C++";
    if (language === "csharp") return "C#";
    if (language === "java") return "Java";
    if (language === "javascript") return "JavaScript";
    if (language === "js") return "JavaScript";
    if (language === "ts") return "TypeScript";
    if (language === "typescript") return "TypeScript";

    return language;
}

export default BlogPre;
