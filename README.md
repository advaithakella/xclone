# Supa - Social Media App

Supa is a modern social media application built with React Native, Expo, and Supabase. It features a sleek mint green and black theme, real-time updates, and a full suite of social media features.

## Features

- User authentication (sign up, sign in, sign out)
- User profiles with customizable avatars and bios
- Create, view, and interact with posts
- Like and comment on posts
- Follow/unfollow other users
- Search for users
- Settings management
- Dark mode support

## Tech Stack

- React Native
- Expo
- Supabase (Authentication, Database, Storage)
- TypeScript
- Tailwind CSS

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Supabase account

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/supa.git
cd supa
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Run the SQL migration in `supabase/migrations/20230101000000_initial_schema.sql` to set up the database schema
3. Create a `.env` file in the root directory with your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Start the development server

```bash
npx expo start
```

### 5. Run on a device or emulator

- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with the Expo Go app on your physical device

## Project Structure

```
supa/
├── app/                  # Expo Router app directory
│   ├── (tabs)/           # Tab navigation screens
│   ├── auth/             # Authentication screens
│   ├── profile/          # Profile screens
│   └── _layout.tsx       # Root layout
├── components/           # Reusable components
├── lib/                  # Utility functions and API clients
├── supabase/            # Supabase configuration and migrations
└── assets/              # Static assets
```

## Database Schema

- `profiles`: User profiles
- `posts`: User posts
- `likes`: Post likes
- `comments`: Post comments
- `follows`: User follow relationships

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [Supabase](https://supabase.com/)
- [React Native](https://reactnative.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
