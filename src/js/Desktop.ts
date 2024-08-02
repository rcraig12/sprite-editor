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


}