import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { ChoppThemedText } from "@/shared";
import { ChoppParallaxScrollView } from "@/shared";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DevPage() {
  return (
    <ChoppParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Link href="/registration">
        <ChoppThemedText type="link">/registration</ChoppThemedText>
      </Link>

      <Link href="/login">
        <ChoppThemedText type="link">/login</ChoppThemedText>
      </Link>

      <Link href="/verification-code">
        <ChoppThemedText type="link">/verification-code</ChoppThemedText>
      </Link>

      <Button
        onPress={() => {
          AsyncStorage.clear();
        }}
      >
        reset async storage
      </Button>
    </ChoppParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
