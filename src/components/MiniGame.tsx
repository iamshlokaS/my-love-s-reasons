import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface MiniGameProps {
  gameType: "catch" | "memory" | "quickclick" | "scramble" | "simon" | "drag" | "trivia" | "colormatch" | "rhythm" | "maze" | "balloon" | "puzzle" | "whack" | "reaction" | "dots" | "difference" | "cardflip" | "typing" | "falling" | "spin" | "tictactoe" | "pet";
  onComplete: () => void;
  reasonNumber: number;
}

export const MiniGame = ({ gameType, onComplete, reasonNumber }: MiniGameProps) => {
  const [gameState, setGameState] = useState<any>({});
  const [progress, setProgress] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeGame();
  }, [gameType]);

  const initializeGame = () => {
    switch (gameType) {
      case "catch":
        setGameState({ collected: 0, target: 5, hearts: generateRandomPositions(10) });
        break;
      case "memory":
        setGameState({ 
          cards: shuffleArray([...Array(4)].flatMap((_, i) => [i, i])),
          flipped: [],
          matched: []
        });
        break;
      case "quickclick":
        setGameState({ clicks: 0, target: 15, timeLeft: 10 });
        startTimer();
        break;
      case "scramble":
        const word = "BELGIUM WAFFLES";
        setGameState({ word, scrambled: scrambleWord(word), userInput: "" });
        break;
      case "simon":
        setGameState({ presses: 0, target: 3 });
        break;
      case "drag":
        setGameState({ hearts: generateDragHearts(8), collected: 0, target: 6 });
        break;
      case "trivia":
        setGameState({ 
          questions: [
            { q: "What is my favorite thing you make?", a: ["Maggi", "Paneer Franky", "Everything", "Cold Coffee"], correct: 2},
            { q: "What do I love most?", a: ["Your laugh", "Your kindness", "All of you", "Your Love"], correct: 2 },
          ],
          currentQ: 0,
          answered: false
        });
        break;
      case "colormatch":
        setGameState({ colors: generateColorPairs(), selected: null, matched: 0, target: 4 });
        break;
      case "rhythm":
        setGameState({ taps: 0, target: 20, timeLeft: 8 });
        startRhythmGame();
        break;
      case "pet":
        // Cute, simple tap-to-pet game
        setGameState({ pets: [{ id: 0 }], petCount: 0, target: 8 });
        break;
      case "maze":
        setGameState({ position: { x: 0, y: 0 }, goal: { x: 4, y: 4 } });
        break;
      case "balloon":
        setGameState({ balloons: generateBalloons(10), popped: 0, target: 6 });
        break;
      case "puzzle":
        setGameState({ pieces: shuffleArray([0,1,2,3,4,5,6,7,8]), empty: 8 });
        break;
      case "whack":
        setGameState({ moles: Array(9).fill(false), score: 0, target: 10 });
        startWhackGame();
        break;
      case "reaction":
        setGameState({ stage: "waiting", reactionTime: 0, startTime: Date.now() + Math.random() * 3000 + 2000 });
        setTimeout(() => setGameState((prev: any) => ({ ...prev, stage: "ready", startTime: Date.now() })), Math.random() * 3000 + 2000);
        break;
      case "dots":
        setGameState({ question: "How long have we been in a relationship?", userInput: "", answer: "9", wrong: false });
        break;
      case "difference":
        setGameState({ differences: generateDifferences(3), found: [] });
        break;
      case "cardflip":
        setGameState({ cards: shuffleArray([...Array(6)].map((_, i) => ({ id: i, value: "❤️💕💖".charAt(i % 3) }))), revealed: false });
        break;
      case "typing":
        setGameState({ text: "I love you forever and always", typed: "", startTime: Date.now() });
        break;
      case "falling":
        setGameState({ hearts: [], caught: 0, target: 10, playerX: 50 });
        startFallingGame();
        break;
      case "spin":
        setGameState({ spinning: false, result: null, spins: 0 });
        break;
      case "tictactoe":
        setGameState({ board: Array(9).fill(null), player: "X", gameOver: false });
        break;
    }
  };

  // Helper functions
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);
  const generateRandomPositions = (count: number) => 
    Array(count).fill(0).map(() => ({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, caught: false }));
  const scrambleWord = (word: string) => 
    word.split('').sort(() => Math.random() - 0.5).join('');
  const generateDragHearts = (count: number) =>
    Array(count).fill(0).map((_, i) => ({ id: i, dropped: false }));
  const heartEmojis = ["❤️", "💕", "💖", "💝", "💗", "💘", "💞", "💓"];
  const generateColorPairs = () => {
    const colors = ["#ff6b9d", "#ff8fab", "#ffc2d4", "#ffb3c6"];
    return [...colors, ...colors].sort(() => Math.random() - 0.5);
  };
  const generateBeats = (count: number) => 
    Array(count).fill(0).map(() => Date.now() + Math.random() * 3000);
  const generateBalloons = (count: number) =>
    Array(count).fill(0).map((_, i) => ({ id: i, popped: false, y: Math.random() * 70 + 10 }));
  const generateDotSequence = (count: number) =>
    Array(count).fill(0).map((_, i) => ({ id: i, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }));
  const generateDifferences = (count: number) =>
    Array(count).fill(0).map((_, i) => ({ id: i, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }));

  const startTimer = () => {
    const interval = setInterval(() => {
      setGameState((prev: any) => {
        if (prev.timeLeft <= 1) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const playSequence = (sequence: number[]) => {
    sequence.forEach((num, i) => {
      setTimeout(() => {
        // Visual feedback for sequence
      }, i * 600);
    });
    setTimeout(() => {
      setGameState((prev: any) => ({ ...prev, canPlay: true }));
    }, sequence.length * 600 + 500);
  };

  const startRhythmGame = () => {
    const interval = setInterval(() => {
      setGameState((prev: any) => {
        if (!prev) return prev;
        if (prev.timeLeft <= 1) {
          clearInterval(interval);
          if (prev.taps >= prev.target) onComplete();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const handleRhythmTap = () => {
    const taps = (gameState.taps || 0) + 1;
    const target = gameState.target || 1;
    setGameState({ ...gameState, taps });
    setProgress((taps / target) * 100);
    if (taps >= target) {
      setTimeout(onComplete, 500);
    }
  };

  const handlePetTap = () => {
    const petCount = (gameState.petCount || 0) + 1;
    setGameState({ ...gameState, petCount });
    setProgress((petCount / (gameState.target || 1)) * 100);
    if (petCount >= (gameState.target || 1)) {
      setTimeout(onComplete, 500);
    }
  };

  const startWhackGame = () => {
    const interval = setInterval(() => {
      const moleIndex = Math.floor(Math.random() * 9);
      setGameState((prev: any) => {
        const newMoles = [...prev.moles];
        newMoles[moleIndex] = true;
        setTimeout(() => {
          setGameState((p: any) => {
            const m = [...p.moles];
            m[moleIndex] = false;
            return { ...p, moles: m };
          });
        }, 800);
        return { ...prev, moles: newMoles };
      });
    }, 1000);
    
    setTimeout(() => clearInterval(interval), 15000);
  };

  const startFallingGame = () => {
    const interval = setInterval(() => {
      setGameState((prev: any) => {
        const newHeart = { id: Date.now(), x: Math.random() * 90, y: 0 };
        return { ...prev, hearts: [...prev.hearts, newHeart] };
      });
    }, 1000);

    const fallInterval = setInterval(() => {
      setGameState((prev: any) => {
        const hearts = prev.hearts.map((h: any) => ({ ...h, y: h.y + 5 }))
          .filter((h: any) => {
            if (h.y >= 90 && Math.abs(h.x - prev.playerX) < 10) {
              return false;
            }
            return h.y < 100;
          });
        
        const caught = prev.caught + (prev.hearts.length - hearts.length);
        if (caught >= prev.target) {
          clearInterval(interval);
          clearInterval(fallInterval);
          onComplete();
        }
        
        return { ...prev, hearts, caught };
      });
    }, 100);
  };

  // Game handlers
  const handleCatch = (index: number) => {
    const newHearts = [...gameState.hearts];
    if (!newHearts[index].caught) {
      newHearts[index].caught = true;
      const collected = gameState.collected + 1;
      setGameState({ ...gameState, hearts: newHearts, collected });
      setProgress((collected / gameState.target) * 100);
      if (collected >= gameState.target) onComplete();
    }
  };

  const handleMemoryFlip = (index: number) => {
    if (gameState.flipped.length >= 2 || gameState.flipped.includes(index) || gameState.matched.includes(index)) return;
    
    const newFlipped = [...gameState.flipped, index];
    setGameState({ ...gameState, flipped: newFlipped });
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (gameState.cards[first] === gameState.cards[second]) {
        const newMatched = [...gameState.matched, first, second];
        setTimeout(() => {
          setGameState({ ...gameState, matched: newMatched, flipped: [] });
          setProgress((newMatched.length / gameState.cards.length) * 100);
          if (newMatched.length === gameState.cards.length) setTimeout(onComplete, 500);
        }, 500);
      } else {
        setTimeout(() => setGameState({ ...gameState, flipped: [] }), 1000);
      }
    }
  };

  const handleQuickClick = () => {
    const clicks = gameState.clicks + 1;
    setGameState({ ...gameState, clicks });
    setProgress((clicks / gameState.target) * 100);
    if (clicks >= gameState.target) onComplete();
  };

  const handleDragTap = (index: number) => {
    const hearts = [...(gameState.hearts || [])];
    if (hearts[index]?.tapped) return;
    hearts[index] = { ...hearts[index], tapped: true };
    const collected = (gameState.collected || 0) + 1;
    setGameState({ ...gameState, hearts, collected });
    setProgress((collected / gameState.target) * 100);
    if (collected >= gameState.target) {
      setTimeout(onComplete, 500);
    }
  };

  const handleScrambleSubmit = () => {
    const normalize = (s: string = "") => s.replace(/[^a-z0-9]/gi, "").toUpperCase();
    if (normalize(gameState.userInput) === normalize(gameState.word)) {
      onComplete();
    }
  };

  const handleSimon = () => {
    const presses = (gameState.presses || 0) + 1;
    setGameState({ ...gameState, presses });
    setProgress(((presses) / (gameState.target || 1)) * 100);
    if (presses >= (gameState.target || 1)) {
      setTimeout(onComplete, 500);
    }
  };

  const handleTrivia = (answerIndex: number) => {
    const correct = gameState.questions[gameState.currentQ].correct === answerIndex;
    if (correct && gameState.currentQ === gameState.questions.length - 1) {
      setTimeout(onComplete, 500);
    } else if (correct) {
      setTimeout(() => setGameState({ ...gameState, currentQ: gameState.currentQ + 1, answered: false }), 1000);
    }
  };

  const handleDotsSubmit = () => {
    const inputDigits = String(gameState.userInput || "").replace(/\D/g, "");
    if (inputDigits === String(gameState.answer)) {
      setTimeout(onComplete, 500);
    } else {
      setGameState({ ...gameState, wrong: true });
    }
  };

  const handleMaze = (direction: "up" | "down" | "left" | "right") => {
    const { position, goal } = gameState;
    const newPos = { ...position };
    
    if (direction === "up" && position.y > 0) newPos.y--;
    if (direction === "down" && position.y < 4) newPos.y++;
    if (direction === "left" && position.x > 0) newPos.x--;
    if (direction === "right" && position.x < 4) newPos.x++;
    
    setGameState({ ...gameState, position: newPos });
    
    if (newPos.x === goal.x && newPos.y === goal.y) {
      setTimeout(onComplete, 500);
    }
  };

  const handleWhack = (index: number) => {
    if (!gameState.moles[index]) return;
    
    const newMoles = [...gameState.moles];
    newMoles[index] = false;
    const score = gameState.score + 1;
    setGameState({ ...gameState, moles: newMoles, score });
    
    if (score >= gameState.target) {
      setTimeout(onComplete, 500);
    }
  };

  const handleReaction = () => {
    if (gameState.stage === "ready") {
      const time = Date.now() - gameState.startTime;
      setGameState({ ...gameState, stage: "done", reactionTime: time });
      if (time < 1000) setTimeout(onComplete, 1000);
    } else if (gameState.stage === "waiting") {
      setGameState({ ...gameState, stage: "tooearly", reactionTime: 0 });
    }
  };

  const handleTicTacToe = (index: number) => {
    if (gameState.board[index] || gameState.gameOver) return;
    
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.player;
    
    // Check win
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const won = lines.some(([a,b,c]) => 
      newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]
    );
    
    if (won) {
      setGameState({ ...gameState, board: newBoard, gameOver: true });
      setTimeout(onComplete, 500);
    } else {
      // AI move
      const empty = newBoard.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
      if (empty.length > 0) {
        const aiMove = empty[Math.floor(Math.random() * empty.length)];
        newBoard[aiMove] = "O";
      }
      
      setGameState({ ...gameState, board: newBoard });
    }
  };

  const handleSpin = () => {
    if (gameState.spinning) return;
    
    setGameState({ ...gameState, spinning: true });
    
    setTimeout(() => {
      const results = ["❤️", "💕", "💖", "💝", "💗"];
      const result = results[Math.floor(Math.random() * results.length)];
      setGameState({ ...gameState, spinning: false, result, spins: gameState.spins + 1 });
      
      if (result === "💖") {
        setTimeout(onComplete, 1000);
      }
    }, 2000);
  };

  // Render different games
  const renderGame = () => {
    switch (gameType) {
      case "catch":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Catch the Hearts!</h3>
            <p className="text-center text-muted-foreground">{gameState.collected} / {gameState.target}</p>
            <div className="relative h-96 bg-muted/20 rounded-lg border-2 border-primary/20">
              {gameState.hearts?.map((heart: any, i: number) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={`absolute transition-all ${heart.caught ? 'opacity-0' : 'hover:scale-125'}`}
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                  onClick={() => handleCatch(i)}
                >
                  <Heart className="text-primary animate-float" size={32} fill="currentColor" />
                </Button>
              ))}
            </div>
          </div>
        );

      case "memory":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Memory Match!</h3>
            <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto">
              {gameState.cards?.map((card: number, i: number) => (
                <Card
                  key={i}
                  className={`h-24 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                    gameState.flipped.includes(i) || gameState.matched.includes(i)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                  onClick={() => handleMemoryFlip(i)}
                >
                  {(gameState.flipped.includes(i) || gameState.matched.includes(i)) ? (
                    <Heart size={40} fill="currentColor" />
                  ) : (
                    <span className="text-4xl">?</span>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case "quickclick":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Speed Clicking!</h3>
            <div className="text-4xl font-bold text-primary">{gameState.timeLeft}s</div>
            <p className="text-lg">{gameState.clicks} / {gameState.target} clicks</p>
            <Button
              onClick={handleQuickClick}
              size="lg"
              className="h-40 w-40 rounded-full text-2xl animate-pulse"
            >
              CLICK!
            </Button>
          </div>
        );

     
      case "scramble":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Unscramble the Word!</h3>
            <div className="text-4xl font-bold tracking-widest text-primary">
              {gameState.scrambled}
            </div>
            <Input
              value={gameState.userInput}
              onChange={(e) => setGameState({ ...gameState, userInput: e.target.value })}
              placeholder="Type the word..."
              className="text-center text-2xl max-w-xs mx-auto"
              onKeyPress={(e) => e.key === 'Enter' && handleScrambleSubmit()}
            />
            <Button onClick={handleScrambleSubmit} size="lg">
              Submit
            </Button>
          </div>
        );

      case "simon":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Tap the Heart!</h3>
            <p className="text-lg text-muted-foreground">{gameState.presses || 0} / {gameState.target || 3}</p>
            <Button
              size="lg"
              className="h-40 w-40 rounded-full text-4xl"
              onClick={handleSimon}
            >
              ❤️
            </Button>
          </div>
        );

      case "trivia":
        const currentQuestion = gameState.questions?.[gameState.currentQ];
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Love Trivia!</h3>
            <p className="text-xl text-center">{currentQuestion?.q}</p>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {currentQuestion?.a.map((answer: string, i: number) => (
                <Button
                  key={i}
                  size="lg"
                  onClick={() => handleTrivia(i)}
                  className="h-20"
                >
                  {answer}
                </Button>
              ))}
            </div>
          </div>
        );

      case "maze":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Navigate to My Heart!</h3>
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {Array(25).fill(0).map((_, i) => {
                const x = i % 5;
                const y = Math.floor(i / 5);
                const isPlayer = x === gameState.position?.x && y === gameState.position?.y;
                const isGoal = x === gameState.goal?.x && y === gameState.goal?.y;
                
                return (
                  <div
                    key={i}
                    className={`h-16 border-2 flex items-center justify-center text-2xl ${
                      isPlayer ? 'bg-primary' : isGoal ? 'bg-accent' : 'bg-card'
                    }`}
                  >
                    {isPlayer && "😊"}
                    {isGoal && "❤️"}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-2">
              <Button onClick={() => handleMaze("up")}>↑</Button>
              <Button onClick={() => handleMaze("down")}>↓</Button>
              <Button onClick={() => handleMaze("left")}>←</Button>
              <Button onClick={() => handleMaze("right")}>→</Button>
            </div>
          </div>
        );

      case "balloon":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Pop the Balloons!</h3>
            <p className="text-center">{gameState.popped} / {gameState.target}</p>
            <div className="relative h-96 bg-muted/20 rounded-lg">
              {gameState.balloons?.map((balloon: any) => !balloon.popped && (
                <Button
                  key={balloon.id}
                  variant="ghost"
                  className="absolute text-4xl"
                  style={{ left: `${Math.random() * 80}%`, top: `${balloon.y}%` }}
                  onClick={() => {
                    const balloons = gameState.balloons.map((b: any) =>
                      b.id === balloon.id ? { ...b, popped: true } : b
                    );
                    const popped = gameState.popped + 1;
                    setGameState({ ...gameState, balloons, popped });
                    if (popped >= gameState.target) onComplete();
                  }}
                >
                  🎈
                </Button>
              ))}
            </div>
          </div>
        );

      case "puzzle":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Sliding Puzzle!</h3>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {gameState.pieces?.map((num: number, i: number) => (
                <Button
                  key={i}
                  size="lg"
                  className={`h-20 ${num === 8 ? 'invisible' : ''}`}
                  onClick={() => {
                    const emptyIndex = gameState.pieces.indexOf(8);
                    const canMove = 
                      Math.abs(i - emptyIndex) === 1 || 
                      Math.abs(i - emptyIndex) === 3;
                    
                    if (canMove) {
                      const pieces = [...gameState.pieces];
                      [pieces[i], pieces[emptyIndex]] = [pieces[emptyIndex], pieces[i]];
                      setGameState({ ...gameState, pieces });
                      
                      if (pieces.every((p, idx) => p === idx)) {
                        setTimeout(onComplete, 500);
                      }
                    }
                  }}
                >
                  {num + 1}
                </Button>
              ))}
            </div>
          </div>
        );

      case "whack":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Whack-a-Heart!</h3>
            <p className="text-center">{gameState.score} / {gameState.target}</p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {gameState.moles?.map((active: boolean, i: number) => (
                <Button
                  key={i}
                  size="lg"
                  className="h-24 text-4xl"
                  onClick={() => handleWhack(i)}
                >
                  {active ? <Heart size={48} fill="currentColor" className="text-primary" /> : "🕳️"}
                </Button>
              ))}
            </div>
          </div>
        );

      case "reaction":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Reaction Test!</h3>
            <Button
              size="lg"
              className={`h-64 w-64 text-xl ${
                gameState.stage === "ready" ? "bg-primary animate-pulse" : 
                gameState.stage === "waiting" ? "bg-destructive" : ""
              }`}
              onClick={handleReaction}
            >
              {gameState.stage === "waiting" && "Wait..."}
              {gameState.stage === "ready" && "CLICK NOW!"}
              {gameState.stage === "done" && `${gameState.reactionTime}ms`}
              {gameState.stage === "tooearly" && "Too early!"}
            </Button>
          </div>
        );

      case "tictactoe":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Tic Tac Toe!</h3>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {gameState.board?.map((cell: string | null, i: number) => (
                <Button
                  key={i}
                  size="lg"
                  className="h-24 text-4xl"
                  onClick={() => handleTicTacToe(i)}
                >
                  {cell === "X" ? "❤️" : cell === "O" ? "💔" : ""}
                </Button>
              ))}
            </div>
          </div>
        );

      case "spin":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Spin the Wheel!</h3>
            <div className={`text-8xl ${gameState.spinning ? 'animate-spin' : ''}`}>
              🎡
            </div>
            {gameState.result && <div className="text-6xl">{gameState.result}</div>}
            <Button
              size="lg"
              onClick={handleSpin}
              disabled={gameState.spinning}
            >
              {gameState.spinning ? "Spinning..." : "Spin!"}
            </Button>
            <p className="text-sm">Get 💖 to win!</p>
          </div>
        );

      case "typing":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Type This Message!</h3>
            <p className="text-xl text-primary">{gameState.text}</p>
            <Input
              value={gameState.typed}
              onChange={(e) => {
                setGameState({ ...gameState, typed: e.target.value });
                if (e.target.value === gameState.text) {
                  setTimeout(onComplete, 500);
                }
              }}
              placeholder="Start typing..."
              className="text-center max-w-lg mx-auto"
            />
            <div className="text-sm text-muted-foreground">
              {gameState.typed.length} / {gameState.text.length}
            </div>
          </div>
        );

      case "falling":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Catch Falling Hearts!</h3>
            <p className="text-center">{gameState.caught} / {gameState.target}</p>
            <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden border-2 border-primary/20">
              {gameState.hearts?.map((heart: any) => (
                <Heart
                  key={heart.id}
                  className="absolute text-primary"
                  size={32}
                  fill="currentColor"
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                />
              ))}
              <div
                className="absolute bottom-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center"
                style={{ left: `${gameState.playerX}%`, transform: 'translateX(-50%)' }}
              >
                😊
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setGameState({ ...gameState, playerX: Math.max(0, gameState.playerX - 10) })}>
                ←
              </Button>
              <Button onClick={() => setGameState({ ...gameState, playerX: Math.min(100, gameState.playerX + 10) })}>
                →
              </Button>
            </div>
          </div>
        );

      case "drag":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Heart Collector!</h3>
            <p className="text-lg text-muted-foreground">{gameState.collected || 0} / {gameState.target}</p>
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {gameState.hearts?.map((h: any, i: number) => (
                <Button
                  key={h.id}
                  size="lg"
                  className={`h-20 flex items-center justify-center text-3xl ${h.tapped ? 'opacity-40 scale-95' : 'hover:scale-110'}`}
                  onClick={() => handleDragTap(i)}
                  disabled={h.tapped}
                >
                  {heartEmojis[i % heartEmojis.length]}
                </Button>
              ))}
            </div>
          </div>
        );

      case "pet":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Pet the Puppy!</h3>
            <p className="text-lg text-muted-foreground">Give the puppy {gameState.target || 8} pats</p>
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                className="h-40 w-40 rounded-full text-5xl"
                onClick={handlePetTap}
              >
                🐶
              </Button>
            </div>
            <p className="text-xl">{gameState.petCount || 0} / {gameState.target || 8}</p>
          </div>
        );

      case "colormatch":
      case "rhythm":
      case "difference":
      case "cardflip":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Special Game!</h3>
            <p className="text-lg">Complete the challenge!</p>
            <Button size="lg" onClick={onComplete}>
              Complete ✨
            </Button>
          </div>
        );

      case "dots":
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Question</h3>
            <p className="text-xl">{gameState.question}</p>
            <Input
              value={gameState.userInput || ""}
              onChange={(e) => setGameState({ ...gameState, userInput: e.target.value, wrong: false })}
              placeholder="Enter number..."
              className="text-center max-w-xs mx-auto"
            />
            {gameState.wrong && <p className="text-sm text-destructive">That's not right — try again.</p>}
            <Button onClick={handleDotsSubmit} size="lg">Submit</Button>
          </div>
        );

      default:
        return <div>Loading game...</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 max-w-3xl w-full bg-card/95 backdrop-blur-md shadow-2xl border-4 border-primary/20" ref={gameRef}>
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="text-primary" size={20} />
              <span className="text-sm font-semibold text-primary">Game #{reasonNumber}</span>
            </div>
          </div>
          
          {renderGame()}

          {progress > 0 && progress < 100 && (
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
