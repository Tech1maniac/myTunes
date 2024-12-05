// src/SongPage.js
import React from 'react';

const SongPage = ({ song }) => {
  return (
    <div>
      <h1>{song.name}</h1>
      <p>{song.artists.map(artist => artist.name).join(", ")}</p>
      <audio controls>
        <source src={song.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongPage;
