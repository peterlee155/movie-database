import React from 'react';
import { Heart, Star, Calendar, Clock, Users } from 'lucide-react';
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
    <div className={cn(
      "relative group overflow-hidden rounded-xl shadow-lg bg-white",
      "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
      className
    )}>
      <div className="aspect-[2/3] relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-yellow-400/90 backdrop-blur-sm text-gray-900 rounded-full px-3 py-1.5 text-sm font-bold flex items-center gap-1">
            <Star className="w-4 h-4" fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 p-5 text-white">
          <h3 className="text-2xl font-bold mb-2 text-white/90">{movie.title}</h3>
          <p className="text-sm leading-relaxed line-clamp-3 mb-4 text-gray-300">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{releaseYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>{movie.vote_count.toLocaleString()} votes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>{new Date(movie.release_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="font-medium">
                {movie.vote_average.toFixed(1)} rating
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <button
              onClick={() => onFavorite?.(movie)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all",
                  isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white group-hover:fill-red-500/20"
                )}
              />
              <span className="text-sm font-medium">
                {isFavorite ? 'Remove' : 'Add to Favorites'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}