export interface Reason {
  id: number;
  category: string;
  emoji: string;
  text: string;
  gameType:
    | "catch"
    | "memory"
    | "quickclick"
    | "scramble"
    | "simon"
    | "drag"
    | "trivia"
    | "colormatch"
    | "rhythm"
    | "maze"
    | "balloon"
    | "puzzle"
    | "whack"
    | "reaction"
    | "dots"
    | "difference"
    | "cardflip"
    | "typing"
    | "falling"
    | "spin"
    | "tictactoe";
}

export const reasons: Reason[] = [
  { id: 1, category: "Heart", emoji: "❤️", text: "You keep me safe from every possible thing", gameType: "catch" },
  { id: 2, category: "Heart", emoji: "❤️", text: "You make me smile even on my saddest days", gameType: "memory" },
  { id: 3, category: "Heart", emoji: "❤️", text: "You care even when you're tired", gameType: "quickclick" },
  { id: 4, category: "Heart", emoji: "❤️", text: "Your love feels like home", gameType: "spin" },
  { id: 5, category: "Heart", emoji: "❤️", text: "You listen to me even when i boss around too much", gameType: "scramble" },
  { id: 6, category: "Heart", emoji: "❤️", text: "You make me feel understood", gameType: "simon" },

  { id: 7, category: "Treatment", emoji: "💗", text: "You think about me before yourself", gameType: "trivia" },
  { id: 8, category: "Treatment", emoji: "💗", text: "You never make me feel alone", gameType: "tictactoe" },
  { id: 9, category: "Treatment", emoji: "💗", text: "You remember the little things", gameType: "pet" },
  { id: 10, category: "Treatment", emoji: "💗", text: "You make every day special", gameType: "maze" },
];

export default reasons;
