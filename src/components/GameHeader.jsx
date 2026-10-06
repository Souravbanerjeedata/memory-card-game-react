const GameHeader = ({ score, moves, onReset }) => {
  return (
    <div className="game-header">
      <h1>Cosmic Pairs</h1>
      <p>Find the matching constellations</p>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>{" "}
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>{" "}
          <span className="stat-value">{moves}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={onReset}>
        Restart game
      </button>
    </div>
  );
};

export default GameHeader;
