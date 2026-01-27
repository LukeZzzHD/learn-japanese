# Learn Japanese

A mobile-first web application for collecting and practicing English-to-Japanese translations.

## Features

- **Add Vocabulary**: Enter English text and get automatic Japanese translations via DeepL API
- **Quiz Mode**: Test your recall with random flashcards and audio playback
- **Manage Collection**: Edit or delete saved translation pairs

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Translation API**: DeepL API Free
- **Text-to-Speech**: Web Speech API (browser built-in)
- **Data Storage**: localStorage

## Getting Started

### Prerequisites

1. Get a free DeepL API key from [DeepL Pro API](https://www.deepl.com/pro-api)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment example file and add your DeepL API key:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` and add your DeepL API key:
   ```
   DEEPL_API_KEY=your-deepl-api-key-here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav
│   ├── page.tsx            # Add translation (home)
│   ├── quiz/page.tsx       # Quiz mode
│   ├── edit/page.tsx       # CRUD management
│   └── api/translate/      # DeepL proxy endpoint
├── components/
│   ├── ui/                 # shadcn components
│   ├── navigation.tsx      # Bottom nav bar
│   ├── translation-form.tsx
│   ├── quiz-card.tsx
│   ├── pair-list.tsx
│   └── pair-item.tsx
├── lib/
│   ├── storage.ts          # localStorage helpers
│   ├── use-pairs.ts        # React hook for pairs
│   ├── deepl.ts            # DeepL API client
│   └── speech.ts           # Web Speech API helpers
└── types/
    └── index.ts            # TypeScript interfaces
```

## Usage

### Adding Vocabulary
1. Navigate to the home page (Add tab)
2. Enter English text in the input field
3. Click "Translate & Add" to get the Japanese translation and save it

### Taking a Quiz
1. Navigate to the Quiz tab
2. Click "Start Quiz"
3. Try to recall the Japanese translation
4. Click "Reveal" to see the answer
5. Click the speaker icon to hear the pronunciation
6. Click "Next" for another word

### Managing Vocabulary
1. Navigate to the Edit tab
2. Click the pencil icon to edit an entry
3. Click the trash icon to delete an entry

## License

MIT
