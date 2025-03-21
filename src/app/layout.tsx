import "../styles.scss";
import "./globals.css";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'react-material-symbols/rounded';
import "@fortawesome/fontawesome-svg-core/styles.css";

import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { fontBody, fontTitle } from './fonts/fonts';
import { config } from "@fortawesome/fontawesome-svg-core";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Azaria",
    description: "Azaria's devblog.",
};

function MainLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    config.autoAddCss = false;

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
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}

export default MainLayout;
