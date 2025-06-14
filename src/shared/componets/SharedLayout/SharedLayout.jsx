import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "shared/componets/Loader/Loader";

const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
};

export default SharedLayout;
