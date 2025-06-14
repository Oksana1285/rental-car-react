import BookForm from '../BookForm/BookForm';
import Features from '../Features/Features';

import style from './CarProperty.module.css';

import PropTypes from 'prop-types';

const CarFeatures = ({ data }) => {
  return (
    <div className={style.container}>
      <Features db={data} />
      <BookForm />
    </div>
  );
};

CarFeatures.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CarFeatures;
