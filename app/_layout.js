import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import MyAppbar from "../components/MyAppbar";
import { NotesProvider } from "../contexts/NotesContext";

export default function Layout() {
  return (
    <NotesProvider>
      <PaperProvider>
        <Stack screenOptions={{ header: (props) => <MyAppbar {...props} /> }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="note/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </NotesProvider>
  );
}
