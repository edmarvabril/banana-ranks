export type LeaderBoardItem = {
  key: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  uid: string;
  isSearchedUser?: boolean;
  rank?: number;
};
