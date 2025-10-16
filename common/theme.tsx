import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { AppColors, AppTheme, COLOR_SCHEME } from "./color";

export const AppThemeContext = createContext<AppTheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const scheme = useColorScheme();
  const theme = scheme === COLOR_SCHEME.LIGHT ? AppColors.light : AppColors.dark;

  return (
    <AppThemeContext.Provider value={theme}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(AppThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};