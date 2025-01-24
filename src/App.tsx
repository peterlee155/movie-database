import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';
import { MovieList } from './components/MovieList';
import type { User } from '@supabase/supabase-js';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = React.useState(true);

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setShowAuthModal(!session?.user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setShowAuthModal(!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center text-white">
          <h1 className="text-4xl font-bold mb-6">Movie Database</h1>
          <p className="mb-8 text-lg opacity-90">Sign in to discover and track your favorite movies</p>
          <AuthModal isOpen={showAuthModal} onClose={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MovieList user={user} />
    </QueryClientProvider>
  );
}

export default App;