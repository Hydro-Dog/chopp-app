import { ChoppBackButton, ChoppScreenLayout } from "@/shared";
import { Text, StyleSheet } from "react-native";

export default function ProductCard() {
  return (
    <>
      <ChoppBackButton redirectToRoot={true} style={styles.backButton} />
      <ChoppScreenLayout containerStyles={styles.container}>
        <Text>qweqwe</Text>
      </ChoppScreenLayout>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    height: "100%",
  },
  backButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
    marginLeft: 16,
    marginBottom: 12,
  },
});
