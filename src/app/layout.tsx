import "./globals.css";
import "./styles.scss";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'react-material-symbols/rounded';
import "@fortawesome/fontawesome-svg-core/styles.css";

import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { chakraPetch, fontBody, fontTitle, orbitron, tomorrow } from '@/app/fonts/fonts';
import { config } from "@fortawesome/fontawesome-svg-core";

//import styles from "@/app/layout.module.scss";
import { $cl } from "@/utils";

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
        <html lang="en" className={fontVariables()}>
            <head>
                <title>Azaria</title>
            </head>

            <body>
                <MantineProvider>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}

function fontVariables () : string {
    return $cl(
        chakraPetch.variable,
        tomorrow.variable,
        orbitron.variable,
    );
}

export default MainLayout;
