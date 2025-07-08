const DiceRollView = () => {
  const [rolls, setRolls] = React.useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/game/dice-rolls'); // placeholder
    eventSource.onmessage = (e) => {
      const newRoll = JSON.parse(e.data);
      setRolls(prev => [newRoll, ...prev.slice(0, 9)]);
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="dice-rolls">
      <h3>Recent Dice Rolls</h3>
      <ul>
        {rolls.map((roll, index) => (
          <li key={index}>{roll.player}: {roll.result}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiceRollView;
