import Navigation from "./Navigation"
import { mainMenuData } from './MainMenu';

export default class Desktop {

  navigation: Navigation;
  
  constructor() {

    this.navigation = new Navigation();
  
  }

  render(): void {

    this.desktop();
    this.navigation.buildMenu(mainMenuData);

  }

  desktop(): void {

    const template = `
      <div id="App">
        <div id="Menu"></div>
        <div id="Desktop"></div>
        <div id="Status"></div>
      </div>
    `;

    const html = document.querySelector('body');
    html.innerHTML = template;

  }


}