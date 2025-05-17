import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./Layout.tsx";


const Home = lazy(() => import("../pages/HomePage.tsx"));
const Car = lazy(() => import("../pages/CarsPage.tsx"));
const CarDetails = lazy(() => import("../pages/CarDetailsPage.tsx"));

function App() {
  return (
    <>
      <Suspense >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Car />} />
            <Route path="/catalog/:carId" element={<CarDetails />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
