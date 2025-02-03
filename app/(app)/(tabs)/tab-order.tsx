import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyCard, OrderScreen } from "@/components/order";
import { Order, ORDER_STATUS } from "@/shared";
import { fetchLastOrder } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabOrder() {
  const { currentOrder } = useSelector((state: RootState) => state.orders);
  const [activeOrder, setActiveOrder] = useState<Order>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLastOrder());
  }, []);

  useEffect(() => {
    if (currentOrder && currentOrder?.orderStatus !== ORDER_STATUS.DELIVERED) {
      setActiveOrder(currentOrder);
    }
  }, [currentOrder]);

  return activeOrder ? <OrderScreen order={activeOrder} /> : <EmptyCard message="noOrdersInProcessing" />;
}
