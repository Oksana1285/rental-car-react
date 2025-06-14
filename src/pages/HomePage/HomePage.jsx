import HomeTitle from '../../components/HomeTitle/HomeTitle';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <section>
      <Helmet>
        <title>{'RentalCar'}</title>
      </Helmet>

      <HomeTitle />
    </section>
  );
};

export default HomePage;
