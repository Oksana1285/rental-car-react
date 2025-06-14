import CustomScrollWrapper from '../../shared/componets/CustomScrollWrapper/CustomScrollWrapper';
import style from './Reviews.module.css';
import { Rating } from '@mui/material';
import { useMedia } from '../../hooks/useMedia';

import PropTypes from 'prop-types';

const Reviews = ({ db }) => {
  const { isDesktop } = useMedia();

  const content = (
    <ul className={style.reviewsList}>
      {db.reviews.map((review, index) => (
        <li className={style.reviewItem} key={index}>
          <div className={style.nameBlock}>
            <div className={style.nameFirstLetter}>
              {review.reviewer_name[0]}
            </div>
            <div className={style.nameAndRating}>
              <h3 className={style.name}>{review.reviewer_name}</h3>
              <Rating
                name="half-rating-read"
                defaultValue={review.reviewer_rating}
                precision={0.5}
                readOnly
              />
            </div>
          </div>
          <p className={style.review}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );

  return isDesktop ? (
    <CustomScrollWrapper>
      <div className={style.thumb}>{content}</div>
    </CustomScrollWrapper>
  ) : (
    content
  );
};

Reviews.propTypes = {
  db: PropTypes.shape({
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string.isRequired,
        reviewer_rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Reviews;
