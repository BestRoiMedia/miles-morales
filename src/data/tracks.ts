export interface Track {
  id: string;
  title: string;
  description?: string;
  src: string;
  duration?: string;
}

export const tracks: Track[] = [
  {
    id: '1',
    title: 'Miles Morales Mix Vol. 1',
    description: 'A showcase of versatility — blending genres and decades into one seamless experience.',
    src: '/audio/MUSIC--milesmorales.mp3',
  },
  {
    id: '2',
    title: 'Miles Morales Mix Vol. 2',
    description: 'From corporate events to the club — hear the range that makes Miles one of the best.',
    src: '/audio/MUSIC--milesmorales (1).mp3',
  },
];

// EPK uses the same tracks
export const epkTracks: Track[] = tracks;
