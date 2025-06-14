import { useTheme } from "context/useThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id="themeToggle"
        className={styles.checkbox}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="themeToggle" className={styles.label}>
        <span className={styles.inner} />
        <span className={styles.switch} />
      </label>
    </div>
  );
};

export default ThemeToggle;
