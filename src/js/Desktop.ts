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
        <div id="Desktop">
          <div id="Outer">
            <div id="GUI"></div>
          </div>
        </div>
        <div id="Status">This is a test</div>
      </div>
    `;

    const html = document.querySelector('body') as HTMLElement;
    html.innerHTML = template;

  }


}