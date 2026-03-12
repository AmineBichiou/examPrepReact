import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Pages loaded dynamically
const Produits = React.lazy(() => import("./component/produit/Produits"));
const ProduitDetails = React.lazy(() => import("./component/produit/ProduitDetails"));
const AddProduit = React.lazy(() => import("./component/produit/AddProduit"));
const UpdateProduit = React.lazy(() => import("./component/produit/UpdateProduit"));
const NotFound = React.lazy(() => import("./component/produit/NotFound"));
const App = React.lazy(() => import("./App"));

// Router creation
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "produits", element: <Produits /> },
      { path: "produits/:id", element: <ProduitDetails /> },
      { path: "add-produit", element: <AddProduit /> },
      { path: "update-produit/:id", element: <UpdateProduit /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
