import Navigation from "./Navigation"
import { mainMenuData } from './MainMenu';

import CharsetWindow from "./CharsetWindow";

export default class Desktop {

  navigation: Navigation;
  charsetWindow: CharsetWindow;
  
  constructor() {

    this.navigation = new Navigation();
    this.charsetWindow = new CharsetWindow({ title: "Character Set", top: 100, left: 1200, width: 330, height: 330})
  
  }

  init(): void {

    this.desktop();
    this.navigation.buildMenu(mainMenuData);
    this.charsetWindow.showWindow();

  }

  desktop(): void {

    const template = `
      <div id="App">
        <div id="Menu"></div>
        <div id="Desktop">
          <div id="Outer">
            <div id="GUI"></div>
          </div>
        </div>
        <div id="Status">Welcome to Retro Editor ©2024</div>
      </div>
    `;

    const html = document.querySelector('body') as HTMLElement;
    html.innerHTML = template;

  }

  toggle_fullscreen(): void {
    if (
      !document.fullscreenElement && // alternative standard method
      !(<any>document).mozFullScreenElement &&
      !(<any>document).webkitFullscreenElement &&
      !(<any>document).msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((<any>document.documentElement).msRequestFullscreen) {
        (<any>document.documentElement).msRequestFullscreen();
      } else if ((<any>document.documentElement).mozRequestFullScreen) {
        (<any>document.documentElement).mozRequestFullScreen();
      } else if ((<any>document.documentElement).webkitRequestFullscreen) {
        (<any>document.documentElement).webkitRequestFullscreen(
          (<any>Element).ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((<any>document).msExitFullscreen) {
        (<any>document).msExitFullscreen();
      } else if ((<any>document).mozCancelFullScreen) {
        (<any>document).mozCancelFullScreen();
      } else if ((<any>document).webkitExitFullscreen) {
        (<any>document).webkitExitFullscreen();
      }
    }
  }

}