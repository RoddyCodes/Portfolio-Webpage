# Portfolio Website - AI Coding Assistant Instructions

## Project Overview

This is a static portfolio website built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS for styling. The site features a personal portfolio, interactive chess game, and blog system deployed via GitHub Pages.

## Architecture & Key Components

### Multi-Page Structure

- **Main Portfolio** (`index.html`): Landing page with sections for about, projects, contact
- **Chess Game**: Embedded interactive chess game using Chess.js library
- **Blog System** (`blog/`): Dynamic markdown-based blog with client-side rendering

### Asset Organization

```
assets/
├── css/
│   ├── input.css      # Tailwind source with custom fonts (Inter + Playfair Display)
│   ├── output.css     # Generated Tailwind CSS (DO NOT EDIT directly)
│   ├── chess.css      # Chess-specific styles
│   └── styles.css     # Additional custom styles
├── js/
│   ├── scripts.js     # Main site functionality + duplicated chess code
│   ├── chess.js       # Chess game logic (canonical version)
│   └── animations.js  # Animation utilities
└── images/
    └── chess_images/  # Chess piece assets (format: {color}{piece}.png)
```

## Critical Development Patterns

### Tailwind CSS Workflow

- **Source**: Edit `assets/css/input.css` for custom styles
- **Build**: Run `npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch` for development
- **Config**: `tailwind.config.js` scans `./*.html` and `./blog/**/*.html`
- **Fonts**: Inter (body) and Playfair Display (headings) via Google Fonts import

### JavaScript Architecture

- **Duplication Issue**: Chess game logic exists in both `scripts.js` and `chess.js` - `chess.js` is the canonical version
- **External Dependencies**: Chess.js library loaded via CDN
- **DOM Pattern**: All JS uses `DOMContentLoaded` event listener wrapper
- **Path Conventions**: Assets referenced from page location (relative paths vary by depth)

### Blog System Implementation

- **Markdown Posts**: Stored in `blog/posts/*.md`
- **Client Rendering**: `blog/post.js` fetches and converts markdown using Showdown.js
- **URL Pattern**: `blog/post.html?post=filename` (without .md extension)
- **Title Generation**: Converts kebab-case filenames to title case automatically

### Chess Game Integration

- **Board Generation**: Dynamically creates 8x8 grid with algebraic notation IDs
- **Asset Path**: Chess images at `./assets/images/chess_images/` from root context
- **AI Moves**: Simple random move selection for computer opponent
- **State Management**: Uses Chess.js for game logic validation

## Development Workflow

### Local Development

1. **CSS Changes**: Use Tailwind watch mode for live compilation
2. **Testing**: Open `index.html` directly in browser (no server required)
3. **Blog Testing**: Requires local server for markdown file fetching due to CORS

### Deployment

- **Auto-deploy**: GitHub Actions workflow triggers on `main` branch push
- **Static Assets**: All files served directly from repository root
- **Live Site**: https://roddycodes.github.io/Portfolio-Webpage/

## File-Specific Guidelines

### When Editing HTML Files

- Maintain responsive Tailwind classes: `container mx-auto px-6`
- Use consistent button styling: `bg-sky-500 hover:bg-sky-600 transition-transform duration-300 hover:scale-105`
- Keep asset paths relative to file location

### When Editing JavaScript

- **Chess Logic**: Edit `assets/js/chess.js`, not `scripts.js` duplicate
- **New Features**: Add to `scripts.js` for general site functionality
- **Dependencies**: Load external libraries via CDN in HTML `<head>`

### When Adding Blog Posts

- Create `.md` files in `blog/posts/`
- Use kebab-case filenames (converts to readable titles)
- No frontmatter required - content is pure markdown

### When Styling

- **Primary Method**: Use Tailwind utility classes
- **Custom Styles**: Add to `input.css` and rebuild
- **Component Styles**: Chess game uses separate `chess.css` file

## Common Issues & Solutions

- **Asset Loading**: Check relative paths when moving between directory levels
- **Tailwind Not Updating**: Ensure watch command is running and `input.css` is source
- **Chess Images Missing**: Verify path is `./assets/images/chess_images/` from root
- **Blog Posts Not Loading**: Requires server for local development due to fetch() CORS restrictions
