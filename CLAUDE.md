# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Environment Setup

Requires `DEEPL_API_KEY` in `.env.local` for translation functionality. Copy `.env.example` to `.env.local` and add your key.

## Architecture

### Tech Stack
- Next.js 16 with App Router
- Tailwind CSS v4
- shadcn/ui (new-york style, Lucide icons)
- TypeScript with `@/*` path alias pointing to `./src/*`

### Data Flow
- **Storage**: All vocabulary pairs stored in browser localStorage with key `translation-pairs`
- **State Management**: `usePairs` hook (`src/lib/use-pairs.ts`) uses `useSyncExternalStore` for reactive localStorage access. Components subscribe to a custom `pairs-updated` event for cross-component sync.
- **Translation**: Client calls `/api/translate` which proxies to DeepL API (keeps API key server-side)
- **Text-to-Speech**: Browser's Web Speech API via `src/lib/speech.ts`

### Key Types
```typescript
interface TranslationPair {
  id: string;          // UUID
  english: string;
  japanese: string;
  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
}
```

### Pages
- `/` - Add new vocabulary (translation form)
- `/quiz` - Flashcard quiz mode
- `/edit` - CRUD management of saved pairs
