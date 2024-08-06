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
      const toolWindow = new ToolWindow({ title: "Tools", top: 10, left: 10, width: 60, height: 394}, this);
      const paletteWindow = new PaletteWindow({ title: "Palette", top: 10, left: 120, width: 80, height: 400}, this);
      const spriteEditor = new SpriteEditorWindow({ title: "Editor", top: 10, left: 230, width: 360, height: 380});
      const spritePreview = new SpritePreviewWindow({ title: "Preview", top: 444, left: 10, width: 200, height: 200});
      const spriteList = new SpriteListWindow({ title: "Sprite List", top: 10, left: 640, width: 600, height: 300});
      const spriteAnimation = new SpriteAnimationWindow({ title: "Sprite Animation", top: 320, left: 640, width: 600, height: 300});

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

      const toolWindow = new ToolWindow({ title: "Tools", top: 10, left: 10, width: 60, height: 394}, this);
      const paletteWindow = new PaletteWindow({ title: "Palette", top: 10, left: 120, width: 80, height: 400}, this);
      const charsetWindow = new CharsetWindow({ title: "Character Set", top: 10, left: 1210, width: 290, height: 330});
      const tileWindow = new TileWindow({ title: "Tile", top: 350, left: 1210, width: 330, height: 330});
      const tileMapWindow = new TileMapWindow({ title: "Tile Map", top: 10, left: 230, width: 968, height: 632});

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
      this.config.global.selectedEditor = "sprite";
      this.storage.setState(this.config);
      this.windows = [];
      this.render();
    }    

    if ( menuItem === "menubar-tile-editor"){
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

    console.log(toolItem);

  }

  handlePalette(colour: string): void {

    console.log(colour);

  }

}

document.addEventListener("DOMContentLoaded", function () {

  const application = new App();

});