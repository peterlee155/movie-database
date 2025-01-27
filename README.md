# Movie Database Platform

A beautiful and modern movie database application built with React, TypeScript, and Supabase. Browse popular movies, search for your favorites, and create your personal watchlist.

![Movie Database Screenshot](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200)

## 🌟 Live Demo

Visit the live application: [Movie Database](https://movie-database-stackblitz.netlify.app)

## ✨ Features

- 🎬 Browse popular movies from TMDB
- 🔍 Search functionality to find specific movies
- 👤 User authentication (signup/signin)
- ❤️ Save favorite movies to your personal list
- 🎨 Beautiful, responsive UI with hover effects
- 🚀 Fast and efficient with React Query
- 🔒 Secure data storage with Supabase

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Tanstack Query (React Query)
- Supabase (Authentication & Database)
- TMDB API
- Vite
- Lucide React Icons

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

- `VITE_TMDB_API_KEY`: Your TMDB API key
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🏗️ Project Structure

```
src/
├── components/        # React components
│   ├── AuthModal.tsx  # Authentication modal
│   ├── MovieCard.tsx  # Movie card component
│   └── MovieList.tsx  # Movie list component
├── lib/              # Utility functions and API
│   ├── supabase.ts   # Supabase client
│   ├── tmdb.ts       # TMDB API functions
│   └── utils.ts      # Utility functions
└── App.tsx           # Main application component
```

## 🔒 Database Schema

The application uses a Supabase database with the following structure:

```sql
Table: favorites
- id: uuid (Primary Key)
- user_id: uuid (References auth.users)
- movie_id: integer
- created_at: timestamptz
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Supabase](https://supabase.com/) for authentication and database services
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the beautiful icons