export const mainMenuData: MainMenuData = {
  menus: [
    {
      id: "MainMenuSpriteEditor",
      name: "Retro Editor",
      children: [
        { type: "child", name: "Sprite Editor" },
        { type: "child", name: "Tile Editor" },
        { type: "child", name: "Sound Studio" },
        { type: "separator" },
        { type: "child", name: "Settings" },
        { type: "child", name: "About" },
      ]
    },
    {
      id: "MainMenuFile",
      name: "File",
      children: [
        { type: "child", name: "New File" },
        { type: "child", name: "Load File..." },
        { type: "child", name: "Save File..." }
      ]
    },
    {
      id: "MainMenuEdit",
      name: "Edit",
      children: [
        { type: "child", name: "Undo" },
        { type: "child", name: "Redo" },
        { type: "separator" },
        { type: "child", name: "New" },
        { type: "child", name: "Copy" },
        { type: "child", name: "Paste" },
        { type: "child", name: "Duplicate" },
        { type: "separator" },
        { type: "child", name: "Delete" }
      ]
    },
    {
      id: "MainMenuSprite",
      name: "Sprite",
      children: [
        { type: "child", name: "Toggle Colour Mode" },
        { type: "separator" },
        { type: "child", name: "Shift Left" },
        { type: "child", name: "Shift Right" },
        { type: "child", name: "Shift Up" },
        { type: "child", name: "Shift Down" },
        { type: "separator" },
        { type: "child", name: "Flip Horizontal" },
        { type: "child", name: "Flip Verticle" },
        { type: "separator" },
        { type: "child", name: "Double Width" },
        { type: "child", name: "Double Height" },
        { type: "separator" },
        { type: "child", name: "Invert" },
        { type: "child", name: "Toggle Overlay" }
      ]
    },
    {
      id: "MainMenuView",
      name: "View",
      children: [
        { type: "child", name: "Toggle Fullscreen" },
        { type: "child", name: "Reset UI" },
        { type: "separator" },
        { type: "title", name: "Editor Window" },
        { type: "child", name: "Toggle Grid" },
        { type: "child", name: "Zoom In" },
        { type: "child", name: "Zoom Out" },
        { type: "separator" },
        { type: "title", name: "Preview Window" },
        { type: "child", name: "Zoom In" },
        { type: "child", name: "Zoom Out" },
        { type: "separator" },
        { type: "title", name: "Sprite List Window" },
        { type: "child", name: "Toggle Sprite Borders" },
        { type: "child", name: "Zoom In" },
        { type: "child", name: "Zoom Out" }
      ]
    },
    {
      id: "MainMenuPlatform",
      name: "Platform",
      children: [
        { type: "child", name: "Commodore 64" },
        { type: "child", name: "Commander X16" }
      ]
    },
    {
      id: "MainMenuHelp",
      name: "Help",
      children: [
        { type: "child", name: "Help" }
      ]
    }
  ]
};
