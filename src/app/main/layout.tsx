import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'react-material-symbols/rounded';

import type { Metadata } from "next";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import { fontBody, fontTitle } from '../fonts/fonts';

import styles from "./layout.module.scss";
import WarningMessage from "@/components/WarningMessage";
import MouseOverBackground from './MouseOverBackground';

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
            <MouseOverBackground />

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
