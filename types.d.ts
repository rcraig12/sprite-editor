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
  zindex: number;
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
  selectedColour: string;
  selectedSprite: string;
  selectedAnimation: string;
  selectedMap: string;
  selectedTile: string;
  currentFile: string;
  selectedTool: string;
  editors: Editors;
};

// Define the structure for each userdata type
declare type SpriteData = {
  id: string;
  name: string;
  pixels: string[]; // Example: array of pixel colors or values
  width: number;
  height: number;
}

declare type TileData = {
  id: string;
  name: string;
  pattern: string[]; // Example: array representing tile pattern
}

declare type MapData = {
  id: string;
  name: string;
  layout: string[][]; // Example: 2D array representing the map layout
}

declare type AnimationData = {
  id: string;
  name: string;
  frames: SpriteData[]; // Array of sprites used in the animation
}

// Define the structure for userdata
declare type UserData = {
  sprites: SpriteData[];
  tiles: TileData[];
  maps: MapData[];
  animations: AnimationData[];
}

declare type ConfigType = {
  global: GlobalSettings;
  platform: PlatformSettings[];
  userdata: UserData;
};

declare type canvasOptions = {
  id: string;
  cols: number;
  rows: number;
  zoom: number;
  grid: boolean;
  edit: boolean;
}



