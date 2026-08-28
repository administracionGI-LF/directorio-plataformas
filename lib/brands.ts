import type { Brand } from "./types";

export interface BrandMeta {
  key: Brand;
  label: string;
  shortLabel: string;
  tagline: string;
  color: string;
  subColor: string;
  gradient: string;
  tagBg: string;
  tagColor: string;
  panelBg: string;
  panelBorder: string;
  cardBorder: string;
}

export const BRAND_ORDER: Brand[] = ["lungfung", "golden"];

export const BRAND_META: Record<Brand, BrandMeta> = {
  lungfung: {
    key: "lungfung",
    label: "Chifa Lung Fung",
    shortLabel: "Lung Fung",
    tagline: "Restaurante · gestión financiera y operativa",
    color: "#a3132f",
    subColor: "#c9203f",
    gradient: "linear-gradient(135deg,#7a0f24,#a3132f)",
    tagBg: "#fbe4e6",
    tagColor: "#a3132f",
    panelBg: "linear-gradient(160deg,#fdeceb,#fbe3e1)",
    panelBorder: "#f2cfcc",
    cardBorder: "#f2d9d6",
  },
  golden: {
    key: "golden",
    label: "Golden Palace",
    shortLabel: "Golden Palace",
    tagline: "Casino · gestión financiera y operativa",
    color: "#14509c",
    subColor: "#a97728",
    gradient: "linear-gradient(135deg,#0e3f7c,#14509c)",
    tagBg: "#e4e9f4",
    tagColor: "#14509c",
    panelBg: "linear-gradient(160deg,#eef3fb,#fbf3e0)",
    panelBorder: "#dfe6f3",
    cardBorder: "#e3e9f5",
  },
};
