export const FONTS = [
  { name: "Space Grotesk", class: "font-space-grotesk" },
  { name: "Inter", class: "font-inter" },
  { name: "Roboto", class: "font-roboto" },
  { name: "Roboto Condensed", class: "font-roboto-condensed" },
  { name: "Montserrat", class: "font-montserrat" },
  { name: "Source Code Pro", class: "font-source-code" },
  { name: "Bungee Tint", class: "font-bungee-tint" },
  { name: "Winky Sans", class: "font-winky-sans" },
  { name: "Boldonse", class: "font-boldonse" },
  { name: "Momo Trust", class: "font-mono-trust-display"},
  { name: "Bitcount", class: "font-bitcount-grid-single"}
] as const;

export type FontKey = typeof FONTS[number]["class"];