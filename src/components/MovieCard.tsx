import React from 'react';
import { Heart } from 'lucide-react';
import { type Movie } from '../lib/tmdb';
import { cn } from '../lib/utils';

interface MovieCardProps {
  movie: Movie;
  onFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
  className?: string;
}

export function MovieCard({ movie, onFavorite, isFavorite, className }: MovieCardProps) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  return (
    <div className={cn("relative group overflow-hidden rounded-lg shadow-lg bg-white", className)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <p className="text-sm line-clamp-3">{movie.overview}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">{releaseYear}</span>
            <button
              onClick={() => onFavorite?.(movie)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Heart
                className={cn(
                  "w-6 h-6",
                  isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}