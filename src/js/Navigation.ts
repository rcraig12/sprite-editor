export default class Navigation {

  app: any;

  constructor(app: any) {

    this.app = app;

  }

  addMenuRoot(): void {

    const template = `
    <div class="menuleft">
      <nav id="nav">
        <ul id="MainMenuItems"></ul>
        
      </nav>
    </div>
    <div class="menuright">
      <span class="infolabel">File:</span>
      <span id="currentFile" class="infovalue">${this.app.config.global.currentFile === "" ? "unsaved" : this.app.config.global.currentFile}</span>
      <span class="infolabel">Platform:</span>
      <span id="selectedPlatform" class="infovalue">${this.app.config.global.selectedPlatform}</span>
    </div>
    `;

    const html = document.querySelector('#Menu') as HTMLElement;
    html.innerHTML = template;

  }

  addTopLevelMenu(menu: string, name: string): void {
    const ul_template = `
      <li id="${menu}" class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">${name}</a>
      </li>
    `;

    const ulHTML = document.querySelector(`#MainMenuItems`) as HTMLElement;
    ulHTML.insertAdjacentHTML('beforeend', ul_template);
  }

  addChildLevelMenu(menu: string, parent: string, name: string): void {

    const divHTML = document.querySelector(`#${parent} .dropdown-content`) as HTMLElement;
    let menuId = 'menubar-' + name.split(' ').join('-').toLowerCase().replace('...', '');

    const linkTemplate = `
      <a data-menu="${menuId}" id="${menuId}">${name}</a>
    `;

    const divLinkTemplate = `
      <div class="dropdown-content">
        ${linkTemplate}
      </div>
    `;

    if (divHTML) {
      divHTML.insertAdjacentHTML('beforeend', linkTemplate);
    } else {
      const liHTM = document.querySelector(`#${parent}`) as HTMLElement;
      liHTM.insertAdjacentHTML('beforeend', divLinkTemplate);
    }

    //console.log(menuId);
    //let menuItem = document.querySelector(`#${menuId}`) as HTMLElement;

    //menuItem.addEventListener('click', () => this.app.handleNavigation(menuItem.id));

  }

  addSeparator(menu: string, parent: string): void {
    const divHTML = document.querySelector(`#${parent} .dropdown-content`) as HTMLElement;

    const hrTemplate = `<hr>`;

    const divLinkTemplate = `
      <div class="dropdown-content">
        ${hrTemplate}
      </div>
    `;

    if (divHTML) {
      divHTML.insertAdjacentHTML('beforeend', hrTemplate);
    } else {
      const liHTM = document.querySelector(`#${parent}`) as HTMLElement;
      liHTM.insertAdjacentHTML('beforeend', divLinkTemplate);
    }
  }

  addTitle(menu: string, parent: string, title: string): void {

    const divHTML = document.querySelector(`#${parent} .dropdown-content`) as HTMLElement;

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

      const liHTM = document.querySelector(`#${parent}`) as HTMLElement;
      liHTM.insertAdjacentHTML('beforeend', divSpanTemplate);

    }

  }

  render(menuJson: MainMenuData): void {

    this.addMenuRoot();
    menuJson.menus.forEach((menu: Menu) => {
      this.addTopLevelMenu(menu.id, menu.name);
      menu.children.forEach(child => {
        if (child.type === 'child') {
          this.addChildLevelMenu('Menu', menu.id, child.name as string);
        } else if (child.type === 'separator') {
          this.addSeparator('Menu', menu.id);
        } else if (child.type === 'title') {
          this.addTitle('Menu', menu.id, child.name as string);
        }
      });
    });

    // Use event delegation to make event more robust from the toolbar

    const menus = document.querySelector(`#MainMenuItems`) as HTMLElement;

    menus.addEventListener('click', (event) => {

      const menuItem = (event.target as HTMLElement).closest('a');

      if (menuItem) {
        const menu = menuItem.getAttribute('data-menu');
        //console.log(menu);
        this.app.handleNavigation(menu);
      }

    });

  }

  // addEventListeners(): void{

  //   /* Retro Editor */

  //   // Set Editor to Sprite Editor Mode
  //   const menubarSpriteEditor = document.querySelector('#menubar-sprite-editor') as HTMLElement;
  //   menubarSpriteEditor.onclick = (e) => {
  //     this.app.config.global.selectedEditor = "sprite";
  //     this.app.storage.setState(this.app.config);
  //   }

  //   // Set Editor to Tile Editor Mode
  //   const menubarTileEditor = document.querySelector('#menubar-tile-editor') as HTMLElement;
  //   menubarTileEditor.onclick = (e) => {
  //     this.app.config.global.selectedEditor = "tile";
  //     this.app.storage.setState(this.app.config);
  //   }

  //   // Set Editor to Sound Editor Mode
  //   const menubarSoundEditor = document.querySelector('#menubar-sound-studio') as HTMLElement;
  //   menubarSoundEditor.onclick = (e) => {
  //     this.app.config.global.selectedEditor = "sound";
  //     this.app.storage.setState(this.app.config);
  //   }

  //   // Set Settings
  //   const menubarSettings = document.querySelector('#menubar-settings') as HTMLElement;
  //   menubarSettings.onclick = (e) => {
  //     console.log('open settings dialog');
  //   }

  //   // Show About Dialog
  //   const menubarAbout = document.querySelector('#menubar-about') as HTMLElement;
  //   menubarAbout.onclick = (e) => {
  //     console.log('open about dialog');
  //   }

  //   /* File */


  //   /* Edit */


  //   /* Sprite */


  //   /* View */


  //   /* Platform */

  //   // Commodore 64
  //   const menubarCommodoreSixtyFour = document.querySelector('#menubar-commodore-64') as HTMLElement;
  //   menubarCommodoreSixtyFour.onclick = (e) => {

  //     this.app.config.global.selectedPlatform = "Commodore 64";
  //     this.app.storage.setState(this.app.config);
  //     const selectedPlatform = document.querySelector('#selectedPlatform') as HTMLElement;
  //     selectedPlatform.innerText = "Commodore 64";

  //   }

  //   // Commander X16
  //   const menubarCommanderXSixteen = document.querySelector('#menubar-commander-x16') as HTMLElement;
  //   menubarCommanderXSixteen.onclick = (e) => {

  //     this.app.config.global.selectedPlatform = "Commander X16";
  //     this.app.storage.setState(this.app.config);
  //     const selectedPlatform = document.querySelector('#selectedPlatform') as HTMLElement;
  //     selectedPlatform.innerText = "Commander X16";

  //   }

  //   /* Help */



  // }
}