import Login from "@/features/auth/components/Login";
import Customers from "@/features/customers";
import Dashboard from "@/features/dashboard/Dashboard";
import Layout from "@/features/dashboard/layout";
import ServiceCategory from "@/features/serviceCategory/_components/ServiceCategory";
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
          path: "/services",
          element: <Services />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/customers/create",
          element: <Customers />,
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
