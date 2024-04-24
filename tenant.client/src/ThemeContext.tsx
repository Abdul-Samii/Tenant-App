import React, { createContext, useState, useEffect } from 'react';
import theme1Styles from './themes/theme1.module.scss';
import theme2Styles from './themes/theme2.module.scss';

interface ThemeContextProps {
  theme: {app: any};
  setTheme: (theme: any) => void;
}

interface ThemeI {
  app: string
}

//will handle the domains in next branch
const domainToThemeMap: any = {
  'foo.com': theme1Styles,
  'localhost': theme2Styles,
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<ThemeI>({ app: '' });

  useEffect(() => {
    const domainName = window.location.hostname;
    const ctheme = domainToThemeMap[domainName];
    console.log('domain - ', ctheme.app)
    setTheme(ctheme || 'defaultTheme');
  }, []);

  console.log("HERE - ", theme)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
