import { ROUTES } from "@/shared";

export const ROUTES_TABS_MAP = {
  [ROUTES.MAIN]: {
    title: "mainPage",
    icon: "storefront-outline",
    activeIcon: "storefront",
    routes: [ROUTES.MAIN, ROUTES.TAB_PRODUCTS],
  },
  [ROUTES.TAB_ORDER]: {
    title: "order",
    icon: "truck-delivery-outline",
    activeIcon: "truck-delivery",
    routes: [ROUTES.TAB_ORDER],
  },
  [ROUTES.TAB_SUPPORT_CHAT]: {
    title: "supportPage",
    icon: "message-text-outline",
    activeIcon: "message-text",
    routes: [ROUTES.TAB_SUPPORT_CHAT],
  },
  [ROUTES.TAB_CONTROL_PANEL]: {
    title: "controlPanel",
    icon: "cog-outline",
    activeIcon: "cog",
    routes: [ROUTES.TAB_CONTROL_PANEL],
  },
  [ROUTES.TAB_LOGOUT]: {
    title: "logoutPage",
    icon: "logout",
    activeIcon: "logout",
    routes: [ROUTES.TAB_LOGOUT],
  },
};
