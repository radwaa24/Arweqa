## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Infinite Scroll Implementation

### Composable Structure

- **File:** `composables/usePosts.ts`
- **Responsibilities:**
  - Fetch posts from the API with pagination.
  - Manage state:
    - `posts`: Array of loaded posts.
    - `loading`: Boolean for loading status.
    - `currentPage`: Tracks the current API page.
    - `lastPage`: Tracks the last available page.
    - `reachedTheEnd`: Boolean, true if all data loaded.
  - Handle errors and expose a method to load more posts.

### Scroll Detection & Data Loading

- **How it works:**
  - A scroll event listener is added to the window in the feed component.
  - When the user scrolls within 200px of the bottom, `loadMore()` is called (unless already loading or at the end).
  - This triggers the composable to fetch the next page and append results.

### Bonus Features

- **TypeScript:**

  - Used TS in the Formats composable for type safety and maintainability.

- **Post Detail View:**

  - Clicking a post navigates to a detail page via Nuxt routing, displaying full post details.

- **Debounce Search Input:**

  - The search input uses a debounce to avoid excessive filtering and improve performance.

- **Accessibility (a11y):**

  - ARIA attributes are added to interactive elements.
  - Keyboard navigation and focus management are considered, especially for infinite scroll and search.

- **Error Handling:**

  - API errors are caught in the composable and shown to users with friendly toast messages.

- **Scroll Restoration:**
  - When navigating away and back to the feed, the scroll position is restored using Pinia or `sessionStorage` for a smooth user experience.

---

This approach ensures a robust, user-friendly, and maintainable infinite scroll feed with modern best practices and thoughtful enhancements.
