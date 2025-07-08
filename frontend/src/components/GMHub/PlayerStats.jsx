const PlayerStats = ({ stats, magic }) => (
  <div className="player-stats">
    <p>HP: {stats.hp}</p>
    <p>STR: {stats.str} | DEX: {stats.dex} | INT: {stats.int}</p>
    <p>Abilities: {stats.abilities.join(', ')}</p>
    <p>Spell Slots: {magic.spellSlots.join(', ')}</p>
  </div>
);

export default PlayerStats;
