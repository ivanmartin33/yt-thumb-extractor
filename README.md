# Youtube Thumbnail Extractor

Author: [Ivan Martin](https://github.com/ivanmartin33)

## Description

This is a simple Nuxt 3 application that allows you to extract a youtube video thumbnail from a youtube video URL.

Demo : [Youtube Thumbnail Extractor](https://yt-thumb-extractor.vercel.app/)

## Features

- Extract youtube video thumbnail from a youtube video URL
- Hide / Show features
  - Channel Avatar
  - Publish date
  - Duration
  - View count
- Show / Hide progress bar
- Dark mode / Light mode toggle for the thumbnail
- Copy the thumbnail URL to the clipboard
- Download the thumbnail image
- Responsive design
- Dark mode

## Usage

First, configure the .env file with the youtube API key.

```bash
NUXT_YT_API_KEY="" # Your YouTube API key
NUXT_PUBLIC_DEFAULT_VIDEO="" # Your default video URL
```
Then, run the application and paste the youtube video URL in the input field.

### Installation

```bash
pnpm i
```

### Running the app

```bash
pnpm dev
```

### Build the app

```bash
pnpm build
```
