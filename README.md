# 🌟 Anniversary Website - Late Nights

A beautiful, interactive anniversary website built with Next.js, featuring 3D animations, immersive experiences, and personalized content celebrating love and memories.

## 🚀 Live Demo

Visit the website to experience the magic: [Your Anniversary Website]

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Site Structure](#site-structure)
- [Components Documentation](#components-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## 🎯 Overview

This anniversary website is a digital love letter featuring four main sections:
- **Home**: Interactive landing page with 3D elements
- **Our Timeline**: Animated journey through relationship milestones
- **Gallery**: Interactive photo collection with romantic quotes
- **Dreams & Wishes**: Starry night experience with shared aspirations

## 🛠 Tech Stack

### Core Technologies
- **Next.js 14.1.0** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type safety
- **Tailwind CSS 3.4.1** - Styling framework

### 3D & Animation Libraries
- **@react-three/fiber 8.13.7** - React renderer for Three.js
- **@react-three/drei 9.56.14** - Useful helpers for R3F
- **Three.js 0.152.2** - 3D graphics library
- **Framer Motion 10.18.0** - Animation library
- **@studio-freight/lenis 1.0.33** - Smooth scrolling

### UI & Utilities
- **Lucide React 0.513.0** - Icon library
- **React Icons 5.5.0** - Additional icons
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.3.0** - Tailwind class merging

### AI Integration
- **@huggingface/inference 4.0.2** - AI model integration
- **OpenAI 5.1.1** - GPT integration for chat features

## ✨ Features

### 🎨 Visual Effects
- **3D Falling Panda Animation** - Subtle scrolling animation with "falling for you" theme
- **Floating Particles** - Ambient particle system
- **Dreamy Starfield** - Interactive star background
- **Constellation Scene** - 3D constellation mapping
- **Custom Cursor** - Personalized cursor with trail effects
- **Smooth Scrolling** - Lenis-powered smooth page transitions

### 🖼 Interactive Elements
- **Photo Gallery** - Polaroid-style photos with 3D flip animations
- **Timeline Milestones** - Animated relationship journey
- **Floating Navigation** - Elegant tab-based navigation
- **Background Audio** - Ambient music integration
- **Drag & Drop** - Interactive photo positioning

### 🤖 AI Features
- **Chat Integration** - AI-powered conversation system
- **Dynamic Content** - Personalized responses and interactions

## 🏗 Site Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with navigation
│   ├── timeline/
│   │   └── page.tsx          # Timeline page
│   ├── gallery/
│   │   └── page.tsx          # Photo gallery page
│   ├── dreams/
│   │   └── page.tsx          # Dreams & Wishes page
│   ├── chat/
│   │   └── page.tsx          # Chat page wrapper
│   └── api/
│       └── chat-with-sana/
│           └── route.ts      # Chat API endpoint
├── components/
│   ├── ui/
│   │   └── floating-navbar.tsx
│   └── [component files]
├── lib/
│   └── utils.ts              # Utility functions
└── styles/
    └── globals.css           # Global styles
```

## 📱 Pages & Tabs

### 🏠 Home Page (`/`)
**Components Used:**
- `HeroSection` - Main landing section
- `HowWeMet` - Story of first meeting
- `FavoriteMemories` - Highlighted memories
- `ThingsILove` - Personal love notes
- `LoveLetter` - Romantic letter section
- `ToTheFuture` - Future aspirations
- `FallingPanda` - 3D scrolling animation
- `FloatingParticles` - Ambient effects

**Features:**
- Smooth scrolling experience
- 3D panda that falls while scrolling
- Interactive particle system
- Responsive design with mobile optimization
- Background audio integration

### 📅 Our Timeline (`/timeline`)
**Purpose:** Interactive journey through relationship milestones

**Features:**
- Animated timeline with alternating layout
- Hover effects on milestone cards
- Gradient backgrounds and glass morphism
- Responsive design for all devices
- Smooth animations using Framer Motion

**Milestones Included:**
- First meeting and early conversations
- First date and growing connection
- Relationship milestones
- Special moments and adventures
- Future plans and dreams

### 🖼 Gallery (`/gallery`)
**Purpose:** Interactive photo collection with romantic elements

**Features:**
- **Polaroid-style Design** - Scattered photo layout with film grain
- **3D Flip Animation** - Cards flip to reveal romantic quotes
- **Famous Author Quotes** - Curated quotes from Maya Angelou, Pablo Neruda, etc.
- **Upload System** - Drag and drop photo uploads
- **Interactive Positioning** - Click and drag to reposition photos
- **Local Storage** - Persistent photo arrangements
- **Remove Functionality** - Delete photos with confirmation
- **Floating Hearts** - Ambient heart animations
- **Masonry Layout** - Dynamic grid arrangement

**Quote Authors Featured:**
- Maya Angelou
- Pablo Neruda
- Rumi
- Victor Hugo
- Elizabeth Barrett Browning
- And more romantic poets and authors

### 🌙 Dreams & Wishes (`/dreams`)
**Purpose:** Starry night experience with shared aspirations

**Components:**
- `DreamyStarfield` - Interactive star background
- `ConstellationScene` - 3D constellation mapping

**Features:**
- Immersive starry night theme
- Interactive shooting stars
- Shared dreams and wishes display
- Constellation mapping
- Vision board functionality
- Romantic nighttime ambiance

**Content Includes:**
- Personal wishes about staying together through health and sickness
- Dreams of traveling Europe together
- Shared aspirations and future plans
- Interactive elements for adding new wishes

## 🧩 Components Documentation

### Core Layout Components

#### `FloatingNavbar`
- **Purpose:** Main navigation system
- **Features:** Floating design, smooth transitions, active state indicators
- **Tabs:** Home, Our Timeline, Gallery, Dreams & Wishes

#### `SmoothScroll`
- **Purpose:** Lenis-powered smooth scrolling
- **Implementation:** Wraps entire application for consistent experience

### Home Page Components

#### `HeroSection`
- **Purpose:** Landing section with main title
- **Features:** Animated text, gradient backgrounds

#### `HowWeMet`
- **Purpose:** Story of first meeting
- **Features:** Narrative text with animations

#### `FavoriteMemories`
- **Purpose:** Highlighted special moments
- **Features:** Card-based layout, hover effects

#### `ThingsILove`
- **Purpose:** Personal love notes
- **Features:** List-based design, heart animations

#### `LoveLetter`
- **Purpose:** Romantic letter section
- **Features:** Elegant typography, fade-in animations

#### `ToTheFuture`
- **Purpose:** Future aspirations
- **Features:** Forward-looking content, inspiring visuals

### 3D & Animation Components

#### `FallingPanda`
- **Purpose:** 3D panda animation during scroll
- **Features:** 
  - Subtle, aesthetic design with muted colors
  - "Falling for you..." text overlay
  - Scroll-triggered animation
  - Minimalist approach for elegance

#### `FloatingParticles`
- **Purpose:** Ambient particle system
- **Features:** Canvas-based particles, smooth movement

#### `DreamyStarfield`
- **Purpose:** Interactive star background
- **Features:** 3D stars, mouse interaction, twinkling effects

#### `ConstellationScene`
- **Purpose:** 3D constellation mapping
- **Features:** Connected star patterns, rotation animations

### Interactive Components

#### `CustomCursor`
- **Purpose:** Personalized cursor experience
- **Features:** Custom design, smooth following

#### `CursorTrail`
- **Purpose:** Cursor trail effects
- **Features:** Particle trail, fade animations

#### `BackgroundAudio`
- **Purpose:** Ambient music integration
- **Features:** Auto-play controls, volume management

### Chat Components

#### `SanaChat`
- **Purpose:** AI-powered chat interface
- **Features:** Real-time messaging, AI responses

#### `SanaChatButton`
- **Purpose:** Chat activation button
- **Features:** Floating design, notification indicators

#### `OurAdventures`
- **Purpose:** Adventure and experience sharing
- **Features:** Story-based layout, image integration

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/late_nights.git
   cd late_nights
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys for:
   - OpenAI API key
   - Hugging Face API key

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎮 Usage

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Photos
1. Navigate to the Gallery tab
2. Use the upload button or drag & drop
3. Position photos by clicking and dragging
4. Photos are automatically saved to local storage

### Customizing Content
- Edit component files in `src/components/`
- Modify page content in `src/app/*/page.tsx`
- Update styles in `src/styles/globals.css`
- Add new milestones in timeline page
- Customize quotes in gallery component

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `out` or `.next`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project from GitHub
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🎨 Customization

### Colors & Themes
- Edit `tailwind.config.js` for color schemes
- Modify CSS variables in `globals.css`
- Update component-specific styles

### Content Updates
- Timeline events: `src/app/timeline/page.tsx`
- Gallery quotes: `src/app/gallery/page.tsx`
- Dreams content: `src/app/dreams/page.tsx`
- Home sections: Individual component files

### Adding New Features
1. Create component in `src/components/`
2. Add to appropriate page
3. Update navigation if needed
4. Test responsive design

## 📝 Notes

- **Performance:** Optimized for smooth 60fps animations
- **Responsive:** Fully responsive design for all devices
- **Accessibility:** ARIA labels and keyboard navigation
- **SEO:** Meta tags and structured data
- **Privacy:** All data stored locally, no external tracking

## 💝 Special Features

- **Personalized Content:** Tailored to your relationship story
- **Interactive Elements:** Engaging user experience
- **3D Graphics:** Immersive visual effects
- **AI Integration:** Smart chat functionality
- **Local Storage:** Persistent user customizations
- **Smooth Animations:** Professional-grade transitions

---

*Built with love for celebrating special moments and creating lasting digital memories.* ❤️
