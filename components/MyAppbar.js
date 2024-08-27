import { useState } from "react";
import { Appbar, useTheme } from "react-native-paper";

import MyMenu from "./MyMenu";

export default function MyAppbar({ navigation, back }) {
  const [menu, setMenu] = useState(false);
  const theme = useTheme();

  return (
    <Appbar.Header elevated>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title="Yocto Notes" />
      {!back && <MyMenu />}
    </Appbar.Header>
  );
}
