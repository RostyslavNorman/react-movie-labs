# TMDB Movies App

React Assignment 1 for Web App Development 2 (SETU)
Rostyslav Norman


This is the movies app we built during the React labs, extended for the first assignment. It uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to let you browse films, open a film to see its cast, trailer and related titles, jump from an actor to everything they've been in, keep a few personal lists, and filter or search through all of it.

The labs finished at commit `4f91250` ("Tagging upcoming movies as must-watch - completed Movie Labs!"). Everything after that commit is assignment work.

## Getting started

You'll need Node.js (I developed on Node 22) and a free TMDB API key, which you can get from the API section of your account settings on themoviedb.org.

```bash
git clone https://github.com/RostyslavNorman/react-movie-labs.git
cd react-movie-labs/movies
npm install
```

Copy `.env.example` to `.env` in the `movies` folder and put your key in it:

```
VITE_TMDB_KEY=your_tmdb_api_key
```

Then start the dev server:

```bash
npm run dev
```

Vite prints the local address in the terminal, usually http://localhost:5173.

## What's new since the labs

### More of the TMDB API

I added three new list pages (Popular, Top Rated and Now Playing) and quite a lot on the detail side. A movie page now shows the top-billed cast, a trailer, and two rows of related films: recommended and similar. Clicking an actor opens their own page with a short bio and the films they're best known for, and each of those films links back to its movie page. So you can keep hopping between films and people without ever going back to the menu.

New endpoints:

| Endpoint | Type | Where it's used |
| --- | --- | --- |
| `/movie/popular` | static | Popular page |
| `/movie/top_rated` | static | Top Rated page |
| `/movie/now_playing` | static | Now Playing page |
| `/movie/{id}/credits` | parameterised | Cast section on the movie page |
| `/movie/{id}/recommendations` | parameterised | "Recommended" row on the movie page |
| `/movie/{id}/similar` | parameterised | "Similar movies" row on the movie page |
| `/movie/{id}/videos` | parameterised | "Watch trailer" button (YouTube trailer in a dialog) |
| `/person/{id}` | parameterised | Actor page |
| `/person/{id}/movie_credits` | parameterised | "Known for" grid on the actor page |
| `/search/movie?query=` | parameterised | Search page |

From the labs I kept `/discover/movie`, `/movie/{id}`, `/movie/{id}/reviews`, `/genre/movie/list` and `/movie/upcoming`. Discover now takes a page number as well, so the home page is paginated like the new lists.

All the new calls go through a small `tmdbFetch` helper in `src/api/tmdb-api.js`. It builds the URL, adds the API key and throws a readable error if TMDB sends one back, which saved a lot of copy-pasted fetch code.

### Caching with React Query

Every request goes through React Query (`useQuery` or `useQueries`). The Upcoming page still used a plain `useEffect` at the end of the labs, so I moved that over too.

The query keys include their parameters, for example `["popular", { page: 2 }]`, `["credits", { id }]` or `["person", { id }]`. That means going back to a page or a film you've already opened is instant and doesn't hit the API again. Data counts as fresh for six minutes (`staleTime` in `main.jsx`). On the paginated pages I used `placeholderData: keepPreviousData`, so the current page stays on screen while the next one loads instead of flashing a spinner.

If you run the app in dev mode you can watch the cache fill up in React Query Devtools.

### Personal lists

- **Favourites** are from the labs: the heart on any movie card.
- **Must Watch**: the playlist icon on a card adds the film, and it turns into a green tick once it's in the list. Click it again to take the film out. The Must Watch page shows everything you've saved, with a delete button on each card.
- **Favourite Actors**: every actor page has an "Add to favourite actors" button, and there's a page with all of them as cards you can remove.

All three lists, your reviews and your light/dark choice are kept in `localStorage` through a small `usePersistentState` hook, so nothing is lost when you refresh the page.

### Filtering, sorting and search

I replaced the old yellow filter card. Every list page now has a **Filters** button that opens a drawer on the left with:

- search by title
- genre
- original language (new)
- minimum rating on a slider (new)
- sorting by rating, release date or title (new)

The active filters appear as chips next to the button, so you can see at a glance what's applied and remove any of them with one click, or all of them with "Clear all". There's also a "Showing X of Y" count, and a short message with a reset button when nothing matches.

To search all of TMDB rather than the current page there's a separate **Search** page. It waits until you stop typing before sending the request and keeps the query in the URL (`/search?q=batman`), so refreshing the page and the back button both work.

### Look and feel

- A custom MUI theme with a red accent, plus a light/dark switch in the header. Dark is the default.
- The header stays at the top while you scroll, never wraps onto two lines, and collapses into a menu button on smaller screens. Clicking "TMDB Client" takes you home.
- Pagination on Discover, Popular, Top Rated and Now Playing, up to TMDB's limit of 500 pages.
- The whole poster on a movie card is clickable now, not just the "More Info" button.
- The movie page was reworked. Instead of a long scrolling column with every poster TMDB has for the film, there's one poster with the trailer button under it, and it stays in place while you scroll through the cast and recommendations. On a phone it sits above the details.
- The page jumps back to the top whenever you open a new film or actor.
- New MUI components: `Drawer`, `Badge`, `Chip`, `Slider`, `Pagination`, `Dialog`, `Tooltip`, `CardActionArea`, `Stack` and `InputAdornment`.

### Small fixes along the way

- Typing a bracket into the old title filter crashed the page, because the text went into `String.search`, which treats it as a regular expression. It uses `includes` now.
- The review pages crashed on refresh because they relied on router state that disappears after a reload. They now send you back to the home page instead.

## Pages

| Route | Page |
| --- | --- |
| `/` | Discover movies |
| `/movies/popular` | Popular movies |
| `/movies/top-rated` | Top rated movies |
| `/movies/now-playing` | Now playing in cinemas |
| `/movies/upcoming` | Upcoming movies |
| `/movies/:id` | Movie details with cast, trailer, recommended and similar films |
| `/person/:id` | Actor details and filmography |
| `/search` | Search TMDB by title |
| `/movies/favorites` | Favourite movies |
| `/movies/must-watch` | Must Watch list |
| `/actors/favorites` | Favourite actors |
| `/reviews/:id` | Full review |
| `/reviews/form` | Write a review |

## Project structure

```
movies/src
├── api/tmdb-api.js            all the TMDB calls
├── components/                cards, headers, filter drawer, cast, trailer and so on
├── contexts/                  movie lists and colour mode
├── hooks/usePersistentState.jsx
├── pages/                     one file per route
│   └── tmdbListPage.jsx       shared paginated list used by Discover, Popular, Top Rated and Now Playing
├── theme.jsx                  MUI theme for light and dark mode
└── main.jsx                   routes, providers and the React Query client
```

## Known limitations

- Filters and sorting work on the movies that are already loaded, so on the paginated pages they apply to the current page of 20 rather than to the whole of TMDB.
- The Search page only shows the first page of results.
- Upcoming isn't paginated yet.
- The personal lists are stored in the browser, so they're tied to that browser and aren't synced anywhere.

## Built with

React 19, Vite, Material UI, TanStack React Query, React Router, React Hook Form and the TMDB API.
