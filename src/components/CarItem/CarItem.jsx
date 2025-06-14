import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '@redux/favorite/slice';
import { selectFavoriteCars } from '@redux/favorite/selectors';
import { capitalizeFirstLetter } from '../../helpers/constants';
import style from './CarItem.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { useModalContext } from '../../context/useModalContext';
import DetailInform from '../DetailInform/DetailInform';
import MainButton from '../../shared/componets/MainButton/MainButton';
import Categories from '../../shared/componets/Categories/Categories';

import PropTypes from 'prop-types';

const CarItem = ({ data }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteCars);
  const [isActive, setIsActive] = useState(false);
  const { openModal } = useModalContext();

  useEffect(() => {
    setIsActive(favoriteItems.some(item => item._id === data._id));
  }, [favoriteItems, data._id]);

  const handleClick = () => {
    if (isActive) {
      dispatch(deleteFavorite(data._id));
    } else {
      dispatch(addFavorite(data));
    }
    setIsActive(!isActive);
  };

  const categoriesData = [
    {
      title: `${data.adults} adults`,
      svg: 'users',
      className: style.strokeStyle,
    },
    {
      title: `${capitalizeFirstLetter(data.details.transmission)}`,
      svg: 'transmission',
      className: style.fillStyle,
    },
    {
      title: `${capitalizeFirstLetter(data.engine)}`,
      svg: 'petrol',
      className: style.strokeStyle,
    },
    {
      title: 'Kitchen',
      svg: 'kitchen',
      className: style.fillStyle,
      condition: data.details.kitchen > 0,
    },
    {
      title: `${data.details.beds} beds`,
      svg: 'bed',
      className: style.fillStyle,
      condition: data.details.beds > 0,
    },
    {
      title: 'AC',
      svg: 'ac',
      className: style.strokeStyle,
      condition: data.details.airConditioner > 0,
    },
  ];

  return (
    <div className={style.cardCar}>
      <img
        className={style.cardImg}
        src={data.gallery[0]}
        alt={data.name}
        width="300"
        height="200"
        loading={'lazy'}
      />

      <div>
        <div className={style.carInfoThumb}>
          <div className={style.carInfo}>
            <h2 className={style.carTitle}>{data.name}</h2>
            <p className={style.carPrice}>&#8364;{data.price}.00</p>
          </div>
          <svg
            className={`${style.iconHeart} ${isActive ? style.active : ''}`}
            onClick={handleClick}
          >
            <use xlinkHref={`${sprite}#icon-favorite`} />
          </svg>
        </div>

        <div className={style.carReviewsThumb}>
          <div className={style.carThumb}>
            <svg className={`${style.icon}`}>
              <use xlinkHref={`${sprite}#icon-star`} />
            </svg>
            <p className={style.carReviewsText}>
              {data.rating}({data.reviews.length} Reviews)
            </p>
          </div>
          <div className={style.carThumb}>
            <svg className={`${style.icon} ${style.fillStyle}`}>
              <use xlinkHref={`${sprite}#icon-map`} />
            </svg>
            <p className={style.carLocationText}>{data.location}</p>
          </div>
        </div>

        <p className={style.textDescription}>{data.description}</p>

        <ul className={style.categoriesList}>
          {categoriesData.map(
            (category, index) =>
              (category.condition === undefined || category.condition) && (
                <li key={index}>
                  <Categories
                    title={category.title}
                    svg={category.svg}
                    className={category.className}
                  />
                </li>
              )
          )}
        </ul>
        <MainButton
          title="Show more"
          btnType="main"
          className={style.carBtn}
          onClick={() => openModal(<DetailInform db={data} />)}
        />
      </div>
    </div>
  );
};

CarItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    adults: PropTypes.number.isRequired,
    details: PropTypes.shape({
      transmission: PropTypes.string,
      engine: PropTypes.string,
      kitchen: PropTypes.number,
      beds: PropTypes.number,
      airConditioner: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default CarItem;
