import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/apiCore';

const AroundYou = () => {
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    // Attempt to refine country via IP, but default starts at IN
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=at_N2vD7cWJpUOn8KInUvO7eR66mG8oI`)
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => {
         console.log('Geo fetch failed, falling back to India:', err);
         setCountry('IN');
      })
      .finally(() => setLoading(false));
  }, []);

  if (isFetching && loading) return <Loader title="Mapping local AI trends..." />;
  if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col animate-slowfade w-full mb-40">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <div className="flex flex-col">
          <h2 className="font-extrabold font-headline text-5xl text-on-surface text-left tracking-tighter flex items-center gap-4">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
               <span className="material-symbols-outlined text-[32px]">location_on</span>
             </div>
             Around You
          </h2>
          <p className="text-on-surface-variant font-bold mt-3 ml-1 flex items-center gap-2 uppercase tracking-widest text-xs">
             <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>
             Top Charts in <span className="text-primary font-black">{country === 'IN' ? 'India' : country}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 px-6 py-3 bg-surface-mid rounded-full ghost-border border-0 bg-opacity-70 sm:mt-0 mt-8">
           <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Localized Insights</p>
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

export default AroundYou;
