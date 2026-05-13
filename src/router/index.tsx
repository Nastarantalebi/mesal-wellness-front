import Login from "@/features/auth/_components/Login";
import Customers from "@/features/customers/_components/Customers";
import Dashboard from "@/features/dashboard/Dashboard";
import Layout from "@/features/dashboard/layout";
import Facilities from "@/features/basics/facilities/_components/Facilities";
import Resources from "@/features/basics/resources/_components/Resources";
import ResourceType from "@/features/basics/resourceType/_components/ResourcesType";
import ServiceCategory from "@/features/basics/serviceCategory/_components/ServiceCategory";
import Services from "@/features/basics/services/_components/Services";
import Therapists from "@/features/therapists/_components/Therapists";
import TherapistsForm from "@/features/therapists/_components/TherapistsForm";
import { useRoutes } from "react-router-dom";
import Booking from "@/features/booking/_components/Booking";
import BookingForm from "@/features/booking/_components/BookingForm";
import TabList from "@/features/booking/_components/reservation/_components/TabList";
import NotFound from "@/features/_components/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "@/features/profile/_components/Profile";
import Company from "@/features/basics/company/_components/Company";
import Contract from "@/features/basics/contract/_components/Contract";
import Roles from "@/features/settings/roles/_components/Roles";
import Menus from "@/features/settings/menus/_components/Menus";
import Widgets from "@/features/settings/widgets/_components/Widgets";
import Permissions from "@/features/settings/permissions/_components/Permissions";
import Staff from "@/features/staff/_components/Staff";
import Tickets from "@/features/tickets/_components/Tickets";
import UserNotFound from "@/features/_components/UserNotFound";
import UserOrganizations from "@/features/_components/UserOrganizations";
import RouteGuard from "./RouteGaurd";
import SmsLogs from "@/features/sms-logs/_components/SmsLogs";
import LandingPage from "@/components/landing/_components/LandingPage";
import ServicesInfo from "@/features/basics/services/_components/ServiceInfo";
import TherapistsReport from "@/features/therapists-report/_components/TherapistsReport";
import ServicesReport from "@/features/services-report/_components/ServicesReport";

function Router() {
  const routes = [
    {
      element: (
        <ProtectedRoutes>
          <RouteGuard>
            <Layout />
          </RouteGuard>
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/service-category",
          element: <ServiceCategory />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/services/view",
          element: <ServicesInfo />,
        },
        {
          path: "/resources",
          element: <Resources />,
        },
        {
          path: "/resource-type",
          element: <ResourceType />,
        },
        {
          path: "/therapists",
          element: <Therapists />,
        },
        {
          path: "/therapists-report",
          element: <TherapistsReport />,
        },
        {
          path: "/services-report",
          element: <ServicesReport />,
        },
        {
          path: "/therapists/create",
          element: <TherapistsForm />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/staff",
          element: <Staff />,
        },
        {
          path: "/facilities",
          element: <Facilities />,
        },

        {
          path: "/company",
          element: <Company />,
        },
        {
          path: "/contract",
          element: <Contract />,
        },

        {
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/calendar",
          element: <TabList />,
        },
        {
          path: "/booking/create",
          element: <BookingForm />,
        },
        {
          path: "/roles",
          element: <Roles />,
        },
        {
          path: "/widgets",
          element: <Widgets />,
        },
        {
          path: "/permissions",
          element: <Permissions />,
        },
        {
          path: "/menus",
          element: <Menus />,
        },
        {
          path: "/sms-logs",
          element: <SmsLogs />,
        },
        {
          path: "/tickets",
          element: <Tickets />,
        },
        {
          path: "/tickets/:id",
          element: <Tickets />,
        },
      ],
    },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "user-organizations",
      element: <UserOrganizations />,
    },
    {
      path: "user-not-found",
      element: <UserNotFound />,
    },
    { path: "*", element: <NotFound /> },
  ];

  return useRoutes(routes);
}

export default Router;
