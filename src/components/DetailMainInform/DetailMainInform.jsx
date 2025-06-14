import style from './DetailMainInform.module.css';

import PropTypes from 'prop-types';

const DetailMainInform = ({ data }) => {
  return (
    <div className={style.blockWrap}>
      <ul className={style.listImages}>
        {data.gallery.map((img, index) => (
          <li key={index}>
            <img
              className={style.cardImg}
              src={img}
              alt={data.name}
              width="300"
              height="200"
              loading="lazy"
            />
          </li>
        ))}
      </ul>

      <p className={style.textDescription}>{data.description}</p>
    </div>
  );
};

DetailMainInform.propTypes = {
  data: PropTypes.shape({
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailMainInform;
