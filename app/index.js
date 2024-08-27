import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Searchbar, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NoteItem from "../components/NoteItem";
import { IS_DEV, useNotes, useNotesDispatch } from "../contexts/NotesContext";

export default function Home() {
  const notes = useNotes();
  const dispatchNotes = useNotesDispatch();
  const [search, setSearch] = useState();
  const theme = useTheme();

  useEffect(() => {
    const getData = async () => {
      if (IS_DEV) return;

      try {
        const value = await AsyncStorage.getItem("notes");
        dispatchNotes({
          type: "load",
          notes: value != null ? JSON.parse(value) : [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
        style={{ marginHorizontal: 16 }}
      />
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem id={item.id} title={item.title} />}
        keyExtractor={(item) => item.id}
        style={styles.notes}
      />
      <Link href="/note/new" asChild>
        <FAB icon="plus" style={styles.fab} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    gap: 8,
  },
  notes: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
});
