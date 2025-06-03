"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Heart,
  Star,
  Music,
  Camera,
  Home,
  User,
  Settings,
  Bell,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const colorThemes = [
  {
    name: "Ocean",
    bg: "bg-gradient-to-br from-blue-400 to-blue-600",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "text-blue-100",
  },
  {
    name: "Sunset",
    bg: "bg-gradient-to-br from-orange-400 to-pink-500",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "text-orange-100",
  },
  {
    name: "Forest",
    bg: "bg-gradient-to-br from-green-400 to-emerald-600",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "text-green-100",
  },
  {
    name: "Purple",
    bg: "bg-gradient-to-br from-purple-400 to-indigo-600",
    card: "bg-white/20 backdrop-blur-sm border-white/30",
    text: "text-white",
    accent: "text-purple-100",
  },
  {
    name: "Dark",
    bg: "bg-gradient-to-br from-gray-800 to-gray-900",
    card: "bg-white/10 backdrop-blur-sm border-white/20",
    text: "text-white",
    accent: "text-gray-300",
  },
]

const icons = [
  { icon: Heart, name: "Heart" },
  { icon: Star, name: "Star" },
  { icon: Music, name: "Music" },
  { icon: Camera, name: "Camera" },
  { icon: Home, name: "Home" },
  { icon: User, name: "User" },
  { icon: Settings, name: "Settings" },
  { icon: Bell, name: "Bell" },
]

const songs = ["Cosmic Dreams", "Digital Waves", "Neon Nights", "Electric Soul", "Midnight Vibes"]

export default function SwipeApp() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [volume, setVolume] = useState(75)

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const theme = colorThemes[currentTheme]

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    const minSwipeDistance = 50

    // Horizontal swipes for color themes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - previous theme
        setCurrentTheme((prev) => (prev - 1 + colorThemes.length) % colorThemes.length)
      } else {
        // Swipe left - next theme
        setCurrentTheme((prev) => (prev + 1) % colorThemes.length)
      }
    }

    // Vertical swipes for music controls
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY < 0) {
        // Swipe up - next song
        setCurrentSong((prev) => (prev + 1) % songs.length)
      } else {
        // Swipe down - previous song
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
      }
    }

    touchStartRef.current = null
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      className={`min-h-screen ${theme.bg} transition-all duration-500 ease-in-out`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>Swipe App</h1>
          <p className={`${theme.accent} text-sm`}>← → Change Colors | ↑ ↓ Control Music</p>
        </div>

        {/* Theme Indicator */}
        <Card className={`${theme.card} p-4 mb-6`}>
          <div className="text-center">
            <h2 className={`text-xl font-semibold ${theme.text} mb-2`}>{theme.name} Theme</h2>
            <div className="flex justify-center space-x-2">
              {colorThemes.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTheme ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Icons Grid */}
        <Card className={`${theme.card} p-6 mb-6`}>
          <h3 className={`text-lg font-semibold ${theme.text} mb-4 text-center`}>App Icons</h3>
          <div className="grid grid-cols-4 gap-4">
            {icons.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
                    <IconComponent className={`w-6 h-6 ${theme.text}`} />
                  </div>
                  <span className={`text-xs ${theme.accent}`}>{item.name}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Music Player */}
        <Card className={`${theme.card} p-6`}>
          <div className="text-center mb-4">
            <Music className={`w-8 h-8 ${theme.text} mx-auto mb-2`} />
            <h3 className={`text-lg font-semibold ${theme.text}`}>Now Playing</h3>
            <p className={`${theme.accent} text-sm`}>{songs[currentSong]}</p>
          </div>

          {/* Music Controls */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className={`${theme.text} hover:bg-white/20`}
              onClick={() => setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`${theme.text} hover:bg-white/20 w-12 h-12`}
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`${theme.text} hover:bg-white/20`}
              onClick={() => setCurrentSong((prev) => (prev + 1) % songs.length)}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-3">
            <Volume2 className={`w-4 h-4 ${theme.text}`} />
            <div className="flex-1 max-w-32">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <span className={`text-sm ${theme.accent} min-w-[3ch]`}>{volume}</span>
          </div>
        </Card>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className={`${theme.accent} text-sm`}>
            Swipe left/right to change colors
            <br />
            Swipe up/down to change songs
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
