import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookSchema, formValuesBook } from '../../helpers/constants';
import MainButton from '../../shared/componets/MainButton/MainButton';
import style from './BookForm.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker.css';
import { useDispatch } from 'react-redux';
import { postBooking } from '@redux/booking/operation';

const BookForm = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: formValuesBook,
    resolver: yupResolver(bookSchema),
    mode: 'onTouched',
  });

  const onSubmit = async data => {
    try {
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.comment = data.comment.trim();

      dispatch(postBooking(data));
      reset();
      setSelectedDate(null);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = date ? date.toISOString() : '';
    setValue('date', formattedDate, { shouldValidate: true });
  };

  return (
    <div className={style.formPart}>
      <h2 className={style.formTitle}>Book your campervan now</h2>
      <p className={style.formText}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formBoking}>
          <div>
            <input
              className={`${style.formInput} ${errors.name && style.errorName}`}
              type="text"
              name="name"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name && (
              <span className={style.errorSpan}>{errors.name.message}</span>
            )}
          </div>

          <div>
            <input
              className={`${style.formInput} ${
                errors.email && style.errorName
              }`}
              type="text"
              name="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <span className={style.errorSpan}>{errors.email.message}</span>
            )}
          </div>

          <div>
            <div className={style.fieldThumb}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Booking date"
                className={`${style.formInput} ${
                  errors.date && style.errorDate
                }`}
              />
              <svg className={`${style.iconCalendar}`}>
                <use xlinkHref={`${sprite}#icon-calendar`} />
              </svg>
              {errors.date && (
                <span className={style.errorSpan}>{errors.date.message}</span>
              )}
            </div>
          </div>

          <div>
            <textarea
              className={`${style.formInput} ${style.textarea}`}
              type="textarea"
              name="comment"
              placeholder="Comment"
              {...register('comment')}
            />
            {errors.comment && (
              <span className={style.errorSpan}>{errors.comment.message}</span>
            )}
          </div>
        </div>

        <MainButton
          type="submit"
          title="Send"
          btnType="main"
          className={style.searchBtn}
        />
      </form>
    </div>
  );
};

export default BookForm;
