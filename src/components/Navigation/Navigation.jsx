import { useEffect, useRef, useState } from 'react';
import Hamburger from '../../shared/componets/Hamburger/Hamburger';
import Menu from '../Menu/Menu';

import style from './Navigation.module.css';
import { default as logo } from '../../../assets/clipart1989161.png';
import { NavLink } from 'react-router-dom';
import { useMedia } from '../../hooks/useMedia';
import NavList from '../../shared/componets/NavList/NavList';
import { gsap } from 'gsap';
import ThemeToggle from '../../shared/componets/ThemeToggle/ThemeToggle';

const Navigation = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isDesktop, isTablet } = useMedia();

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [menuOpen, isMobile]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={style.header}>
      {(isDesktop || isTablet) && (
        <nav ref={navRef} className={style.navigation}>
          <NavLink className={style.navLink} to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </NavLink>
          <div className={style.blockNav}>
            <ThemeToggle />
            <NavList />
          </div>
        </nav>
      )}

      {isMobile && (
        <nav className={style.navigation}>
          <NavLink className={style.navLink} to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </NavLink>
          <ThemeToggle />
          <Hamburger active={menuOpen} toggleMenu={toggleMenu} />
          <Menu isOpen={menuOpen} toggleMenu={toggleMenu} />
        </nav>
      )}
    </header>
  );
};

export default Navigation;
