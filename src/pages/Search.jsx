import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Search as SearchIcon, Sparkles } from 'lucide-react';

import { Error, Loader, SongCard } from '../components';
import { useGetSearchQuery } from '../redux/services/apiCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying, isLoggedIn } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSearchQuery(searchTerm);

  if (isFetching) return <Loader title={isLoggedIn ? `Querying AI for "${searchTerm}"...` : `Searching for "${searchTerm}"...`} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col animate-slowfade">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <div className="flex flex-col">
          <h2 className="font-black text-4xl text-on-surface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
               <SearchIcon />
             </div>
             Search Results
          </h2>
          {isLoggedIn && (
            <p className="text-on-surface-variant font-bold mt-2 ml-14 flex items-center gap-2">
               <Sparkles size={14} className="text-secondary" />
               AI-filtered results for <span className="text-on-surface font-black">"{searchTerm}"</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
        {data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
