import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import OcaiPage from "./ocai/page";
import AppLayout from "./AppLayout";
import HomePage from "./page";
import BIPPage from "./bip/page";
import OcaiResultsPage from "./ocai/OcaiResultsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/ocai",
        element: <OcaiPage />,
    },
    {
        path: "/results-icai",
        element: <OcaiResultsPage />,
    },
    {
        path: "/bip",
        element: <BIPPage />,
    },
    
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppLayout>
            <RouterProvider router={router} />
        </AppLayout>
    </React.StrictMode>
);
