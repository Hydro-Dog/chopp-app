import { StyleSheet, Image, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { ChoppThemedText } from "@/shared";
import { ChoppThemedView } from "@/shared";
import {
  ChoppCollapsible,
  ChoppExternalLink,
  ChoppParallaxScrollView,
} from "@/shared";

export default function TabTwoScreen() {
  return (
    <ChoppParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Link href="/registration">
        <ChoppThemedText type="link">Go to home screen!</ChoppThemedText>
      </Link>
      <ChoppThemedView style={styles.titleContainer}>
        <ChoppThemedText type="title">Explore</ChoppThemedText>
      </ChoppThemedView>
      <ChoppThemedText>
        This app includes example code to help you get started.
      </ChoppThemedText>
      <ChoppCollapsible title="File-based routing">
        <ChoppThemedText>
          This app has two screens:{" "}
          <ChoppThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ChoppThemedText>{" "}
          and{" "}
          <ChoppThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ChoppThemedText>
        </ChoppThemedText>
        <ChoppThemedText>
          The layout file in{" "}
          <ChoppThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ChoppThemedText>{" "}
          sets up the tab navigator.
        </ChoppThemedText>
        <ChoppExternalLink href="https://docs.expo.dev/router/introduction">
          <ChoppThemedText type="link">Learn more</ChoppThemedText>
        </ChoppExternalLink>
      </ChoppCollapsible>
      <ChoppCollapsible title="Android, iOS, and web support">
        <ChoppThemedText>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <ChoppThemedText type="defaultSemiBold">w</ChoppThemedText>{" "}
          in the terminal running this project.
        </ChoppThemedText>
      </ChoppCollapsible>
      <ChoppCollapsible title="Images">
        <ChoppThemedText>
          For static images, you can use the{" "}
          <ChoppThemedText type="defaultSemiBold">@2x</ChoppThemedText> and{" "}
          <ChoppThemedText type="defaultSemiBold">@3x</ChoppThemedText> suffixes to
          provide files for different screen densities
        </ChoppThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ChoppExternalLink href="https://reactnative.dev/docs/images">
          <ChoppThemedText type="link">Learn more</ChoppThemedText>
        </ChoppExternalLink>
      </ChoppCollapsible>
      <ChoppCollapsible title="Custom fonts">
        <ChoppThemedText>
          Open <ChoppThemedText type="defaultSemiBold">app/_layout.tsx</ChoppThemedText>{" "}
          to see how to load{" "}
          <ChoppThemedText style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </ChoppThemedText>
        </ChoppThemedText>
        <ChoppExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ChoppThemedText type="link">Learn more</ChoppThemedText>
        </ChoppExternalLink>
      </ChoppCollapsible>
      <ChoppCollapsible title="Light and dark mode components">
        <ChoppThemedText>
          This template has light and dark mode support. The{" "}
          <ChoppThemedText type="defaultSemiBold">useColorScheme()</ChoppThemedText> hook
          lets you inspect what the user's current color scheme is, and so you
          can adjust UI colors accordingly.
        </ChoppThemedText>
        <ChoppExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ChoppThemedText type="link">Learn more</ChoppThemedText>
        </ChoppExternalLink>
      </ChoppCollapsible>
      <ChoppCollapsible title="Animations">
        <ChoppThemedText>
          This template includes an example of an animated component. The{" "}
          <ChoppThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ChoppThemedText>{" "}
          component uses the powerful{" "}
          <ChoppThemedText type="defaultSemiBold">
            react-native-reanimated
          </ChoppThemedText>{" "}
          library to create a waving hand animation.
        </ChoppThemedText>
        {Platform.select({
          ios: (
            <ChoppThemedText>
              The{" "}
              <ChoppThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ChoppThemedText>{" "}
              component provides a parallax effect for the header image.
            </ChoppThemedText>
          ),
        })}
      </ChoppCollapsible>
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
