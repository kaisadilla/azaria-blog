import { Aldrich, Chakra_Petch, Coda, Jockey_One, Kdam_Thmor_Pro, Michroma, Nova_Square, Orbitron, Passero_One, Poppins, Share_Tech, Tomorrow, Tsukimi_Rounded } from "next/font/google";

export const poppins = Poppins({ weight: "400", subsets: ['latin', 'latin-ext'] });
//export const michroma = Michroma({ weight: "400", subsets: ['latin', 'latin-ext']});

export const tomorrow = Tomorrow({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext']
});

export const chakraPetch = Chakra_Petch({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ['latin', 'latin-ext']
});
export const xxx = Orbitron({ weight: "variable", subsets: ['latin']});

export const fontTitle = tomorrow;
export const fontBody = chakraPetch;
export const fontAside = chakraPetch;