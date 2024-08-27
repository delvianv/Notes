import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

export default function DeleteDialog({ visible, setVisible, handleDelete }) {
  const theme = useTheme();

  const hide = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Title>Delete note</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>No</Button>
          <Button textColor={theme.colors.error} onPress={handleDelete}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
