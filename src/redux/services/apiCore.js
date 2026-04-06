import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Normalize iTunes RSS feed entries
const normalizeRSSData = (data) =>
  data?.feed?.entry?.map((entry) => ({
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    subtitle: entry['im:artist'].label,
    artists: [{
      name: entry['im:artist'].label,
      id: entry['im:artist'].attributes?.href?.split('/id')?.[1]?.split('?')?.[0] || '',
    }],
    album: {
      images: entry['im:image'].map((img) => ({
        url: img.label
          .replace('55x55bb', '600x600bb')
          .replace('60x60bb', '600x600bb')
          .replace('170x170bb', '600x600bb'),
      })),
    },
    preview_url:
      (Array.isArray(entry.link)
        ? entry.link.find((l) => l.attributes['im:assetType'] === 'preview')?.attributes?.href
        : entry.link?.attributes?.href) || '',
    genres: [{ name: entry.category?.attributes?.label || '' }],
  })) || [];

// Normalize iTunes Search/Lookup results with de-duplication
const normalizeSearchData = (data) => {
  const seen = new Set();
  return data?.results
    ?.filter((item) => {
      if (item.wrapperType !== 'track' && item.kind !== 'song' && !item.artistType) return false;
      const id = item.trackId?.toString() || item.artistId?.toString();
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    ?.map((item) => ({
      id: item.trackId?.toString() || item.artistId?.toString(),
      name: item.trackName || item.collectionName || item.artistName,
      subtitle: item.artistName,
      artists: [{ name: item.artistName, id: item.artistId?.toString() }],
      album: {
        images: [{ url: item.artworkUrl100?.replace('100x100bb', '600x600bb') || '' }],
      },
      preview_url: item.previewUrl || '',
      duration: item.trackTimeMillis ? Math.floor(item.trackTimeMillis / 1000) : 0,
      genres: [{ name: item.primaryGenreName || '' }],
    })) || [];
};

export const apiCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itunes.apple.com' }),
  endpoints: (builder) => ({
    // Top 50 songs globally (US)
    getTopCharts: builder.query({
      query: () => '/us/rss/topsongs/limit=50/json',
      transformResponse: (response) => normalizeRSSData(response),
    }),

    // Top songs by genre
    getSongsByGenre: builder.query({
      query: (genre) => `/us/rss/topsongs/limit=50/genre=${genre}/json`,
      transformResponse: (response) => normalizeRSSData(response),
    }),

    // Search by term
    getSearch: builder.query({
      query: (searchTerm) => `/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=50`,
      transformResponse: (response) => normalizeSearchData(response),
    }),

    // Song details by trackId (plain string)
    getSongDetails: builder.query({
      query: (songid) => `/lookup?id=${songid}&entity=song`,
      transformResponse: (response) => normalizeSearchData(response)[0],
    }),

    // Related songs — use lookup by artistId to find other tracks
    getRelatedSongs: builder.query({
      query: (artistId) => `/lookup?id=${artistId}&entity=song&limit=15`,
      transformResponse: (response) => normalizeSearchData(response).filter(s => s.id !== undefined),
    }),

    // Artist details + top songs
    getArtistDetails: builder.query({
      query: (artistId) => `/lookup?id=${artistId}&entity=song&limit=20`,
      transformResponse: (response) => {
        const all = response?.results || [];
        const artist = all.find((r) => r.wrapperType === 'artist') || all[0];
        const songs = normalizeSearchData({ results: all.filter((r) => r.wrapperType === 'track') });
        return {
          artist: { name: artist?.artistName || '', images: [] },
          songs,
        };
      },
    }),

    // Top songs by country code
    getSongsByCountry: builder.query({
      query: (countryCode) => `/${(countryCode || 'us').toLowerCase()}/rss/topsongs/limit=50/json`,
      transformResponse: (response) => normalizeRSSData(response),
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSearchQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
} = apiCoreApi;
