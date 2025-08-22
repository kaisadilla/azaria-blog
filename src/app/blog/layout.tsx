import type { Metadata } from "next";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import { fontBody, fontTitle } from '@/app/fonts/fonts';

import styles from "./layout.module.scss";
import WarningMessage from "@/components/WarningMessage";
import MouseOverBackground2 from '@/components/MouseOverBackground2';

export const metadata: Metadata = {
    title: "Azaria",
    description: "Azaria's devblog.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const warnings = [
        {
            title: "WIP",
            message: "This blog is currently a work in progress - you " +
            "will find broken styles, placeholder content and " +
            "unfinished sections."
        },
    ];

    return (
        <div className={styles.body}>
            <MouseOverBackground2 />

            {warnings.map((w, i) => <WarningMessage
                key={i}
                title={w.title}
                message={w.message}
            />)}

            <div id="scrollableBody" className={styles.actualViewport}>
                <BlogHeader />
                <div className={
                    `${styles.blogArea} ${fontBody.className}`
                }>
                    <div className={styles.pageBody}>
                        <img
                            className={styles.headerEnd}
                            src="/img/blog_header.png"
                            alt=""
                            draggable={false}
                        />
                        {children}
                        <img
                            className={styles.footerStart}
                            src="/img/blog_header.png"
                            alt=""
                            draggable={false}
                        />
                    </div>
                    <BlogFooter />
                </div>
            </div>
        </div>
    );
}
