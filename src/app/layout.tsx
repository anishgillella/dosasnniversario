import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FloatingNav } from '@/components/ui/floating-navbar';
import AuthGate from '@/components/AuthGate';
import { 
  Home,
  Camera,
  Moon,
  Music
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Our Beautiful Journey | Love Story Celebration',
  description: 'Celebrating our love story from January 2023 when we met to April 10, 2023 when we began our journey together, and beyond',
};

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Gallery",
    link: "/gallery",
    icon: <Camera className="h-4 w-4" />,
  },
  {
    name: "Dreams & Wishes",
    link: "/dreams",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    name: "Music for You",
    link: "/music",
    icon: <Music className="h-4 w-4" />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGate>
          <FloatingNav navItems={navItems} />
          <div className="relative z-10">
            {children}
          </div>
        </AuthGate>
      </body>
    </html>
  );
}
