export type ToolbarType = 'bubble' | 'static';
export type FontFamily = 'sans' | 'serif' | 'mono';
export type ThemeColor = 'zinc' | 'rose' | 'blue' | 'green' | 'orange';
export type ColorMode = 'light' | 'dark' | 'system';

export interface Settings {
  toolbarType: ToolbarType;
  fontFamily: FontFamily;
  theme: ThemeColor;
  colorMode: ColorMode;
  isSidebarTransparent: boolean;
}