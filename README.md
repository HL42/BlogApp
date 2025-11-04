# News & Blogs App

A React + Vite application that combines real-time news browsing with a simple local blog creator. Users can browse categories, search news, bookmark articles (stored in `localStorage`), and create/edit/delete personal blog posts with images. Includes a modal preview, a bookmarks modal, and utility widgets (weather and calendar components).

## Features

- **News browsing**: Top headlines by category with images and titles
- **Search**: Query news via the GNews API
- **Bookmarks**: Toggle bookmarks for any news article (persisted in `localStorage`)
- **Blog creator**: Create and edit posts with title, content, and optional image upload (stored in `localStorage`)
- **Modals**: Detail modals for news (`NewsModal`) and blogs (`BlogsModal`)
- **Utilities**: Weather and Calendar widgets componentized
- **Responsive UI**: Adaptive layout and media queries

## Tech Stack

- React 19, React DOM 19
- Vite 6
- Axios (HTTP)
- CSS modules by file (plain CSS)
- ESLint (React, hooks, refresh plugins)

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
cd /Users/hl/BlogApp/news-blogs-app
npm install
```

### Environment Variables

Create a `.env` file in `news-blogs-app` with your GNews API key:

```bash
VITE_GNEWS_API_KEY=your_gnews_api_key
```

If not provided, API calls will be attempted with an empty key and will fail; ensure you configure this for news to load.

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

## Project Structure

```
news-blogs-app/
  index.html
  vite.config.js
  eslint.config.js
  package.json
  src/
    main.jsx
    App.jsx
    index.css
    assets/
      images/ (static image assets)
    Component/
      News.jsx           # News feed, search, categories, bookmarks, modals
      News.css
      NewsModal.jsx      # News detail modal
      NewsModal.css
      Blogs.jsx          # Create/edit blog posts
      Blogs.css
      BlogsModal.jsx     # Blog detail modal
      BlogsModal.css
      BookMarks.jsx      # Bookmarks modal
      BookMarks.css
      Weather.jsx        # Weather widget
      Weather.css
      Calendar.jsx       # Calendar widget
      Calendar.css
```

## Key Behaviors

- **Local persistence**: Bookmarks and blogs are saved in `localStorage`.
- **Image uploads**: Client-side only; images are validated (<= 1MB) and stored as data URLs in-memory for the session and saved in posts.
- **API**: News data fetched from GNews; categories and search are supported.

## Notes & Conventions

- React version is auto-detected in ESLint configuration.
- PropTypes are disabled in ESLint; prefer TypeScript if typing is needed.
- Environment variables must be prefixed with `VITE_` to be exposed to the client.

## Troubleshooting

- No news loading: Verify `VITE_GNEWS_API_KEY` in `.env`.
- CORS or rate limits: GNews free tier may impose limits; try again later.
- Images not showing for some articles: Placeholder is used when the API returns no image.

## License

This project is for educational/demonstration purposes.
