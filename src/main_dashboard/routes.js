
import Dashboard from "@adder-ui/icons/Dashboard";
import Person from "@adder-ui/icons/Person";
import LibraryBooks from "@adder-ui/icons/LibraryBooks";
import BubbleChart from "@adder-ui/icons/BubbleChart";
import LocationOn from "@adder-ui/icons/LocationOn";
import Notifications from "@adder-ui/icons/Notifications";
import Unarchive from "@adder-ui/icons/Unarchive";
import Language from "@adder-ui/icons/Language";


import DashboardPage from '../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from "../main_dashboard/views/UserProfile/UserProfile.js";
import TableList from "../main_dashboard/views/TableList/TableList.js";
import Typography from "../main_dashboard/views/Typography/Typography.js";
import Icons from "../main_dashboard/views/Icons/Icons.js";
import Maps from "../main_dashboard/views/Maps/Maps.js";
import NotificationsPage from "../main_dashboard/views/Notifications/Notifications.js";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
 
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
 

];

export default dashboardRoutes;
