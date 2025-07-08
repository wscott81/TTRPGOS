// PlayerList.jsx
import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => (
  <div className="player-list">
    {players.map(player => (
      <PlayerCard key={player.id} player={player} />
    ))}
  </div>
);

export default PlayerList;
