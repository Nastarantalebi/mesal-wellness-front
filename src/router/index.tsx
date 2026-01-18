import Login from "@/features/auth/_components/Login";
import Customers from "@/features/customers/_components/Customers";
import Dashboard from "@/features/dashboard/Dashboard";
import Layout from "@/features/dashboard/layout";
import Facilities from "@/features/basics/facilities/_components/Facilities";
import FacilitiesForm from "@/features/basics/facilities/_components/FacilitiesForm";
import Resources from "@/features/basics/resources/_components/Resources";
import ResourcesForm from "@/features/basics/resources/_components/ResourcesForm";
import ResourceType from "@/features/basics/resourceType/_components/ResourcesType";
import ResourceTypeForm from "@/features/basics/resourceType/_components/ResourcesTypeForm";
import ServiceCategory from "@/features/basics/serviceCategory/_components/ServiceCategory";
import ServiceCategoryForm from "@/features/basics/serviceCategory/_components/ServiceCategoryForm";
import Services from "@/features/basics/services/_components/Services";
import SevicesForm from "@/features/basics/services/_components/SevicesForm";
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
import CompanyForm from "@/features/basics/company/_components/CompanyForm";
import Contract from "@/features/basics/contract/_components/Contract";
import ContractForm from "@/features/basics/contract/_components/ContractForm";
import Roles from "@/features/settings/roles/_components/Roles";
import Menus from "@/features/settings/menus/_components/Menus";
import Widgets from "@/features/settings/widgets/_components/Widgets";
import Permissions from "@/features/settings/permissions/_components/Permissions";
import Staff from "@/features/staff/_components/Staff";
import Tickets from "@/features/tickets/_components/Tickets";
import UserNotFound from "@/features/_components/UserNotFound";
import UserOrganizations from "@/features/organization/_components/UserOrganizations";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
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
          path: "/service-category/create",
          element: <ServiceCategoryForm />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/services/create",
          element: <SevicesForm />,
        },
        {
          path: "/resources",
          element: <Resources />,
        },
        {
          path: "/resources/create",
          element: <ResourcesForm />,
        },
        {
          path: "/resource-type",
          element: <ResourceType />,
        },
        {
          path: "/resource-type/create",
          element: <ResourceTypeForm />,
        },
        {
          path: "/therapists",
          element: <Therapists />,
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
          path: "/facilities/create",
          element: <FacilitiesForm />,
        },
        {
          path: "/company",
          element: <Company />,
        },
        {
          path: "/company/create",
          element: <CompanyForm />,
        },
        {
          path: "/contract",
          element: <Contract />,
        },
        {
          path: "/contract/create",
          element: <ContractForm />,
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
          path: "/tickets",
          element: <Tickets />,
        },
        {
          path: "/tickets/:id",
          element: <Tickets />,
        },
      ],
    },
    // {
    //   path: "/landing-page",
    //   element: <LandingPage />,
    // },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "user-organizations",
      element: <UserOrganizations />,
    },
    { path: "*", element: <NotFound /> },
    {
      path: "/user-not-found",
      element: <UserNotFound />,
    },
    // {
    //   path: "register",
    //   element: <Register />,
    // },
  ];

  return useRoutes(routes);
}

export default Router;
