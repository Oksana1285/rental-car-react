import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setFilters } from '@redux/favorite/slice';
import { selectFilters } from '@redux/favorite/selectors';
import MainButton from '../../shared/componets/MainButton/MainButton';
import style from './RentalFilters.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { scrollToElementById } from '../../helpers/scrollToElementById';
import { gsap } from 'gsap';
import clsx from 'clsx';
import { formValuesVehicle } from '../../helpers/constants';

const RentalFilters = () => {
  const homeTitleRef = useRef(null);
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const [checkedItems, setCheckedItems] = useState({});
  const [radioItems, setRadioItems] = useState({});

  useEffect(() => {
    gsap.fromTo(
      homeTitleRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleCheckboxChange = event => {
    const { value } = event.target;
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [value]: !prevCheckedItems[value],
    }));
  };

  const handleRadioChange = event => {
    const { value } = event.target;
    setRadioItems({ [value]: true });
  };

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formValuesVehicle,
    mode: 'onTouched',
  });

  const onSubmit = data => {
    data.location = data.location.trim();

    const selectedDetails = Object.keys(checkedItems).reduce((acc, key) => {
      if (checkedItems[key]) {
        acc[key] = true;
      }
      return acc;
    }, {});

    const appliedFilters = {
      location: data.location,
      details: selectedDetails,
      form: data.form,
    };

    console.log('Applied Filters:', appliedFilters);
    dispatch(setFilters(appliedFilters));
    reset();
    setCheckedItems({});
    setRadioItems({});

    scrollToElementById('camperCars');
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    reset();
    setCheckedItems({});
    setRadioItems({});
  };

  const formatTitle = title => {
    const titles = {
      panelTruck: 'Van',
      fullyIntegrated: 'Fully Integrated',
      alcove: 'Alcove',
      ac: 'AC',
      transmission: 'Automatic',
      kitchen: 'Kitchen',
      tv: 'TV',
      shower: 'Shower',
    };
    return titles[title] || title;
  };

  const cleanInput = () => {
    resetField('location');
  };

  const hasActiveFilters = () => {
    const { location, details, form } = filters;
    return (
      (location && location.trim() !== '') ||
      Object.values(details || {}).some(val => val) ||
      form !== ''
    );
  };

  return (
    <div ref={homeTitleRef} className={style.formThumb}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.locationfield}>
          <label className={style.labelLocation}>Location</label>
          <div className={style.blockInput}>
            <input
              className={`${style.formInput} ${
                errors.location ? style.errorName : ''
              }`}
              type="text"
              name="location"
              placeholder="City"
              {...register('location', {
                pattern: {
                  value: /^[A-Za-z, ]*$/,
                  message: 'Location can only contain English letters',
                },
                validate: value => {
                  if (value && value.trim() === '') {
                    return 'Location cannot be just whitespace';
                  }
                  return true;
                },
              })}
            />
            <svg className={`${style.iconMap} ${style.fillStyle}`}>
              <use xlinkHref={`${sprite}#icon-map`} />
            </svg>

            <svg
              className={`${style.iconClean} ${style.fillStyle}`}
              onClick={cleanInput}
            >
              <use xlinkHref={`${sprite}#icon-close`} />
            </svg>
          </div>
          {errors.location && (
            <span className={style.errorSpan}>{errors.location.message}</span>
          )}
        </div>

        <label className={style.labelFilters}>Filters</label>

        <h2 className={style.formTitle}>Vehicle equipment</h2>

        <ul className={style.equipment}>
          {['ac', 'transmission', 'kitchen', 'tv', 'shower'].map(item => (
            <li key={item}>
              <label
                className={`${style.labelCheck} ${
                  checkedItems[item] ? style.checkedLabelCheck : ''
                }`}
              >
                <input
                  name="details"
                  type="checkbox"
                  value={item}
                  {...register('details')}
                  className={style.hiddenInput}
                  onChange={handleCheckboxChange}
                />
                <svg
                  className={clsx(style.iconEquipment, {
                    [style.strokeStyle]: item === 'ac',
                    [style.fillStyle]: item !== 'ac',
                  })}
                >
                  <use xlinkHref={`${sprite}#icon-${item}`} />
                </svg>

                <h3 className={style.equipmentTitle}>{formatTitle(item)}</h3>
              </label>
            </li>
          ))}
        </ul>

        <h2 className={style.formTitle}>Vehicle type</h2>
        <ul className={style.equipment}>
          {['panelTruck', 'fullyIntegrated', 'alcove'].map(item => (
            <li key={item}>
              <label
                className={`${style.labelRadio} ${
                  radioItems[item] ? style.radioLabelCheck : ''
                }`}
              >
                <input
                  name="form"
                  type="radio"
                  value={item}
                  {...register('form')}
                  className={style.hiddenInput}
                  onChange={handleRadioChange}
                />
                <svg className={`${style.iconType} ${style.strokeStyle}`}>
                  <use xlinkHref={`${sprite}#icon-${item}`} />
                </svg>
                <h3 className={style.equipmentTitle}>{formatTitle(item)}</h3>
              </label>
            </li>
          ))}
        </ul>

        <div className={style.containerBtn}>
          <MainButton
            type="submit"
            title="Search"
            btnType="main"
            className={style.searchBtn}
          />

          {hasActiveFilters() && (
            <MainButton
              type="button"
              title="Reset"
              btnType="load"
              className={style.searchBtn}
              onClick={handleResetFilters}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default RentalFilters;
