---
title: "Assetto Lega"
repo: "https://github.com/kaisadilla/assetto-lega"
tech: "Electron, React, Redux, TypeScript, SASS, Modding, Pragmatic Drag 'n Drop, chart.js"
---

**Assetto Corsa** is a popular modular racing simulation video game. As such, it allows you to download and include tracks, cars and other content individually. This allows players to enjoy almost every track and car that exists in motorsports, but presents a problem in that the all the content in the game eventually becomes unmanageable. **Assetto Lega** is a custom client for this application, built to manage large collections of content by allowing the player to define their own "leagues" (a collection of cars and tracks that make up a competition, such as F1) and launch the game from within this client, bypassing the need to use the official, unmanageable official client completely. This project is still a work in progress.

<Video src="/video/assetto-lega-select-race.mp4" footnote="Preparing a race with Assetto Lega" />

# Tech stack

**Assetto Lega** is built on **Electron**, a technology that allows running a HTML / CSS / JS page as a desktop application. This choice was made due to the great variety of libraries in the ecosystem that would be useful for the features planned for the application, as well as my familiary with building UI and UX with this tech. **React** is used to build the pages inside Electron, as well as **SASS** for CSS.

**Material symbols** is used for icons inside the UI, while **Sortable** is used to handle lists that can be freely reordered via drag-and-drop. **chart.js** is used to display certain statistics in the app.

# Features

**Assetto Lega** features a powerful editor to define different competitions - including the cars available in these competitions, the teams that participate, their drivers, as well as their calendar (the different races in a given season).ˇ

## Editor

<Video src="/video/assetto-lega-new-league.mp4" footnote="Creating a new championship with Assetto Lega. Some UX features, like suggestions, can be seen here." />

Creating a new team contains the following screens:

* **Info**: where the user can define important things about the championship, such as the categories it belongs to, the images that will be used to represent the championship in the UI, or the region of the world it belongs to.
* **Teams**: defines the teams that participate into the championship. This screen allows the user to define each team's logos, nationality, car, as well as each driver that belongs to the team with their individual characteristic.
* **Drivers**: this screen is a summary of all drivers defined for teams in the previous screen. This screen exists for ease of us, as sometimes you need to see how all drivers compare to each other. In this screen, the user can define how each driver performs in qualifying, either manually or using an algorithm based on real data the user can feed to the program. This feature is important as it can make qualifying order in races resemble real life.
* **Calendar**: this screen defines every "race weekend" in the season, defining the circuit it's held at, as well as data regarding the time of the day, the official name of the event, etc. As the calendar between two seasons of the same format tends to be similar, this feature allows cloning another championship's calendar and editing it from there.
* **Tracks**: a simple screen that allows the user to add more tracks that are not part of the championship, but where the cars in it could have good races.
* **Score system**: another simple screen that defines how points are awarded after a race.
* **In-game ui**: **Assetto Corsa** allows modders to write "apps" inside the game, such as UI apps. **Assetto Lega** allows the user to write apps to display the HUD of the game and to choose which app will be used for any specific competition.
* **Backups**: this screen allows creating a new backup of the championship as it is right now, so that you can restore it in the future.

<Video src="/video/assetto-lega-new-league-team.mp4" footnote="Adding a new team to the championship." />

<br />

<Video src="/video/assetto-lega-new-league-calendar.mp4" footnote="Editing a championship's calendar of races." />

## Repository

**Assetto Lega**'s source code is publicly available in [GitHub](https://github.com/kaisadilla/assetto-lega). **Assetto Lega** is only available for Windows (as it's the only OS where Assetto Corsa can be played). This program is a work in progress, although much of it is already developed.
