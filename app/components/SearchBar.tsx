import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";

type Props = {
  onSearchPress: (query: string) => void;
};

export const SearchBar = ({ onSearchPress }: Props) => {
  const [text, setText] = useState("");
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="ionicon" color="#3e5336" />
        <TextInput
					value={text}
					onChangeText={setText}
					style={styles.searchInputText}
          returnKeyType="search"
          onFocus={() => setText('')}
          onBlur={() => onSearchPress(text)}
          
				/>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => onSearchPress(text)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
  },
  searchContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 3,
    borderColor: "#f6da73",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#f6da73",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "#3e5336",
    fontWeight: "500",
    letterSpacing: 1.2,
  },
  searchInputText: {
    fontSize: 18,
    color: "#3e5336",
    flex: 1,
  },
});
