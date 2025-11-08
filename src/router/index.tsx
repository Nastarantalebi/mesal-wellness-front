import Login from "@/features/auth/components/Login";
import Customers from "@/features/customers";
import CustomerForm from "@/features/customers/CustomerForm";
import Dashboard from "@/features/dashboard/Dashboard";
import Layout from "@/features/dashboard/layout";
import Facilities from "@/features/facilities/_components/Facilities";
import FacilitiesForm from "@/features/facilities/_components/FacilitiesForm";
import ServiceCategory from "@/features/serviceCategory/_components/ServiceCategory";
import ServiceCategoryForm from "@/features/serviceCategory/_components/ServiceCategoryForm";
import Services from "@/features/services/_components/Services";
import { useRoutes } from "react-router-dom";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        // <ProtectedRoute>
          <Layout />
        // </ProtectedRoute>
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
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/customers/create",
          element: <CustomerForm />,
        },
        {
          path: "/facilities",
          element: <Facilities />,
        },
        {
          path: "/facilities/create",
          element: <FacilitiesForm />,
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
