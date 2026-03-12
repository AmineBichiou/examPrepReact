import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../component/Navbar.jsx";

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default RootLayout;
