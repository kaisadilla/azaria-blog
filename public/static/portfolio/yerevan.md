---
title: "Yerevan GeoJSON Editor"
url: https://yerevan.azariadev.dev/
repo: https://github.com/kaisadilla/yerevan-geojson-editor
slideshowPath: /img/portfolio/slideshow/yerevan
slideshowCount: 4
tech: "Vite, React, Redux, TypeScript, SASS, Leaflet, Turf, GeoJSON, Pragmatic Drag 'n Drop, Phosphor Icons, Monaco, i18next"
---

**GeoJSON** is an open standard based on the **JSON** format to represent simple geographical features. It is generally the technology between modern charts and map visualizations. 

**Yerevan** is a visual GeoJSON creator and editor, made with ease of use in mind. With Yerevan, the user can draw complex shapes with a useful variety of tools (drawing free lines, cutting one shape off another, merging multiple shapes, moving the shape along the map).

# Tech Stack

**Yerevan** is built on **Vite**, **React** and **Redux**, using **TypeScript** for code and **SASS** for style. Yerevan's UI is powered by **Mantine** (with customized CSS). Yerevan also uses:

* **Leaflet** to render maps.
* **Turf** as a library to operate with calculations on the world map.
* **GeoJSON validator** as a lightweight library to validate GeoJSON documents, both internally and when provided by the user.
* **Atlassian's Pragmatic Drag 'n Drop** for drag-and-drop behavior.
* **Phosphor Icons** and **Lucide** for the UI's icons.
* **Monaco Editor** for the code editor.
* **i18next** for localization. Localization is built with a custom pipeline that allows text to be defined in TOML documents.

# Design and features

**Yerevan** stores the current document in memory in a custom format designed to work well with the features of the app, converting back and forth between GeoJSON and this internal memory model when needed. Yerevan documents are _always_ stored as compliant GeoJSON documents that can be used anywhere, using metadata to encode editor features that are outside the standard. Yerevan also allows "exporting" to GeoJSON, to produce a clean document with no metadata at the cost of said document no longer retaining any Yerevan-specific features.

Some of Yerevan's features, notably working with polygons, require heavy computations. As such, passive and active optimization features have been implemented. Passively, the app bypasses React to build certain elements directly, smartly minimizing the amount of times elements are built and rebuilt as the user navigates through the map and changes certain elements, and skipping unnecessary elements. Actively, the user can hide elements so that they're able to work on multiple features in a small space without interference.

<Video src="/video/yerevan-vertex-optimization.mp4" footnote="The app dynamically skips vertices that are outside the screen or too close to other vertices to keep a good performance." />

As a GeoJSON document can get quite big (for example, if we are working with a country that has 6,000 subdivisions at a specific level), Yerevan allows the use of folders (a feature that does not exist in GeoJSON) and encodes said folders in metadata when saving the document.

Yerevan's UI is designed to support multiple languages, and to be able to include new languages without interferring with the source code. For this goal, it is essential that a language can be defined in a single file that is independent from everything else. For ease of use for contributors, a custom pipeline has been built so that language files are written in TOML rather than JSON (which is the format that the localization library, **i18next**, requires).

<Image src="/img/portfolio/screenshots/yerevan-language-toml.png" footnote="Part of the TOML file that contains the text in the English (UK) language."/>

<Image src="/img/portfolio/screenshots/yerevan-language-impl.png" footnote="The app's source code does not contain UI text — instead, it includes which key to read from the current language's file."/>
