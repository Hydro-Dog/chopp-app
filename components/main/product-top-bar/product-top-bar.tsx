import { COLORS } from "@/constants/colors";
import { ScrollView, View, StyleSheet } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useChoppTheme } from "@/shared";
const { Header } = Appbar;
// eslint-disable-next-line react-hooks/rules-of-hooks
const { theme } = useChoppTheme();
type Props = {
  chosenCategory: number;
  searchQuery: string;
  setChosenCategory: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};
export const ProductTopBar = ({
  chosenCategory,
  searchQuery,
  setChosenCategory,
  setSearchQuery,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Header style={styles.header}>
      <View style={styles.viewInHeader}>
        <View style={styles.centering}>
          <Searchbar
            placeholder={t("search")}
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.search}
            inputStyle={{ paddingBottom: 10 }} //Знаю что кастыль но почему-то ширина именно инпут поля изменяться не хочет вообще
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryTabs
            chosenCategory={chosenCategory}
            setChosenCategory={setChosenCategory}
          />
        </ScrollView>
      </View>
    </Header>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 130,
  },
  viewInHeader: {
    flex: 1,
  },
  search: {
    backgroundColor: COLORS.light.onPrimary,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: COLORS.light.primaryContainer,
    width: "95%",
    height: 50,
  },
  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});
