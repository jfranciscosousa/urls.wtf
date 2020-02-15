const mobile = 600;
const desktop = 1268;

export const mobileOnly = `@media screen and (max-width: ${mobile - 1}px)`;
export const tabletOnly = `@media screen and (min-width: ${mobile}px) and (max-width: ${desktop -
  1}px)`;
export const tabletAndAbove = `@media screen and (min-width: ${mobile}px)`;
export const tabletAndBelow = `@media screen and (max-width: ${mobile - 1}px)`;
export const desktopOnly = `@media screen and (min-width: ${desktop}px)`;
