import style from './CarReviews.module.css';

import BookForm from '../BookForm/BookForm';
import Reviews from '../Reviews/Reviews';

import PropTypes from 'prop-types';

const CarReviews = ({ data }) => {
  return (
    <div className={style.container}>
      <Reviews db={data} />
      <BookForm />
    </div>
  );
};

CarReviews.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CarReviews;
