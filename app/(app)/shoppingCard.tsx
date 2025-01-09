import { ChoppBackButton, ChoppScreenLayout } from "@/shared";
import { FlatList, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

export default function Basket() {
  const dispatch = useDispatch();
  const { basketItems } = useSelector((state: RootState) => state.basketItems);
  const { t } = useTranslation();

  return (
    <>
      <ChoppBackButton style={styles.backButton} redirectToRoot={true} />
      <Text style={styles.header} variant="headlineLarge">
        {t("basket")}
      </Text>
      <ChoppScreenLayout>
        <View style={{ flex: 1 }}>
          <Button
            style={styles.clearButton}
            mode="contained"
            //onPress={() => dispatch(clearBasketItems())}
          >
            {t("clearBasket")}
          </Button>

          {/* <FlatList
            data={basketItems}
            keyExtractor={(item) => item.key.toString()}
            numColumns={1}
            style={{ flex: 1 }}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          /> */}
          {/* {basketItems.length ? (
            <Button
              style={styles.buyButton}
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              {t("toOrder")}
            </Button>
          ) : (
            <Text style={styles.emptyBasket}>{t("emptyBasket")}</Text>
          )} */}
        </View>
      </ChoppScreenLayout>
    </>
  );
}
const styles = StyleSheet.create({
  emptyBasket: {
    textAlign: "center",
    padding: 15,
  },
  buyButton: {
    marginHorizontal: 15,
  },
  clearButton: {
    marginHorizontal: 15,
  },
  backButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  header: {
    padding: 15,
  },
});
