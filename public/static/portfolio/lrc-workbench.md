---
title: "LRC Workbench"
url: https://lrc-workbench.azariadev.dev/
repo: https://github.com/kaisadilla/lrc-workbench/
slideshowPath: /img/portfolio/slideshow/lrc-workbench
slideshowCount: 4
---

**.lrc** is a standardized text format to write lyrics that are synchronized with audio. This is the format used in music players such as **Spotify** to show a song's lyrics on screen.

**LRC Workbench** is a simple yet powerful visual creator (and editor) for .lrc files.

<Video src="/video/lrc-workbench-demo.mp4" footnote="Demo of LRC workbench's basic usage." />

# Tech stack

**LRC Workbench** is built on **Vite**, **React** and **Redux**, using **TypeScript** for code and **SASS** for style. While it is a lightweight app, LRC Workbench uses **Mantine** for components (with a customized style), **Atlassian's Pragmatic Drag 'n Drop** for drag-and-drop behavior (used in the visual editor), **Phosphor Icons** for the UI's icons, **Monaco Editor** for the code editor mode and **LRC Kit** as a simple utility to parse .lrc files.

# Quick overview

In **LRC Workbench**, you open a music file, write down the lyrics of the song (broken by new lines) and then use the visual timeline to place each line at the timestamp where it should play. To do this, you can play the song and use the key 'A' to automatically place the next line at the point in time the song is currently at. Then, you can adjust the position of the line by dragging it. If you want to save your progress at any time, you can use the 'Commit' button to store it in the browser - when you open the webpage again, things will be exactly how you left them. Once you are done, pressing 'Save' will produce a .lrc file ready to be used in any player or website that supports the format.

# Features

* **Visual timeline**: the most important part of the editor. A lot of care has been put into the UX of this section, as it is what makes editing files way faster and easier than with other tools. Hovering over this timeline will show exactly where you are, and which line would be placed there. Clicking on the timeline will add a line at that point. Lines in the timeline can be freely dragged up and down.

* **Commit**: the app allows you to commit your current changes whenever you want. This will store them in the browser's local storage, allowing you to close the tab now, open it later and preserve these changes; or to reload the tab to discard changes you don't want.

* **Tour**: a small, replayable tour will guide you through the app, telling you how to use it.

* **Code**: as .lrc files are text files, the app allows you to look and edit at the "code" behind your current changes at any time. The app will check the validity of any changes done to the source code of the file before applying or discarding them.

* **Preview**: the app allows you to play your .lrc file, so you can visualize how your .lrc file will look like in any (compliant) player.
