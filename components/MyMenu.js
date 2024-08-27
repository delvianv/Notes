import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";

import AboutDialog from "./AboutDialog";

export default function MyMenu() {
  const [visible, setVisible] = useState(false);
  const [about, setAbout] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const showAbout = () => {
    hideMenu();
    setAbout(true);
  };

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        anchor={<Appbar.Action icon="dots-vertical" onPress={showMenu} />}
        anchorPosition="bottom"
      >
        <Menu.Item title="About Yocto Notes" onPress={showAbout} />
      </Menu>
      <AboutDialog visible={about} setVisible={setAbout} />
    </>
  );
}
