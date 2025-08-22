import { useEffect, useRef, useState } from "react";

interface _Settings {
    volume?: number;
    muted?: boolean;
    loop?: boolean;
}

export function usePlaySound (src: string, settings?: _Settings) {
    settings ??= {};
    settings.volume ??= 1;
    settings.muted ??= false;
    settings.loop ??= false;
    
    let audioSource = useRef<AudioBufferSourceNode | null>(null);
    let gainNode = useRef<GainNode | null>(null);

    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [buf, setBuf] = useState<AudioBuffer | null>(null);

    const [volume, setVolume] = useState(settings.volume);
    const [muted, setMuted] = useState(settings.muted);
    const [loop, setLoop] = useState(settings.loop);

    useEffect(() => {
        if (gainNode.current === null) return;
        gainNode.current.gain.value = muted ? 0 : volume;
    }, [volume, muted]);

    useEffect(() => {
        if (audioSource.current === null) return;
        audioSource.current.loop = loop;
    }, [loop])

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

    function play (variable_pitch = false) {
        if (audioCtx === null || buf === null) return;

        audioSource.current = audioCtx.createBufferSource();
        audioSource.current.buffer = buf;
        audioSource.current.loop = loop;

        if (variable_pitch) {
            audioSource.current.playbackRate.value = 0.7 + (Math.random() * 0.6);
        }

        gainNode.current = audioCtx.createGain();
        gainNode.current.gain.value = muted ? 0 : volume;

        audioSource.current.connect(gainNode.current);
        gainNode.current.connect(audioCtx.destination);

        audioSource.current.start();
    }

    function playRepeated (
        times: number, interval: number, delayFirst: Boolean = false
    ) {
        for (let i = 0; i < times; i++) {
            setTimeout(() => play(true), (i * interval) + (delayFirst ? interval : 0));
        }
    }

    return {
        volume,
        muted,
        loop,
        play,
        playRepeated,
        setVolume,
        setMuted,
        setLoop,
    }
}