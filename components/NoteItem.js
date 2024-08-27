import { Link } from "expo-router";
import { List } from "react-native-paper";

export default function NoteItem({ id, title }) {
  return (
    <Link href={`/note/${id}`} asChild>
      <List.Item title={title} />
    </Link>
  );
}
