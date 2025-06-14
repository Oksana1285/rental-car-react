import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import style from "./ButtonToTopScroll.module.css";

const ButtonToTopScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${style.scrollToTop} ${
        isVisible ? style.visible : style.hidden
      }`}
      onClick={scrollToTop}
    >
      <div className={style.button}>
        <IoArrowUp className={style.icon} />
      </div>
    </div>
  );
};

export default ButtonToTopScroll;
