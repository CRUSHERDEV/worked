/**
 * Style Variables
 * Global style variables and constants
 */

import { Platform } from "react-native";

export const variables = {
  platform: Platform.OS,
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  
  // Screen dimensions (will be set dynamically)
  screenWidth: 0,
  screenHeight: 0,
  
  // Common dimensions
  headerHeight: 60,
  tabBarHeight: 60,
  buttonHeight: 48,
  inputHeight: 48,
  
  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
} as const;

