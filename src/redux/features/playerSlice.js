import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
  isLoggedIn: JSON.parse(localStorage.getItem('aurality-isLoggedIn')) || false,
  favorites: JSON.parse(localStorage.getItem('aurality-favorites')) || [],
  playlists: JSON.parse(localStorage.getItem('aurality-playlists')) || [
    { id: 'pl-zxpr27', name: 'My Sonic Journey', songs: [], createdBy: 'zxpr27', description: 'Your default automated mood board.' }
  ],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem('aurality-isLoggedIn', JSON.stringify(action.payload));
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      
      if (action.payload?.data) {
        // De-duplicate the incoming data to ensure a clean queue
        const seen = new Set();
        state.currentSongs = action.payload.data.filter((s) => {
          const id = (s.id || s.key)?.toString();
          if (!id || seen.has(id)) return false;
          seen.add(id);
          return true;
        });
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },

    setQueue: (state, action) => {
      state.currentSongs = action.payload;
    },

    toggleFavorite: (state, action) => {
      const song = action.payload;
      const songId = song.id || song.key;
      const exists = state.favorites.find((s) => (s.id || s.key) === songId);
      
      if (exists) {
        state.favorites = state.favorites.filter((s) => (s.id || s.key) !== songId);
      } else {
        state.favorites.push(song);
      }
      localStorage.setItem('aurality-favorites', JSON.stringify(state.favorites));
    },

    createPlaylist: (state, action) => {
      const { name, description } = action.payload;
      const newPlaylist = {
        id: `pl-${Date.now()}`,
        name,
        description,
        songs: [],
        createdBy: 'zxpr27'
      };
      state.playlists.push(newPlaylist);
      localStorage.setItem('aurality-playlists', JSON.stringify(state.playlists));
    },

    addToPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.playlists.find((pl) => pl.id === playlistId);
      if (playlist && !playlist.songs.find((s) => (s.id || s.key) === (song.id || song.key))) {
        playlist.songs.push(song);
        localStorage.setItem('aurality-playlists', JSON.stringify(state.playlists));
      }
    },
    removeFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.playlists.find((pl) => pl.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter((s) => (s.id || s.key) !== songId);
      }
    },
    togglePlaylistSong: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.playlists.find((pl) => pl.id === playlistId);
      
      if (playlist) {
        const songIndex = playlist.songs.findIndex((s) => (s.id || s.key) === (song.id || song.key));
        if (songIndex !== -1) {
          playlist.songs.splice(songIndex, 1);
        } else {
          playlist.songs.push(song);
        }
        localStorage.setItem('aurality-playlists', JSON.stringify(state.playlists));
      }
    },
    closePlayer: (state) => {
      state.activeSong = {};
      state.isActive = false;
      state.isPlaying = false;
    },
  },
});

export const { 
  setActiveSong, 
  nextSong, 
  prevSong, 
  playPause, 
  selectGenreListId, 
  setCurrentTime,
  toggleFavorite,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  togglePlaylistSong,
  setQueue,
  setLoggedIn,
  closePlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
