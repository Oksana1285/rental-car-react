import { toggleTheme } from '@redux/theme/themeSlice';
import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
