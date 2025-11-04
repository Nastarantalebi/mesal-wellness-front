import { useRoutes } from "react-router-dom";
import Login from "../features/auth/components/Login";
import Layout from "../features/dashboard/layout";
import Dashboard from "../features/dashboard/Dashboard";
import Patients from "../features/customers";
import ProtectedRoute from "./ProtectedRoutes";
import PatientForm from "../features/customers/CustomerForm";

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
          path: "/patients",
          element: <Patients />,
        },
        {
          path: "/patients/create",
          element: <PatientForm />,
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
