"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: number
  title: string
  image: string
}

interface RotatingVinylGalleryProps {
  images: GalleryImage[]
  className?: string
}

export function RotatingVinylGallery({ images, className }: RotatingVinylGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [radius, setRadius] = useState(120) // Start with mobile size to avoid hydration mismatch
  
  // Limit to 6 images for rotation
  const rotatingImages = images.slice(0, 6)
  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null

  // Calculate responsive radius
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(120)
      } else if (window.innerWidth < 1024) {
        setRadius(200)
      } else {
        setRadius(280)
      }
    }
    
    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  // Preload full resolution image when selected
  useEffect(() => {
    if (selectedImage?.image) {
      const img = new Image()
      img.src = selectedImage.image
      img.loading = 'eager'
      img.fetchPriority = 'high'
    }
  }, [selectedImage])

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedImageIndex((prev) => ((prev || 0) + 1) % images.length)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setSelectedImageIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, images.length])

  const goToPrevious = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1))
  }

  const goToNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((prev) => ((prev || 0) + 1) % images.length)
  }

  const handleImageClick = (clickedImage: GalleryImage) => {
    const index = images.findIndex(img => img.id === clickedImage.id)
    setSelectedImageIndex(index >= 0 ? index : 0)
  }

  return (
    <>
      <div className={cn("relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[700px] lg:min-h-[900px]", className)}>
        {/* Rotating container for images - only show 6 */}
        <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite]">
          {rotatingImages.map((img, index) => {
            const angle = (360 / rotatingImages.length) * index
            const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100
            const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100

            return (
              <div
                key={img.id}
                className="absolute top-1/2 left-1/2 group"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div className="animate-[spin-reverse_20s_linear_infinite]">
                  <div
                    onClick={() => handleImageClick(img)}
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden border-2 md:border-4 border-[#FF2436] shadow-xl shadow-[#FF2436]/20 transition-all duration-300 hover:scale-110 hover:shadow-[#FF2436]/40 hover:border-[#F5F5F5] bg-black cursor-pointer"
                  >
                    <img src={img.image || "/placeholder.svg"} alt={img.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Title tooltip on hover - hidden on mobile */}
                  <div className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    <div className="bg-[#FF2436] px-4 py-2 rounded-lg text-sm font-bold text-[#F5F5F5] shadow-lg">
                      {img.title}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Central vinyl record - static */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10 animate-[spin_3s_linear_infinite]">
          {/* Outer ring - red */}
          <div className="absolute inset-0 rounded-full border-4 sm:border-6 md:border-8 lg:border-[12px] border-[#FF2436] shadow-2xl shadow-[#FF2436]/50" />

          {/* Vinyl grooves */}
          <div className="absolute inset-0 rounded-full bg-black">
            <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 rounded-full border border-zinc-700/60" />
            <div className="absolute inset-6 sm:inset-8 md:inset-12 lg:inset-14 rounded-full border border-zinc-700/50" />
            <div className="absolute inset-8 sm:inset-10 md:inset-16 lg:inset-18 rounded-full border border-zinc-700/40" />
            <div className="absolute inset-10 sm:inset-12 md:inset-20 lg:inset-22 rounded-full border border-zinc-700/30" />
            <div className="absolute inset-12 sm:inset-14 md:inset-24 lg:inset-26 rounded-full border border-zinc-700/20" />
          </div>

          {/* Center label */}
          <div className="absolute inset-1/4 rounded-full bg-[#FF2436] flex items-center justify-center shadow-lg">
            <div className="text-center px-1 sm:px-2">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-[#F5F5F5] mb-0.5 sm:mb-1">DJ</div>
              <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-[#F5F5F5]/80 tracking-wider leading-tight">MILES MORALES</div>
            </div>
          </div>

          {/* Center spindle hole */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 -ml-1.5 -mt-1.5 sm:-ml-2 sm:-mt-2 md:-ml-3 md:-mt-3 rounded-full bg-black border-2 border-zinc-600 shadow-inner" />
        </div>
      </div>

      {/* Lightbox overlay */}
      {selectedImage && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#FF2436] hover:bg-[#ff4d5c] text-[#F5F5F5] transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrow - Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-[#FF2436]/80 hover:bg-[#FF2436] text-[#F5F5F5] transition-all duration-200 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation Arrow - Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-[#FF2436]/80 hover:bg-[#FF2436] text-[#F5F5F5] transition-all duration-200 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div className="w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4 p-2 sm:p-4 pb-20 sm:pb-24">
            <div
              className="relative flex items-center justify-center rounded-lg overflow-hidden border-2 sm:border-4 border-[#FF2436] shadow-2xl shadow-[#FF2436]/30 bg-black"
              style={{ 
                width: '95vw', 
                height: 'calc(85vh - 120px)',
                maxWidth: '95vw',
                maxHeight: 'calc(85vh - 120px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ imageRendering: 'auto' }}
              />
            </div>

            <div className="text-center px-2">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FF2436]">
                {selectedImage.title}
              </h3>
            </div>
          </div>

          {/* Preview strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-[#FF2436]/30 p-2 sm:p-4 z-40">
            <div className="max-w-7xl mx-auto overflow-x-auto">
              <div className="flex gap-2 sm:gap-3 justify-center">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImageIndex(index)
                    }}
                    className={cn(
                      "flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                      index === selectedImageIndex
                        ? "border-[#FF2436] ring-2 ring-[#FF2436]/50 scale-110"
                        : "border-zinc-700 hover:border-zinc-600 opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={img.image || "/placeholder.svg"}
                      alt={img.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

