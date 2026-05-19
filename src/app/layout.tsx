import "@fortawesome/fontawesome-svg-core/styles.css";
import 'mantine-contextmenu/styles.layer.css';
// @ts-ignore
import 'react-material-symbols/rounded';
import "./globals.css";

// eslint-disable-next-line import/order
import '@mantine/core/styles.layer.css';
// eslint-disable-next-line import/order
import '@mantine/carousel/styles.css';
// eslint-disable-next-line import/order
import "./styles.scss";

import { chakraPetch, orbitron, tomorrow } from '@/app/fonts/fonts';
import { config } from "@fortawesome/fontawesome-svg-core";
import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

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
