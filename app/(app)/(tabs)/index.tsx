import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ProductGridItem } from "@/components/main";
import { TopBar } from "@/components/main/top-bar";
import { CONFIG } from "@/my-config";
import { ChoppScreenLayout, useSuperDispatch, ChoppTabs } from "@/shared";
import { fetchCategories } from "@/store/slices/product-category-slice";
import { fetchProducts, Product } from "@/store/slices/product-slice";
import { fetchShoppingCart } from "@/store/slices/shopping-cart-slice";
import { AppDispatch, RootState } from "@/store/store";
import { SearchResponse, Pagination, FETCH_STATUS } from "@/shared/types";
import React from "react";

//TODO: Временный лимит нужный для тестов. Потом нужно его увеличить.
//TODO PROD: поставить лимит в 100
const LIMIT = 8;
const FIRST_PAGE_NUMBER = 1;

export default function TabHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { superDispatch } = useSuperDispatch<SearchResponse<Product>, unknown>();
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pick<Pagination, "pageNumber" | "limit">>({
    pageNumber: FIRST_PAGE_NUMBER,
    limit: LIMIT,
  });
  const { fetchProductsStatus, products } = useSelector((state: RootState) => state.products);
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const [chosenCategory, setChosenCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId: Number(chosenCategory),
        limit: LIMIT,
        pageNumber: FIRST_PAGE_NUMBER,
        search: searchQuery,
      }),
    );

    setPagination({
      limit: LIMIT,
      pageNumber: FIRST_PAGE_NUMBER,
    });
  }, [dispatch, searchQuery, chosenCategory]);

  useEffect(() => {
    setPageProducts(products?.items || []);
  }, [products]);

  const onLoadMore = () => {
    if (fetchProductsStatus === FETCH_STATUS.LOADING || pageProducts.length === products?.totalItems) {
      return;
    }

    superDispatch({
      action: fetchProducts({
        categoryId: Number(chosenCategory),
        limit: pagination?.limit,
        pageNumber: pagination.pageNumber + 1,
        search: searchQuery,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({
          ...pagination,
          pageNumber: pagination.pageNumber + 1,
        });
      },
    });
  };
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchShoppingCart());
  }, []);

  //TODO: Подумать как быть с категорией Без категории  Добавить в админку уведомление, что эти товары показаны не будут
  const options = [...categories]
    .filter((item) => item.title !== "Без категории")
    ?.sort((a, b) => a.order - b.order)
    .map(({ id, title }) => ({ id, value: title }));

  useEffect(() => {
    if (!chosenCategory && options.length) {
      setChosenCategory(options[0].id);
    }
  }, [chosenCategory, options]);

  return (
    <>
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} shoppingCart={shoppingCart} />
      <ChoppTabs value={chosenCategory} onChange={(value) => setChosenCategory(value.id)} options={options} />

      <ChoppScreenLayout loading={fetchProductsStatus === FETCH_STATUS.LOADING && pageProducts.length === 0}>
        <View style={styles.container}>
          <FlatList
            data={pageProducts}
            keyExtractor={(item) => item.title}
            numColumns={2}
            onEndReached={onLoadMore}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <ProductGridItem
                itemId={item.id}
                key={item.id}
                title={item.title}
                imagePath={CONFIG.filesUrl + item.images?.[0]?.path}
                price={String(item.price)}
              />
            )}
          />
        </View>
      </ChoppScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "100%",
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
  },
  activityIndicator: {
    position: "absolute",
    top: 40,
    right: 40,
  },
});
