import Login from "@/features/auth/_components/Login";
import Customers from "@/features/customers/_components/Customers";
import CustomersForm from "@/features/customers/_components/CustomersForm";
import Dashboard from "@/features/dashboard/Dashboard";
import Layout from "@/features/dashboard/layout";
import Facilities from "@/features/facilities/_components/Facilities";
import FacilitiesForm from "@/features/facilities/_components/FacilitiesForm";
import Resources from "@/features/resources/_components/Resources";
import ResourcesForm from "@/features/resources/_components/ResourcesForm";
import ResourceType from "@/features/resourceType/_components/ResourcesType";
import ResourceTypeForm from "@/features/resourceType/_components/ResourcesTypeForm";
import ServiceCategory from "@/features/serviceCategory/_components/ServiceCategory";
import ServiceCategoryForm from "@/features/serviceCategory/_components/ServiceCategoryForm";
import Services from "@/features/services/_components/Services";
import SevicesForm from "@/features/services/_components/SevicesForm";
import Therapists from "@/features/therapists/_components/Therapists";
import TherapistsForm from "@/features/therapists/_components/TherapistsForm";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Booking from "@/features/booking/_components/Booking";
import BookingForm from "@/features/booking/_components/BookingForm";
import TabList from "@/features/booking/_components/reservation/_components/TabList";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
         <ProtectedRoute>
          <Layout />
         </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
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
          path: "/customers/create",
          element: <CustomersForm />,
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
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/booking/calendar",
          element: <TabList />,
        },
        {
          path: "/booking/create",
          element: <BookingForm />,
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
    // {
    //   path: "register",
    //   element: <Register />,
    // },
  ];

  return useRoutes(routes);
}

export default Router;
