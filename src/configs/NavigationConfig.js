import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "clients",
    path: `${APP_PREFIX_PATH}/clients`,
    title: "Clients",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "user-list",
        path: `${APP_PREFIX_PATH}/clients/user-list`,
        title: "User list",
        breadcrumb: false,
      },
    ],
  },
  {
    key: "settings",
    path: `${APP_PREFIX_PATH}/settings`,
    title: "Settings",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "edit-profile",
        path: `${APP_PREFIX_PATH}/settings/edit-profile`,
        title: "Edit profile",
        breadcrumb: false,
      },
    ],
  },
  {
    key: "catalog",
    path: `${APP_PREFIX_PATH}/catalog`,
    title: "Catalog",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "products",
        path: `${APP_PREFIX_PATH}/catalog/products`,
        title: "Products",
        breadcrumb: false,
      },
      {
        key: "categories",
        path: `${APP_PREFIX_PATH}/catalog/categories`,
        title: "Categories",
        breadcrumb: false,
      },
    ],
  },
  {
    key: "planner",
    path: `${APP_PREFIX_PATH}/planner`,
    title: "Planner",
    icon: AppstoreAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
