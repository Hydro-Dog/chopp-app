import { AppDispatch, RootState } from "@/store/store";
import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/product-category-slice";

type Props = {
  chosenCategory: number;
  setChosenCategory: Dispatch<SetStateAction<number>>;
};

export const CategoryTabs = ({ chosenCategory, setChosenCategory }: Props) => {
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={String(chosenCategory)}
        onValueChange={(value) => setChosenCategory(Number(value))}
        buttons={
          Array.isArray(categories)
            ? categories?.map((item) => ({
                value: String(item.id),
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
