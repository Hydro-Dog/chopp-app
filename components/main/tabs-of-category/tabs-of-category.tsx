import { AppDispatch, RootState } from "@/store/store";
import * as React from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/product-category-slice";

type Props = {
  chosenCategory: number;
  setChosenCategory: React.Dispatch<React.SetStateAction<number>>;
};

export const CategoryTabs = ({ chosenCategory, setChosenCategory }: Props) => {

  const { category } = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={chosenCategory}
        onValueChange={setChosenCategory}
        buttons={
          Array.isArray(category)
            ? category?.map((item) => ({
                value: item.id,
                label: item.title,
              }))
            : []
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
