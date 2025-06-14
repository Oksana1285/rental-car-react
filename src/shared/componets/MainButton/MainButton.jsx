import clsx from "clsx";
import s from "./MainButton.module.css";

import PropTypes from "prop-types";

const MainButton = ({
  type = "button",
  title,
  btnType = "main",
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        s.buttonBase,
        {
          [s.buttonMain]: btnType === "main",
          [s.buttonLoad]: btnType === "load",
        },
        className && className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

MainButton.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  btnType: PropTypes.oneOf(["main", "load"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default MainButton;
