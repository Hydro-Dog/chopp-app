import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { useBoolean } from "usehooks-ts";
import { ProfileScreen } from "@/pages/settings/profile/profile";
import { ProfileForm } from "@/pages/settings/profile/profile-form";
import {
  ChoppAnimatedList,
  ChoppCollapsible,
  ChoppCollapsibleCard,
  ChoppThemedText,
  FETCH_STATUS,
  useChoppTheme,
} from "@/shared";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";
import { fetchOrder, fetchMyOrders } from "@/store/slices/order-slice";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function OrderHistory() {
  const { theme } = useChoppTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { myOrders, fetchMyOrdersStatus } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ChoppScreenLayout
          showLogo
          customLogo={
            <Ionicons
              size={250}
              name="receipt-outline"
              style={{
                color: theme.colors.secondary,
                ...styles.backgroundIcon,
              }}
            />
          }
          showBackButton
          loading={fetchMyOrdersStatus === FETCH_STATUS.LOADING}
        >
          {myOrders && (
            <ChoppAnimatedList
              data={myOrders}
              renderItem={(item) => (
                <ChoppCollapsibleCard title={"item"}>item</ChoppCollapsibleCard>
              )}
            />
          )}
        </ChoppScreenLayout>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  backgroundIcon: {
    position: "absolute",
    right: -80,
    bottom: 160,
    opacity: 0.1,
  },
  content: {
    // width: "90%",
    // flex: 1
    // flexBasis: "80%",
  },
});
