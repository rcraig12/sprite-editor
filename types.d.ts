declare interface MenuItem {
  type: 'child' | 'separator' | 'title';
  name?: string;
}

declare interface Menu {
  id: string;
  name: string;
  children: MenuItem[];
}

declare interface MainMenuData {
  menus: Menu[];
}

declare interface WindowOptions {
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  resizable?: boolean;
}

declare type Editors = {
  sprite: object;
  tile: object;
  sound: object;
};

declare type Palette = string[];

declare type Palettes = {
  [key: string]: Palette;
};

declare type PlatformSettings = {
  name: string;
  settings: object;
  palettes?: Palettes;
};

declare type GlobalSettings = {
  version: string;
  selectedPlatform: string;
  selectedEditor: string;
  currentFile: string;
  editors: Editors;
};

declare type ConfigType = {
  global: GlobalSettings;
  platform: PlatformSettings[];
};

declare type canvasOptions = {
  id: string;
  cols: number;
  rows: number;
  zoom: number;
  grid: boolean;
  edit: boolean;
}
