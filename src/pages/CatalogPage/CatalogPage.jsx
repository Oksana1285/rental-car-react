import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation/Navigation';
import RentalFilters from '../../components/RentalFilters/RentalFilters';
import RentalCars from '../../components/RentalCars/RentalCars';
import ButtonToTopScroll from '../../shared/componets/ButtonToTopScroll/ButtonToTopScroll';
import style from './CatalogPage.module.css';

const CatalogPage = () => {
  return (
    <>
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Navigation />
      <main className={style.container}>
        <div className={style.catalogContainer}>
          <RentalFilters />
          <RentalCars />
          <ButtonToTopScroll />
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
