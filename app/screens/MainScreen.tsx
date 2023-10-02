import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "../components/SearchBar";

import { LeaderBoardItem } from "../types/leaderboards";
import { useAppDispatch, useAppSelector } from "../store/slices/hooks";
import { isEmpty } from "lodash";
import { setSearchResults } from "../store/slices/leaderboardSlice";

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const leaderboards = useAppSelector(state => state.leaderboards.leaderboards)
  const leaderboardTopTen = useAppSelector(state => state.leaderboards.leaderboardTopTen)
  const searchResults = useAppSelector(state => state.leaderboards.searchResults)

  const renderListItem = useCallback(({ item }: { item: LeaderBoardItem }) => {
    const isSearchedUser = item.isSearchedUser;
    return (
      <View style={[styles.listItemContainer, {backgroundColor: isSearchedUser ? '#e55b7e' : '#fff'}]}>
        <Text style={styles.rowItem}>{item.name}</Text>
        <Text style={styles.rowItem}>{item.rank}</Text>
        <Text style={styles.rowItem}>{item.bananas}</Text>
        <Text style={styles.rowItem}>{isSearchedUser ? 'yes' : 'no'}</Text>
      </View>
    )
  }, []);

  const onSearchPress = (queryString: string) => {
    const searchedUser = leaderboards.find((user) => user.name.toLowerCase() === queryString.toLowerCase());

    if (!searchedUser) {
      dispatch(setSearchResults([]))
      Alert.alert('Error', 'This user name does not exist! Please specify an existing user name!');
    } else {
      if (searchedUser.rank! < 11) {
        // User is in the top 10
        dispatch(setSearchResults(leaderboardTopTen.map((user) => ({
          ...user,
          isSearchedUser: user.name.toLowerCase() === queryString.toLowerCase(),
        }))))
      } else {
        // User not in the top 10
        dispatch(setSearchResults(leaderboardTopTen.map((user, index) => {
          if (index === 9) {
            return {...searchedUser, isSearchedUser: true};
          } else {
            return user;
          }
        })))
      }
    }
  };

  return (
    <ImageBackground
      imageStyle={{ opacity: 0.3 }}
      source={require("../../assets/banana_bg.png")}
      style={{ flex: 1, backgroundColor: "#3e5336" }}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar onSearchPress={onSearchPress} />
        {!isEmpty(searchResults) && (
          <View style={styles.contentContainer}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.columHeader}>Name</Text>
              <Text style={styles.columHeader}>Rank</Text>
              <Text style={styles.columHeader}>Bananas</Text>
              <Text style={styles.columHeader}>Is Searched</Text>
            </View>
            <FlatList data={searchResults} renderItem={renderListItem} />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  columHeader: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'center'
  },
  rowItem: {
    flex: 1,
    textAlign: 'center'
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: 3,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 20,
    padding: 8,
    borderColor: '#f6da73',
    borderWidth: 5,
  },
});
