export interface MenuItem {
  type: 'child' | 'separator' | 'title';
  name?: string;
}

export interface Menu {
  id: string;
  name: string;
  children: MenuItem[];
}

export interface MainMenuData {
  menus: Menu[];
}

