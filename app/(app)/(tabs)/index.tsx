import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ProductGridItem } from "@/components/main";
import {
  FETCH_STATUS,
  ChoppScreenLayout,
  URLs,
  Pagination,
  useSuperDispatch,
} from "@/shared";
import { fetchProducts, Product } from "@/store/slices/product-slice";
import { AppDispatch, RootState } from "@/store/store";
import { CONFIG } from "@/my-config";

const { Header } = Appbar;
const LIMIT = 2; //Количество элеменов на странице, 2 взято в качестве примера
const FIRST_PAGE_NUMBER = 1;

export default function TabHome() {
  const dispatch = useDispatch<AppDispatch>();
  const superDispatch = useSuperDispatch();
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Partial<Pagination>>();
  const [search, setSearch] = useState("");
  const { fetchProductsStatus, products } = useSelector(
    (state: RootState) => state.products
  );

  console.log("pageProducts; ", pageProducts);

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId: 2, //Пока не прикрутим категории на страницу подставляем id категории из таблицы Category в БД
        limit: LIMIT,
        pageNumber: FIRST_PAGE_NUMBER,
        search,
      })
    );
    setPagination({
      limit: LIMIT,
      pageNumber: FIRST_PAGE_NUMBER,
    });
  }, [dispatch, search]);

  useEffect(() => {
    setPageProducts(products?.items || []);
  }, [pageProducts.length, products]);

  const onLoadMore = () => {
    superDispatch({
      action: fetchProducts({
        categoryId: 2, //Пока не прикрутим категории на страницу подставляем id категории из таблицы Category в БД
        limit: pagination?.limit,
        pageNumber: pagination?.pageNumber + 1,
        search,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({
          ...pagination,
          pageNumber: pagination?.pageNumber + 1,
        });
      },
    });
  };

  return (
    <>
      <Header>
        <TextInput
          label="Поиск"
          value={""}
          //TODO: цвета берем из темы ключом, чтобы при ключении темной темы цвет был норм
          activeUnderlineColor="grey"
          style={{ width: "100%" }}
        />
      </Header>
      <KeyboardAwareScrollView>
        <ChoppScreenLayout
          loading={fetchProductsStatus === FETCH_STATUS.LOADING}
        >
          <View style={styles.container}>
            {/* TODO: Этот экран (CallStatusScreen + CurrentOrderDetails) мы перенесем куда-нибудь в другое место.
             Типа в статус заказа   */}
            {/* {currentOrderData ? (
              <>
                <CallStatusScreen
                  currentStatus={currentOrderData?.statusData?.status}
                  timeStamp={currentOrderData?.statusData?.timeStamp}
                />

                <CurrentOrderDetails order={currentOrderData} />
              </>
            ) : ( */}
            <>
              <FlatList
                data={pageProducts}
                keyExtractor={(item) => item.title}
                numColumns={2}
                renderItem={({ item }) => (
                  <ProductGridItem
                    title={item.title}
                    description={item.description}
                    imagePath={CONFIG.filesUrl + item.images[0].path}
                    price={String(item.price)}
                  />
                )}
              />
            </>
            {/* )} */}
          </View>
        </ChoppScreenLayout>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 64,
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
