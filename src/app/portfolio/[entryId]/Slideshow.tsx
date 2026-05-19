'use client';

import { usePlaySound } from '@/hooks/usePlaySound';
import { randomItem, range } from '@/utils';
import { Carousel } from '@mantine/carousel';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import styles from './Slideshow.module.scss';

export interface SlideshowProps {
  path: string;
  count: number;
}

function Slideshow ({
  path,
  count,
}: SlideshowProps) {
  const [ opened, { open, close } ] = useDisclosure(false);
  const [ activeImg, setActiveImg ] = useState(0);

  const decodeSounds = [
    usePlaySound("/sfx/glitch-open-0.ogg"),
    usePlaySound("/sfx/glitch-open-1.ogg"),
    usePlaySound("/sfx/glitch-open-2.ogg"),
  ];

  return (<>
    <Modal
      classNames={{
        content: styles.modalContent,
      }}
      opened={opened}
      onClose={close}
      size='auto'
      centered
      transitionProps={{
        duration: 0,
      }}
      overlayProps={{
        backgroundOpacity: 0.85,
      }}
      styles={{
        body: {
          padding: 0,
        },
        content: {
          background: 'transparent',
          boxShadow: 'none',
        }
      }}
    >
      <div className={styles.modalContainer}>
        <img src={`${path}/${activeImg}.png`} />
      </div>
    </Modal>

    <div className={styles.container}>
      <Carousel
        withIndicators
        //height={500}
        slideSize="70%"
        //slideGap={12}
      >
        {range(count).map(i => <Carousel.Slide
          key={i}
          classNames={{ slide: styles.slide }}
        >
          <img
            src={`${path}/${i}.png`}
            onClick={() => handleImgClick(i)}
          />
        </Carousel.Slide>)}
      </Carousel>
    </div>
  </>);

  function handleImgClick (index: number) {
    setActiveImg(index);

    open();
    setTimeout(() => randomItem(decodeSounds).play(true), 150);
  }
}

export default Slideshow;
