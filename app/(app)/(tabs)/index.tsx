import { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ProductGridItem } from "@/components/main";
import { CONFIG } from "@/my-config";

const LIMIT = 4;
const API_URL = "http://localhost:6001/api/products";

export default function TabHome() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchItems = async (currentPage) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          limit: LIMIT,
          page: currentPage,
        },
      });

      const newItems = response.data;
      setItems((prevItems) => [...prevItems, ...newItems.items]);

      if (newItems.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
      hasMore &&
      !loading
    ) {
      loadMore();
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View style={styles.listContainer}>
        {items.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemContainer}>
            <ProductGridItem
              title={item.title}
              imagePath={CONFIG.filesUrl + item.images?.[0]?.path}
              price={String(item.price)}
            />
          </TouchableOpacity>
        ))}
        {loading && <ActivityIndicator size="large" style={styles.loader} />}
        {!hasMore && (
          <Text style={styles.noMoreText}>No more items to load</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 20,
  },
  listContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemBody: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  loader: {
    marginTop: 20,
  },
  noMoreText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
