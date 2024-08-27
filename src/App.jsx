import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DigitalTransformation from "./pages/DigitalTransformation";
import DataSolution from "./pages/DataSolution";
import AvenueImpactDevelopment from "./pages/AvenueImpactDevelopment";
import AVI from "./pages/AVI";
import PreviewCourse from "./pages/previewCourse";
import PreviewVideoCourse from "./pages/previewVideoCourse";
import Component from "./Components/Component";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import EmptyPage from "./pages/dashboard/EmptyPage";
import Notification from "./pages/dashboard/Notification";
import Wishlist from "./pages/dashboard/Wishlist";

import StudentSettings from "./pages/dashboard/StudentSettings";
import Referral from "./pages/dashboard/Referral";
import OtherLayout from "./layouts/OtherLayout";
import ShareDocument from "./pages/dashboard/ShareDocument";
import Documents from "./pages/dashboard/Documents";
import Assignment from "./pages/dashboard/Assignment";
import Overview from "./pages/dashboard/Overview";

import DashboardDiscover from "./pages/dashboard/DashboardDiscover";
import JoinProjectTeam from "./pages/dashboard/JoinProjectTeam";
import EmptyJoinProjectTeam from "./pages/dashboard/EmptyJoinProjectTeam";
import EmptyGetCertificate from "./pages/dashboard/EmptyGetCertificate";
import GetCertificate from "./pages/dashboard/GetCertificate";
import LeaveRating from "./pages/dashboard/LeaveRating";

import ServiceLayout from "./layouts/ServiceLayout";
import NewPassword from "./pages/auth/NewPassword";
import DiscoverCourses from "./pages/dashboard/DiscoverCourses";
import AuthLayout from "./layouts/AuthLayout";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Cookie } from "lucide-react";
import Cookies from "js-cookie";
import AuthProtectedRoute from "./Components/AuthProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const [userInfo, setUserInfo] = useState({});

  const routes = createBrowserRouter([
    {
      path: "/preview-course",
      element: <PreviewCourse />,
    },
    {
      path: "/PreviewVideoCourse",
      element: <PreviewVideoCourse />,
    },

    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },

    {
      path: "/",
      element: <ServiceLayout />,
      children: [
        {
          path: "/digital-transformation",
          element: <DigitalTransformation />,
        },
        {
          path: "/data-solution",
          element: <DataSolution />,
        },
        {
          path: "/avenue-impact-development",
          element: <AvenueImpactDevelopment />,
        },
        {
          path: "/components",
          element: <Component />,
        },
      ],
    },
    {
      element: <AuthProtectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          // loader: async () => {
          //   const token = Cookies.get("token");
          //   if (token) return (window.location.href = "/dashboard");
          // },
          children: [
            {
              path: "/AVI",
              element: <AVI />,
            },
            {
              path: "login",
              element: <Login setUserInfo={setUserInfo} userInfo={userInfo} />,
            },
            {
              path: "/signup",
              element: <SignUp />,
            },
            {
              path: "/new-password",
              element: <NewPassword />,
            },
            {
              path: "/forgot-password",
              element: <ForgotPassword />,
            },
          ],
        },
      ],
    },

    {
      path: "/discover-courses",
      element: <DiscoverCourses />,
    },
    {
      element: <ProtectedRoute />,
      // loader: async () => {
      //   const token = Cookies.get("token");
      //   if (!token) return (window.location.href = "/login");
      // },
      children: [
        {
          path: "/dashboard",
          element: <DashboardLayout userInfo={userInfo} />,

          children: [
            {
              index: true,
              element: <EmptyPage />,
            },
            {
              path: "notification",
              element: <Notification />,
            },
            {
              path: "wishlists",
              element: <Wishlist />,
            },
            {
              path: "referral",
              element: <Referral />,
            },
            {
              path: "student-settings",
              element: <StudentSettings />,
            },
            {
              path: "Dashboard_Discover",
              element: <DashboardDiscover />,
            },

            {
              path: "EmptyJoinProjectTeam",
              element: <EmptyJoinProjectTeam />,
            },
            {
              path: "EmptyGetCertificate",
              element: <EmptyGetCertificate />,
            },

            {
              path: "LeaveRating",
              element: <LeaveRating />,
            },
          ],
        },
        {
          element: <OtherLayout />,
          path: "/dashboard",
          children: [
            {
              element: <ShareDocument />,
              path: "/dashboard",
              children: [
                {
                  path: "share-documents",
                  element: <Documents />,
                },
                {
                  path: "assignments",
                  element: <Assignment />,
                },
                {
                  path: "overview",
                  element: <Overview />,
                },
              ],
            },
            {
              path: "certificate",
              element: <GetCertificate />,
            },
            {
              path: "projects",
              element: <JoinProjectTeam />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <RouterProvider router={routes} />;
      </QueryClientProvider>
    </>
  );
}

export default App;
