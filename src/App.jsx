import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import SharedLayout from './shared/componets/SharedLayout/SharedLayout';
import { useModalContext } from './context/useModalContext';
import ModalWindow from './shared/componets/ModalWindow/ModalWindow';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const FavoritePage = lazy(() => import('./pages/CarPage/CarPage'));

AOS.init();

const App = () => {
  const { isOpen, modalContent } = useModalContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/favorite" element={<FavoritePage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      <ModalWindow isOpen={isOpen}>{modalContent}</ModalWindow>
    </>
  );
};

export default App;
