import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import { Search, LogOut } from 'lucide-react';
import { getPopularMovies, searchMovies, type Movie } from '../lib/tmdb';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface MovieListProps {
  user: User;
}

export function MovieList({ user }: MovieListProps) {
  const [search, setSearch] = React.useState('');
  const [favorites, setFavorites] = React.useState<Movie[]>([]);

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', search],
    queryFn: () => search ? searchMovies(search) : getPopularMovies(),
  });

  React.useEffect(() => {
    loadFavorites();
  }, [user.id]);

  const loadFavorites = async () => {
    const { data: favorites } = await supabase
      .from('favorites')
      .select('movie_id')
      .eq('user_id', user.id);

    if (favorites) {
      const moviePromises = favorites.map(fav => 
        fetch(`https://api.themoviedb.org/3/movie/${fav.movie_id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
          .then(res => res.json())
      );
      const movieData = await Promise.all(moviePromises);
      setFavorites(movieData);
    }
  };

  const toggleFavorite = async (movie: Movie) => {
    const isFavorite = favorites.some(m => m.id === movie.id);
    
    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movie.id);
      
      setFavorites(prev => prev.filter(m => m.id !== movie.id));
    } else {
      await supabase
        .from('favorites')
        .insert([{ user_id: user.id, movie_id: movie.id }]);
      
      setFavorites(prev => [...prev, movie]);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Movie Database</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error loading movies. Please try again.</p>
          </div>
        ) : !movies?.results?.length ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No movies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavorite={toggleFavorite}
                isFavorite={favorites.some(m => m.id === movie.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}