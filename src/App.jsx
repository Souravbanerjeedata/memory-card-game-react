import { useEffect, useState } from "react";
import Card from "./components/Card";
import GameHeader from "./components/GameHeader";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

const App = () => {
  const [cards, setcards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  function initializeGame() {
    // shuffle the cards

    const finalCard = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setcards(finalCard);
  }

  useEffect(() => {
    initializeGame();
  }, []);

  function handleCardClick(card) {
    // don't do anything if the card is flipped
    if (card.isFlipped || card.isMatched) {
      return;
    }

    // update card flip state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setcards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // check for match if two cards were flipped

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setcards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );

          setFlippedCards([]);
        }, 500);
      } else {
        // flip card 1 and 2
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setcards(flippedBackCard);
          setFlippedCards([]);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} />
      <div className="cards-grid">
        {cards.map((card) => {
          return <Card card={card} onClick={handleCardClick} />;
        })}
      </div>
    </div>
  );
};

export default App;
