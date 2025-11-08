/**
 * Layout Styles
 * Layout-related style definitions
 */

import { StyleSheet } from "react-native";
import { spacing } from "../themes";

export const layoutStyles = StyleSheet.create({
  // Padding
  p1: { padding: spacing[1] },
  p2: { padding: spacing[2] },
  p3: { padding: spacing[3] },
  p4: { padding: spacing[4] },
  p5: { padding: spacing[5] },
  p6: { padding: spacing[6] },

  // Padding Horizontal
  px1: { paddingHorizontal: spacing[1] },
  px2: { paddingHorizontal: spacing[2] },
  px3: { paddingHorizontal: spacing[3] },
  px4: { paddingHorizontal: spacing[4] },
  px5: { paddingHorizontal: spacing[5] },
  px6: { paddingHorizontal: spacing[6] },

  // Padding Vertical
  py1: { paddingVertical: spacing[1] },
  py2: { paddingVertical: spacing[2] },
  py3: { paddingVertical: spacing[3] },
  py4: { paddingVertical: spacing[4] },
  py5: { paddingVertical: spacing[5] },
  py6: { paddingVertical: spacing[6] },

  // Margin
  m1: { margin: spacing[1] },
  m2: { margin: spacing[2] },
  m3: { margin: spacing[3] },
  m4: { margin: spacing[4] },
  m5: { margin: spacing[5] },
  m6: { margin: spacing[6] },

  // Margin Horizontal
  mx1: { marginHorizontal: spacing[1] },
  mx2: { marginHorizontal: spacing[2] },
  mx3: { marginHorizontal: spacing[3] },
  mx4: { marginHorizontal: spacing[4] },
  mx5: { marginHorizontal: spacing[5] },
  mx6: { marginHorizontal: spacing[6] },

  // Margin Vertical
  my1: { marginVertical: spacing[1] },
  my2: { marginVertical: spacing[2] },
  my3: { marginVertical: spacing[3] },
  my4: { marginVertical: spacing[4] },
  my5: { marginVertical: spacing[5] },
  my6: { marginVertical: spacing[6] },

  // Flex
  flex1: { flex: 1 },
  flexRow: { flexDirection: "row" },
  flexColumn: { flexDirection: "column" },
  flexWrap: { flexWrap: "wrap" },
  flexNoWrap: { flexWrap: "nowrap" },

  // Alignment
  itemsCenter: { alignItems: "center" },
  itemsStart: { alignItems: "flex-start" },
  itemsEnd: { alignItems: "flex-end" },
  itemsStretch: { alignItems: "stretch" },

  // Justify
  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  justifyEvenly: { justifyContent: "space-evenly" },
});

