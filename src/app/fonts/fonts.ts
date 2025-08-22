import { $cl } from "@/utils";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Aldrich, Chakra_Petch, Coda, Iceberg, Jockey_One, Kdam_Thmor_Pro, Michroma, Nova_Square, Orbitron, Passero_One, Poppins, Russo_One, Share_Tech, Tomorrow, Tourney, Tsukimi_Rounded } from "next/font/google";

export const poppins = Poppins({ weight: "400", subsets: ['latin', 'latin-ext'] });
//export const michroma = Michroma({ weight: "400", subsets: ['latin', 'latin-ext']});

export const tomorrow = Tomorrow({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext'],
    variable: "--font-tomorrow",
});

export const chakraPetch = Chakra_Petch({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext'],
    variable: "--font-chakra-petch",
});

export const iceberg = Iceberg({
    weight: ["400"],
    subsets: ['latin'],
    variable: "--font-iceberg",
});

export const russoOne = Russo_One({
    weight: ["400"],
    subsets: ['latin'],
    variable: "--font-russo-one",
});

export const tourney = Tourney({
    weight: ["400"],
    subsets: ['latin'],
    variable: "--font-tourney",
});

export const orbitron = Orbitron({
    weight: "variable",
    subsets: ['latin'],
    variable: "--font-orbitron",
});


export const fontTitle = Chakra_Petch({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext'],
    variable: "--font-title",
});

export const fontBody = Chakra_Petch({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext'],
    variable: "--font-body",
});

export const fontAside = chakraPetch;

// TODO: This shouldn't be necessary, but for some reason font loading breaks
// randomly.
export function fontVariables () : string {
    return $cl(
        chakraPetch.variable,
        tomorrow.variable,
        orbitron.variable,
    );
}
