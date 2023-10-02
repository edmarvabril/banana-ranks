import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LeaderBoardItem } from '../../types/leaderboards';
import leaderBoardData from '../leaderboard.json';
import { RootState } from '../../../App';
import { sortBy } from 'lodash';

// convert leaderboardData to array
const dataArray: LeaderBoardItem[] = sortBy(Object.keys(leaderBoardData).map(
  (key) => {
    return { ...leaderBoardData[key], key };
  },
), (user => user.bananas)).reverse().map((item, index) => ({ ...item, rank: index + 1}))

const leaderboardTopTen = dataArray.slice(0, 10);

interface LeaderboardState {
  leaderboards: LeaderBoardItem[];
  leaderboardTopTen: LeaderBoardItem[];
  searchResults: LeaderBoardItem[];
}

const initialState: LeaderboardState = {
  leaderboards: dataArray,
  leaderboardTopTen: leaderboardTopTen,
  searchResults: [],

}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<LeaderBoardItem[]>) => {
      state.searchResults = action.payload
    },
  },
})

export const { setSearchResults } = leaderboardSlice.actions

export default leaderboardSlice.reducer