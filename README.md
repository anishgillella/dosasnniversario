# Two Years of Us - Anniversary Website

A modern, visually stunning, romantic storytelling website celebrating 2 years of love — blending minimal elegance with cinematic flair.

## 💖 Features

- **Smooth Scroll Experience**: Cinematic scrolling with Lenis
- **Beautiful Animations**: Entrance animations and transitions with Framer Motion
- **Responsive Design**: Looks great on all devices
- **Modern Tech Stack**: Built with Next.js and Tailwind CSS
- **Interactive Elements**: Photo galleries, memory cards, and more

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install the dependencies:

```bash
cd anniversary-website
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 🎨 Customization

### Adding Your Photos

Replace the placeholder images in the `/public/images` directory with your own photos. Then update the image paths in the components.

### Updating Content

Edit the text content in each component file to personalize your love story:

- `HeroSection.tsx`: Update the intro text
- `HowWeMet.tsx`: Tell your meeting story
- `FavoriteMemories.tsx`: Add your favorite memories
- `ThingsILove.tsx`: List things you love about your partner
- `OurAdventures.tsx`: Add your travel adventures
- `LoveLetter.tsx`: Write your love letter
- `ToTheFuture.tsx`: Add your message for the future

### Changing Colors and Styling

The color scheme can be modified in the `tailwind.config.js` file:

```js
colors: {
  'blush': '#FFD1DC',  // Change to your preferred pink shade
  'ivory': '#FFFFF0',  // Change to your preferred background color
  'wine': '#722F37',   // Change to your preferred accent color
  'gold': '#D4AF37',   // Change to your preferred highlight color
}
```

## 🎵 Adding Music

To add your special song:

1. Add your audio file to the `/public` directory
2. Update the `ToTheFuture.tsx` component to play the audio when the button is clicked

## 📱 Deployment

This website can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Vercel will automatically build and deploy your site

## 🧰 Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Scrolling**: Lenis
- **Deployment**: Vercel (recommended)

## 💕 Enjoy Your Anniversary!

Happy 2-year anniversary! We hope this website helps you celebrate your special love story in a beautiful way.
