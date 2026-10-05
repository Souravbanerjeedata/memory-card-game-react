import GameHeader from "./components/GameHeader";

const App = () => {
  return (
    <div className="app">
      <GameHeader score={3} moves={10} />
    </div>
  );
};

export default App;
