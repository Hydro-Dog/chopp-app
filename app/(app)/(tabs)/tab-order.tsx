import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyCard, OrderScreen } from "@/components/order";
import { Order, ORDER_STATUS } from "@/shared";
import { fetchOrders } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabOrder() {
  const { orders } = useSelector((state: RootState) => state.orders);
  const [activeOrder, setActiveOrder] = useState<Order>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //Пока не показываются товары в запросе на последний по времени заказ (fetchLastOrder)
    dispatch(fetchOrders());
    console.log(orders);
  }, []);

  useEffect(() => {
    if (orders) {
      setActiveOrder(orders.find((item) => item.orderStatus !== ORDER_STATUS.DELIVERED));
    }
  }, [orders]);

  return activeOrder ? <OrderScreen order={activeOrder} /> : <EmptyCard message="noOrdersInProcessing" />;
}
