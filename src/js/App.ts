import '../css/style.css';
import Storage from './Storage';

import Desktop from './Desktop';
import { mainMenuData } from './MainMenu';
import Navigation from './Navigation';
import ToolWindow from './ToolWindow';
import PaletteWindow from './PaletteWindow';
import TileWindow from './TileWindow';
import CharsetWindow from './CharsetWindow';
import SpriteEditorWindow from './SpriteEditorWindow';
import SpritePreviewWindow from './SpritePreviewWindow';
import SpriteListWindow from './SpriteListWindow';
import SpriteAnimationWindow from './SpriteAnimationWindow';
import TileMapWindow from './TileMapWindow';

class App {
  
  storage: Storage;
  desktop: Desktop;
  navigation: Navigation;
  windows: (Window | ToolWindow | PaletteWindow | TileWindow | CharsetWindow)[];
  dialogs: [];
  messageBoxes: [];
  config: ConfigType;
  
  constructor() {

    this.storage = new Storage();
    this.config = this.storage.getConfig();
    this.desktop = new Desktop(this);
    this.navigation = new Navigation(this);
    this.windows = [];
    this.dialogs = [];
    this.messageBoxes = [];

    this.render();

  }

  addWindow(window: Window | ToolWindow | PaletteWindow | TileWindow | CharsetWindow ) {
    this.windows.push(window);
  }

  // addDialog(dialog: any) {
  //   this.dialogs.push(dialog);
  // }
  // addMessageBox(messageBox: any) {
  //   this.messageBoxes.push(messageBox);
  //   this.windows.forEach(window => window.render());
  //   this.dialogs.forEach(dialog => dialog.render());
  //   this.messageBoxes.forEach(messageBox => messageBox.render());
  // }

  render() {

    this.desktop.render();
    this.navigation.render(mainMenuData);

    if (this.config.global.selectedEditor === "sprite"){

      const toolWindowCoords = this.storage.getWindowCoordinates("toolWindow");
      const paletteWindowCoords = this.storage.getWindowCoordinates("paletteWindow");
      const spriteEditorWindowCoords = this.storage.getWindowCoordinates("spriteEditorWindow");
      const spritePreviewWindowCoords = this.storage.getWindowCoordinates("spritePreviewWindow");
      const spriteListWindowCoords = this.storage.getWindowCoordinates("spriteListWindow");
      const spriteAnimationWindowCoords = this.storage.getWindowCoordinates("spriteAnimationWindow");

      const toolWindow = new ToolWindow({ title: "Tools", ...toolWindowCoords, width: 60, height: 394}, this);
      const paletteWindow = new PaletteWindow({ title: "Palette", ...paletteWindowCoords, width: 80, height: 400}, this);
      const spriteEditor = new SpriteEditorWindow({ title: "Editor", ...spriteEditorWindowCoords, width: 360, height: 380});
      const spritePreview = new SpritePreviewWindow({ title: "Preview", ...spritePreviewWindowCoords, width: 200, height: 200});
      const spriteList = new SpriteListWindow({ title: "Sprite List", ...spriteListWindowCoords, width: 600, height: 300});
      const spriteAnimation = new SpriteAnimationWindow({ title: "Sprite Animation", ...spriteAnimationWindowCoords, width: 600, height: 300});

      this.addWindow(toolWindow);
      toolWindow.render();
      this.addWindow(paletteWindow);
      paletteWindow.render();
      this.addWindow(spriteEditor);
      spriteEditor.render();
      this.addWindow(spriteEditor);
      spritePreview.render();
      this.addWindow(spriteList);
      spriteList.render();
      this.addWindow(spriteAnimation);
      spriteAnimation.render();


    }

    if (this.config.global.selectedEditor === "tile"){

      const toolWindowCoords = this.storage.getWindowCoordinates("toolWindow");
      const paletteWindowCoords = this.storage.getWindowCoordinates("paletteWindow");
      const charsetWindowCoords = this.storage.getWindowCoordinates("charsetWindow");
      const tileWindowCoords = this.storage.getWindowCoordinates("tileWindow");
      const tileMapWindowCoords = this.storage.getWindowCoordinates("tileMapWindow");

      const toolWindow = new ToolWindow({ title: "Tools", ...toolWindowCoords, width: 60, height: 394}, this);
      const paletteWindow = new PaletteWindow({ title: "Palette", ...paletteWindowCoords, width: 80, height: 400}, this);
      const charsetWindow = new CharsetWindow({ title: "Character Set", ...charsetWindowCoords, width: 290, height: 330});
      const tileWindow = new TileWindow({ title: "Tile", ...tileWindowCoords, width: 330, height: 330});
      const tileMapWindow = new TileMapWindow({ title: "Tile Map", ...tileMapWindowCoords, width: 968, height: 632});

      this.addWindow(toolWindow);
      toolWindow.render();
      this.addWindow(paletteWindow);
      paletteWindow.render();
      this.addWindow(charsetWindow);

      this.addWindow(tileWindow);
      tileWindow.render();
      this.addWindow(tileMapWindow);
      tileMapWindow.render();

    }

    if (this.config.global.selectedEditor === "sound"){

    }



    console.log(this);
  }

  handleNavigation(menuItem: any): void {

    console.log(menuItem);

    // Retro Editor Menu

    if ( menuItem === "menubar-sprite-editor"){
      this.config = this.storage.getState();
      this.config.global.selectedEditor = "sprite";
      this.storage.setState(this.config);
      this.windows = [];
      this.render();
    }    

    if ( menuItem === "menubar-tile-editor"){
      this.config = this.storage.getState();
      this.config.global.selectedEditor = "tile";
      this.storage.setState(this.config);
      this.windows = [];
      this.render();
    }    

    if ( menuItem === "menubar-sound-studio"){
      this.config.global.selectedEditor = "sound";
      this.storage.setState(this.config);
      this.windows = [];
      this.render();
    }

    // File Menu


    // Edit Menu


    // Sprite Menu


    // View Menu

    if ( menuItem === "menubar-reset-ui"){
      const editor = this.config.global.selectedEditor;
      this.storage.resetState();
      this.config = this.storage.getConfig();
      this.config.global.selectedEditor = editor;
      this.storage.setState(this.config);
      this.windows = [];
      this.render();
    }

    // Platform Menu

    if ( menuItem === "menubar-commodore-64"){
      this.config.global.selectedPlatform = "Commodore 64";
      this.storage.setState(this.config);
      const selectedPlatform = document.querySelector('#selectedPlatform') as HTMLElement;
      selectedPlatform.innerText = "Commodore 64";
      this.render();
    }

    if ( menuItem === "menubar-commander-x16"){
      this.config.global.selectedPlatform = "Commander X16";
      this.storage.setState(this.config);
      const selectedPlatform = document.querySelector('#selectedPlatform') as HTMLElement;
      selectedPlatform.innerText = "Commander X16";
      this.render();
    }

    // Help Menu



  }

  handleTool(toolItem: string): void {

    this.config.global.selectedTool = toolItem.replace('tool-','');
    this.storage.setState(this.config);
    this.render();

  }

  handlePalette(colour: string): void {

    console.log(colour);

  }

}

document.addEventListener("DOMContentLoaded", function () {

  const application = new App();

});