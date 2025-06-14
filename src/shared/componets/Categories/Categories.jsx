import clsx from 'clsx';
import { icons as sprite } from '../../../shared/icons/index';
import s from './Categories.module.css';

import PropTypes from 'prop-types';

const Categories = ({ title, svg, className }) => {
  return (
    <div className={clsx(s.categories, className && className)}>
      <svg className={s.icon}>
        <use xlinkHref={`${sprite}#icon-${svg}`} />
      </svg>
      <p className={s.name}>{title}</p>
    </div>
  );
};

Categories.propTypes = {
  title: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Categories;
