import { useRoutes } from "react-router-dom";
import Login from "../features/auth/components/Login";
import Layout from "../features/dashboard/layout";
import Dashboard from "../features/dashboard/Dashboard";
import Customers from "../features/customers";
import Services from "../features/services/_components/Services";

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
