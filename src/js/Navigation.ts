import { MainMenuData } from "./Types";

export default class Navigation {

  constructor() {}

  addMenuRoot(): void {
    const template = `
      <nav id="nav">
        <ul id="MainMenuItems"></ul>
      </nav>
    `;

    const html = document.querySelector('#Menu');
    html.innerHTML = template;
  }

  addTopLevelMenu(menu: string, name: string): void {
    const ul_template = `
      <li id="${menu}" class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">${name}</a>
      </li>
    `;

    const ulHTML = document.querySelector(`#MainMenuItems`);
    ulHTML.insertAdjacentHTML('beforeend', ul_template);
  }

  addChildLevelMenu(menu: string, parent: string, name: string): void {
    const divHTML = document.querySelector(`#${parent} .dropdown-content`);

    const linkTemplate = `
      <a id="menubar-${name.toLowerCase().replace(' ', '-').replace('...', '')}">${name}</a>
    `;

    const divLinkTemplate = `
    <div class="dropdown-content">
      ${linkTemplate}
    </div>
    `;

    if (divHTML) {
      divHTML.insertAdjacentHTML('beforeend', linkTemplate);
    } else {
      const liHTM = document.querySelector(`#${parent}`);
      liHTM.insertAdjacentHTML('beforeend', divLinkTemplate);
    }
  }

  addSeparator(menu: string, parent: string): void {
    const divHTML = document.querySelector(`#${parent} .dropdown-content`);

    const hrTemplate = `<hr>`;

    const divLinkTemplate = `
    <div class="dropdown-content">
      ${hrTemplate}
    </div>
    `;

    if (divHTML) {
      divHTML.insertAdjacentHTML('beforeend', hrTemplate);
    } else {
      const liHTM = document.querySelector(`#${parent}`);
      liHTM.insertAdjacentHTML('beforeend', divLinkTemplate);
    }
  }

  addTitle(menu: string, parent: string, title: string): void {

    const divHTML = document.querySelector(`#${parent} .dropdown-content`);

    const spanTemplate = `
      <span class="label">${title}</span>
    `;

    const divSpanTemplate = `
    <div class="dropdown-content">
      ${spanTemplate}
    </div>
    `;

    if (divHTML) {

      divHTML.insertAdjacentHTML('beforeend', spanTemplate);

    } else {

      const liHTM = document.querySelector(`#${parent}`);
      liHTM.insertAdjacentHTML('beforeend', divSpanTemplate);

    }

  }

  buildMenu(menuJson: MainMenuData): void {

    this.addMenuRoot();
    menuJson.menus.forEach((menu: { id: string; name: string; children: any[]; }) => {
      this.addTopLevelMenu(menu.id, menu.name);
      menu.children.forEach(child => {
        if (child.type === 'child') {
          this.addChildLevelMenu('Menu', menu.id, child.name);
        } else if (child.type === 'separator') {
          this.addSeparator('Menu', menu.id);
        } else if (child.type === 'title') {
          this.addTitle('Menu', menu.id, child.name);
        }
      });
    });
  }
}