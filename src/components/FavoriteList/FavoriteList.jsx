import { selectFavoriteCars } from '@redux/favorite/selectors';
import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../shared/componets/MainButton/MainButton';
import style from './FavoriteList.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { Rating } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { addFavorite, deleteFavorite } from '@redux/favorite/slice';
import { useMedia } from '../../hooks/useMedia';
import { gsap } from 'gsap';
import { default as mainPicture } from '../../../assets/clipart1989161.png';
import { NavLink } from 'react-router-dom';
import { useModalContext } from '../../context/useModalContext';
import DetailInform from '../DetailInform/DetailInform';

const FavoriteList = () => {
  const dispatch = useDispatch();
  const myFavoriteList = useSelector(selectFavoriteCars);
  const [visibleFavoriteCar, setVisibleFavoriteCar] = useState(4);
  const { isMobile, isTablet } = useMedia();
  const listRef = useRef(null);
  const { openModal } = useModalContext();

  useEffect(() => {
    if (listRef.current && listRef.current.children.length > 0) {
      const listItems = listRef.current.children;
      gsap.fromTo(
        listItems,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.15)' }
      );
    }
  }, [myFavoriteList]);

  const handleShowMore = car => {
    openModal(<DetailInform db={car} />);
  };

  const handleClick = car => {
    if (myFavoriteList.some(item => item._id === car._id)) {
      animateRemoval(car._id);
    } else {
      dispatch(addFavorite(car));
    }
  };

  const handleLoadMore = () => {
    setVisibleFavoriteCar(prev => prev + 4);
  };

  const animateRemoval = carId => {
    const listItem = listRef.current.querySelector(`[data-id="${carId}"]`);
    gsap.to(listItem, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      onComplete: () => {
        dispatch(deleteFavorite(carId));
      },
    });
  };

  return (
    <>
      {myFavoriteList.length > 0 ? (
        <div className={style.favorite}>
          <ul className={style.favoriteList} ref={listRef}>
            {myFavoriteList
              .slice(
                0,
                isMobile || isTablet
                  ? visibleFavoriteCar
                  : myFavoriteList.length
              )
              .map(car => (
                <li key={car._id} data-id={car._id}>
                  <div className={style.favoriteItem}>
                    <svg
                      className={`${style.iconHeart} ${
                        myFavoriteList.some(item => item._id === car._id)
                          ? style.active
                          : ''
                      }`}
                      onClick={() => handleClick(car)}
                    >
                      <use xlinkHref={`${sprite}#icon-favorite`} />
                    </svg>

                    <div className={style.favoriteImgContainer}>
                      <img
                        className={style.favoriteImg}
                        src={car.gallery[0]}
                        alt={car.name}
                        width="300"
                        height="200"
                        loading="lazy"
                      />
                    </div>

                    <div className={style.favoriteMainInfo}>
                      <h2 className={style.favoriteTitle}>{car.name}</h2>
                      <p className={style.favoritePrice}>&#8364;{car.price}</p>

                      <Rating
                        name="half-rating-read"
                        defaultValue={car.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <MainButton
                      title="Show more"
                      btnType="main"
                      onClick={() => handleShowMore(car)}
                    />
                  </div>
                </li>
              ))}
          </ul>

          {(isMobile || isTablet) &&
            visibleFavoriteCar < myFavoriteList.length && (
              <MainButton
                title="Load More"
                btnType="load"
                className={style.loadMore}
                onClick={handleLoadMore}
              />
            )}
        </div>
      ) : (
        <div ref={listRef} className={style.emptyPage}>
          <h2 className={style.emptyTitle}>
            Your collection of favorite camper vans is empty. Add a few models
            to start your journey!
          </h2>
          <img
            className={style.mainPicture}
            src={mainPicture}
            alt="logo"
            width="300"
            height="200"
            loading="lazy"
          />
          <NavLink className={style.navLink} to="/catalog">
            <MainButton title="Return to the catalog" btnType="main" />
          </NavLink>
        </div>
      )}
    </>
  );
};

export default FavoriteList;
