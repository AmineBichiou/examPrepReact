import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Pages loaded dynamically
const Produits = React.lazy(() => import("./component/produit/Produits"));
const ProduitDetails = React.lazy(() => import("./component/produit/ProduitDetails"));
const AddProduit = React.lazy(() => import("./component/produit/AddProduit"));
const UpdateProduit = React.lazy(() => import("./component/produit/UpdateProduit"));
const NotFound = React.lazy(() => import("./component/produit/NotFound"));

// Router creation
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Produits /> },
      { path: "vehicles", element: <Produits /> },
      { path: "vehicles/:id", element: <ProduitDetails /> },
      { path: "add-vehicle", element: <AddProduit /> },
      { path: "update-vehicle/:id", element: <UpdateProduit /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
