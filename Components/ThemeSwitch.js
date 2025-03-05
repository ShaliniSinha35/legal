import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ToggleButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppContext } from "../context/AppContext";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(AppContext);

  const darkIcon = () => {
    return (
      <Ionicons
        name="partly-sunny-sharp"
        size={24}

color="#111"
      />
    );
  };
  const lightIcon = () => {
    return (
      <Ionicons
        name="partly-sunny-sharp"
        size={24}
        color="#FFD700"
      />
    );
  };

  return (
    <ToggleButton.Row
     
      onValueChange={(value) => setTheme(value)}
      value={theme}
    >
      <ToggleButton icon={lightIcon} value="light" />
      <ToggleButton icon={darkIcon} value="dark" />
    </ToggleButton.Row>
  );
};

export default ThemeSwitcher;
