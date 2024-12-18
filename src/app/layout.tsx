import "./styles.scss"
import "./globals.css";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'react-material-symbols/rounded';

import type { Metadata } from "next";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import { fontBody } from './fonts/fonts';

import styles from "./layout.module.scss";

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

            <MantineProvider>
                
            <body id="scrollableBody" className={`${styles.blogPage} ${fontBody.className}`}>
                <BlogHeader />
                <div className={styles.pageBody}>
                    {children}
                </div>
                <BlogFooter />
            </body>

            </MantineProvider>
        </html>
    );
}
