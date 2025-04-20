import { useEffect, useState } from "react";

export function usePlaySound (src: string) {
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [buf, setBuf] = useState<AudioBuffer | null>(null);

    useEffect(() => {
        const ctx = new window.AudioContext();
        setAudioCtx(ctx);
        
        fetchSound();

        async function fetchSound () {
            const resp = await fetch(src);
            const arrBuff = await resp.arrayBuffer();
            const audio = await ctx.decodeAudioData(arrBuff);
            setBuf(audio);
        }
    }, [src]);

    function play () {
        if (audioCtx === null || buf === null) return;

        const audioSource = audioCtx.createBufferSource();
        audioSource.buffer = buf;
        audioSource.playbackRate.value = 0.7 + (Math.random() * 0.6);
        audioSource.connect(audioCtx.destination);
        audioSource.start();
    }

    function playRepeated (
        times: number, interval: number, delayFirst: Boolean = false
    ) {
        for (let i = 0; i < times; i++) {
            setTimeout(play, (i * interval) + (delayFirst ? interval : 0));
        }
    }

    return {
        play,
        playRepeated,
    }
}