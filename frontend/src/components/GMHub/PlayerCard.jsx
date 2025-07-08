// PlayerCard.jsx
import React from 'react';
import PlayerStats from './PlayerStats';

const PlayerCard = ({ player }) => (
  <div className="player-card">
    <h2>{player.name}</h2>
    <p>Class: {player.class}</p>
    <p>Race: {player.race}</p>
    <PlayerStats stats={player.stats} magic={player.magic} />
  </div>
);

export default PlayerCard;
