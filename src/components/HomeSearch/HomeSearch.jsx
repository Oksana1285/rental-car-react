import { useEffect, useState, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { icons as sprite } from '../../shared/icons/index';
import style from './HomeSearch.module.css';
import { gsap } from 'gsap';

const HomeSearch = () => {
  const [localTime, setLocalTime] = useState('');
  const [formattedTomorrow, setFormattedTomorrow] = useState('');

  const today = new Date();
  const homeSearchRef = useRef(null);

  useEffect(() => {
    const checkTime = date => {
      const hours = date.getHours();

      if (hours > 9) {
        const tomorrow = addDays(today, 1);

        setLocalTime(
          format(tomorrow, 'EEE dd MMM, 09:00', {
            locale: enUS,
          })
        );

        const dayAfterTomorrow = addDays(tomorrow, 1);
        setFormattedTomorrow(
          format(dayAfterTomorrow, 'EEE dd MMM, 11:00', {
            locale: enUS,
          })
        );
      } else {
        setLocalTime(format(today, 'EEE dd MMM, 09:00', { locale: enUS }));

        const tomorrow = addDays(today, 1);

        setFormattedTomorrow(
          format(tomorrow, 'EEE dd MMM, 11:00', {
            locale: enUS,
          })
        );
      }
    };

    checkTime(today);

    gsap.fromTo(
      homeSearchRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  });

  return (
    <div className={style.homeSearch} ref={homeSearchRef}>
      <ul className={style.homeSearchList}>
        <li className={style.homeSearchItems}>
          <svg className={style.iconHome}>
            <use xlinkHref={`${sprite}#icon-map`} />
          </svg>
          <div>
            <h2 className={style.homeSearchTitle}>Location</h2>
            <p className={style.homeSearchText}>Search your location</p>
          </div>
        </li>

        <li className={`${style.homeSearchItems} ${style.borderLine}`}>
          <svg className={style.iconHome}>
            <use xlinkHref={`${sprite}#icon-calendar`} />
          </svg>
          <div>
            <h2 className={style.homeSearchTitle}>Pickup date</h2>
            <p className={style.homeSearchText}>{localTime}</p>
          </div>
        </li>

        <li className={style.homeSearchItems}>
          <svg className={style.iconHome}>
            <use xlinkHref={`${sprite}#icon-calendar`} />
          </svg>
          <div>
            <h2 className={style.homeSearchTitle}>Return date</h2>
            <p className={style.homeSearchText}>{formattedTomorrow}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HomeSearch;
