import NavList from '../../shared/componets/NavList/NavList';
import style from './Menu.module.css';

import PropTypes from 'prop-types';

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`${style.backdrop} ${isOpen ? style.open : ''}`}
      onClick={toggleMenu}
    >
      <div className={style.menu} onClick={e => e.stopPropagation()}>
        <NavList />
      </div>
    </div>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Menu;
