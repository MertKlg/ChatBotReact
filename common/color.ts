export enum COLOR_SCHEME {
  LIGHT = "light",
  DARK = "dark"
}

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface AppTheme {
  primary: ColorPalette;
  secondary: ColorPalette;
  surface: string;
  textColor: string;
  textColor2: string
  background: string;
  error: string;
}

export interface AppColorScheme {
  light: AppTheme;
  dark: AppTheme;
}

export const AppColors: AppColorScheme = {
  light: {
    primary: {
      50: "#FDFDFD",
      100: "#F8FAFA",
      200: "#F5F8F8",
      300: "#F1F4F4",
      400: "#EEF2F2",
      500: "#EAEFEF",
      600: "#D5D9D9",
      700: "#A6AAAA",
      800: "#818383",
      900: "#626464"
    },
    secondary: {
      50: "#F8FAFA",
      100: "#E9F0F0",
      200: "#DEE9E8",
      300: "#CFDFDE",
      400: "#C6D9D8",
      500: "#B8CFCE",
      600: "#A7BCBB",
      700: "#839392",
      800: "#657271",
      900: "#4D5757"
    },
    surface: "#7F8CAA",
    textColor: "#FFFFFF",
    textColor2: "#000000",
    background: "#333446",
    error: "#DA4F49"
  },
  dark: {
    primary: {
      50: "#FDFDFD",
      100: "#F8FAFA",
      200: "#F5F8F8",
      300: "#F1F4F4",
      400: "#EEF2F2",
      500: "#EAEFEF",
      600: "#D5D9D9",
      700: "#A6AAAA",
      800: "#818383",
      900: "#626464"
    },
    secondary: {
      50: "#F8FAFA",
      100: "#E9F0F0",
      200: "#DEE9E8",
      300: "#CFDFDE",
      400: "#C6D9D8",
      500: "#B8CFCE",
      600: "#A7BCBB",
      700: "#839392",
      800: "#657271",
      900: "#4D5757"
    },
    surface: "#7F8CAA",
    textColor: "#FFFFFF",
    textColor2: "#000000",
    background: "#333446",
    error: "#DA4F49"
  }
};