import Constants from "expo-constants";
import { Image, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function AboutDialog({ visible, setVisible }) {
  const hide = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Title style={{ textAlign: "center" }}>
          About Yocto Notes
        </Dialog.Title>
        <Dialog.Content style={{ gap: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 128, height: 128 }}
            />
          </View>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            version {`${Constants.expoConfig.version}`}
          </Text>
          <Text variant="bodyLarge" style={{ textAlign: "center" }}>
            Quickly take notes with ease
          </Text>
          <View>
            <Text variant="bodySmall" style={{ textAlign: "center" }}>
              Copyright © 2024 Delvian Valentine
            </Text>
            <Text variant="bodySmall" style={{ textAlign: "center" }}>
              delvian.valentine@gmail.com
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
