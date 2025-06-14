import DetailMainInform from '../DetailMainInform/DetailMainInform';
import CustomScrollWrapper from '../../shared/componets/CustomScrollWrapper/CustomScrollWrapper';
import CarFeatures from '../CarProperty/CarProperty';
import CarReviews from '../CarReviews/CarReviews';

import style from './DetailInform.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { useState } from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';

const DetailInform = ({ db }) => {
  const [activeComponent, setActiveComponent] = useState('features');

  const handleLinkClick = component => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className={style.mainInfoThumb}>
        <h2 className={style.carTitle}>{db.name}</h2>

        <div className={style.carReviewsThumb}>
          <div className={style.carThumb}>
            <svg className={`${style.icon}`}>
              <use xlinkHref={`${sprite}#icon-star`} />
            </svg>
            <p className={style.carReviewsText}>
              {db.rating}({db.reviews.length} Reviews)
            </p>
          </div>
          <div className={style.carThumb}>
            <svg className={`${style.icon} ${style.fillStyle}`}>
              <use xlinkHref={`${sprite}#icon-map`} />
            </svg>
            <p className={style.carLocationText}>{db.location}</p>
          </div>
        </div>

        <p className={style.carPrice}>&#8364;{db.price}.00</p>
      </div>

      <CustomScrollWrapper>
        <div className={style.container}>
          <DetailMainInform data={db} />

          <nav>
            <ul className={style.addInfromList}>
              <li
                className={clsx(style.addInfromItem, {
                  [style.active]: activeComponent === 'features',
                })}
                onClick={() => handleLinkClick('features')}
              >
                Features
              </li>
              <li
                className={clsx(style.addInfromItem, {
                  [style.active]: activeComponent === 'reviews',
                })}
                onClick={() => handleLinkClick('reviews')}
              >
                Reviews
              </li>
            </ul>
          </nav>

          {activeComponent === 'features' && <CarFeatures data={db} />}
          {activeComponent === 'reviews' && <CarReviews data={db} />}
        </div>
      </CustomScrollWrapper>
    </>
  );
};

DetailInform.propTypes = {
  db: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailInform;
