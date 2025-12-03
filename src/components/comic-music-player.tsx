'use client';

import { useState, useRef, useEffect } from 'react';
import type { Track } from '@/data/tracks';

interface ComicMusicPlayerProps {
  tracks: Track[];
}

export function ComicMusicPlayer({ tracks }: ComicMusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="comic-panel bg-zinc-900/60 p-4 sm:p-6 lg:p-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack?.src} preload="metadata" />

      {/* Main Player - Current Track */}
      <div className="border-2 border-zinc-700 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full bg-[#FF2436] hover:bg-[#ff4d5c] 
                       transition-all flex items-center justify-center shadow-lg shadow-red-500/20
                       hover:scale-105 active:scale-95 mx-auto sm:mx-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Track Info */}
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block px-2 py-0.5 bg-[#FF2436]/20 text-[#FF2436] text-xs font-bold uppercase tracking-wider rounded mb-2">
              Now Playing
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-1">
              {currentTrack?.title}
            </h3>
            {currentTrack?.description && (
              <p className="text-zinc-400 text-sm line-clamp-2">
                {currentTrack.description}
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="audio-progress w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #FF2436 ${(currentTime / (duration || 1)) * 100}%, #3f3f46 ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-zinc-500 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{currentTrack?.duration || formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-3">
        <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
          All Mixes
        </h4>
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all
              ${index === currentTrackIndex 
                ? 'border-[#FF2436] bg-[#FF2436]/10' 
                : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Track Number / Play Icon */}
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${index === currentTrackIndex 
                  ? 'bg-[#FF2436] text-white' 
                  : 'bg-zinc-800 text-zinc-400'
                }
              `}>
                {index === currentTrackIndex && isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <span className="font-display text-lg">{index + 1}</span>
                )}
              </div>

              {/* Track Details */}
              <div className="flex-1 min-w-0">
                <h5 className={`font-medium truncate ${index === currentTrackIndex ? 'text-[#FF2436]' : 'text-[#F5F5F5]'}`}>
                  {track.title}
                </h5>
                {track.duration && (
                  <span className="text-zinc-500 text-xs">{track.duration}</span>
                )}
              </div>

              {/* Play indicator */}
              <svg 
                className={`w-5 h-5 flex-shrink-0 ${index === currentTrackIndex ? 'text-[#FF2436]' : 'text-zinc-600'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

