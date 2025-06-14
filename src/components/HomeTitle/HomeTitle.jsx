import { useEffect, useRef } from 'react';
import MainButton from '../../shared/componets/MainButton/MainButton';
import style from './HomeTitle.module.css';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

const HomeTitle = () => {
  const homeTitleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      homeTitleRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className={style.homeTitle} ref={homeTitleRef}>
      <div className={style.homeTitleBlock}>
        <h1 className={style.homeMainTitle}>Find your perfect rental car</h1>

        <p className={style.homeMainText}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <div className={style.homeBtn}>
          <NavLink to="/catalog">
            <MainButton
              title="View Catalog"
              btnType="main"
              className={style.textBtn}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomeTitle;
