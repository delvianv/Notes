import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

import DeleteDialog from "../../components/DeleteDialog";
import { useNotes, useNotesDispatch } from "../../contexts/NotesContext";

export default function Note() {
  const { id } = useLocalSearchParams();
  const notes = useNotes();
  const dispatchNotes = useNotesDispatch();
  const theme = useTheme();

  const isNew = id == "new";
  const note = isNew
    ? { title: "", content: "" }
    : notes.find((note) => note.id == id);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleSave = () => {
    if (isNew) {
      dispatchNotes({ type: "new", title, content });
    } else {
      dispatchNotes({ type: "edit", id, title, content });
    }

    router.navigate("/");
  };

  const handleDelete = () => {
    dispatchNotes({ type: "delete", id });
    router.navigate("/");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.inputs}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          mode="outlined"
        />
        <TextInput
          label="Content"
          value={content}
          onChangeText={(text) => setContent(text)}
          mode="outlined"
          multiline
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.buttons}>
        {id != "new" && (
          <Button
            mode="outlined"
            textColor={theme.colors.error}
            onPress={() => setDeleteDialog(true)}
          >
            Delete
          </Button>
        )}
        <Button mode="contained" onPress={handleSave} disabled={title == ""}>
          Save
        </Button>
      </View>
      <DeleteDialog
        visible={deleteDialog}
        setVisible={setDeleteDialog}
        handleDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  inputs: {
    flex: 1,
    width: "100%",
    gap: 8,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
