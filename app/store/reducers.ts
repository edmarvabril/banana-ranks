import { combineReducers, configureStore } from '@reduxjs/toolkit'
import leaderboards from './slices/leaderboardSlice'

export const rootReducer = combineReducers({
  leaderboards: leaderboards,
})