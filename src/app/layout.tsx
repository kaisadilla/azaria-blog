import "./styles.scss";
import "./globals.css";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'react-material-symbols/rounded';

import type { Metadata } from "next";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import { fontBody, fontTitle } from './fonts/fonts';

import styles from "./layout.module.scss";
import WarningMessage from "@/components/WarningMessage";

export const metadata: Metadata = {
    title: "Azaria",
    description: "Azaria's devblog.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Azaria</title>
            </head>

            <body className={`
                ${styles.body}
                ${fontTitle.variable}
            `}>
                <MantineProvider>

                <WarningMessage
                    title="WIP"
                    message={
                        "This blog is currently a work in progress - you " +
                        "will find broken styles, placeholder content and " +
                        "unfinished sections."
                    }
                />
                <div className={styles.actualViewport}>
                    <BlogHeader />
                    <div id="scrollableBody" className={
                        `${styles.blogArea} ${fontBody.className}`
                    }>
                        <img
                            className={styles.headerEnd}
                            src="/img/blog_header.png"
                            alt=""
                            draggable={false}
                        />
                        <div className={styles.pageBody}>
                            {children}
                        </div>
                        <BlogFooter />
                    </div>
                </div>

                </MantineProvider>
            </body>
        </html>
    );
}
