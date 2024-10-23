import Image from "next/image";
import styles from "./page.module.scss";
import "./styles.scss";

import { poppins } from "@/app/fonts/fonts";
import { useEffect, useState } from "react";
import WIcon from "@/components/WIcon";
import Desktop from "@/components/Desktop";
import { MantineProvider } from "@mantine/core";
import { ContextMenuProvider } from "mantine-contextmenu";

// 1024 x 768

export default function Home () {
    return (
        <MantineProvider>
        <ContextMenuProvider>

        <div className={styles.page}>
            <div className={styles.contentContainer} /*style={{backgroundImage: `url("/img/retro_monitor_crt_4_3_by_diegoba_dexnk7i.png")`}}*/>
                <div className={styles.contentFrame}>
                    <Desktop />
                </div>
            </div>

            <img className={styles.monitorFrame}
                // credit: https://www.deviantart.com/diegoba/art/Retro-Monitor-CRT-4-3-903053070
                src="/img/retro_monitor_crt_4_3_by_diegoba_dexnk7i.png"
                alt="scr"
            />
        </div>
        
        </ContextMenuProvider>
        </MantineProvider>
    );
}