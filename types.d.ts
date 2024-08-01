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

