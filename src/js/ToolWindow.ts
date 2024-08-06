import Window from "./Window";

export default class ToolWindow extends Window {
  
  toolbarMenu: { icon: string; title: string; }[];
  app: any;

  constructor(options: WindowOptions, app: any ){
   
    super(options);

    this.app = app;

    this.toolbarMenu = [
      { "icon": "img/ui/icon-draw.png", "title": "LOAD"},
      { "icon": "img/ui/icon-draw.png", "title": "SAVE"},
      { "icon": "img/ui/icon-draw.png", "title": "UNDO"},
      { "icon": "img/ui/icon-draw.png", "title": "REDO"},
      { "icon": "img/ui/icon-draw.png", "title": "MOVE"},
      { "icon": "img/ui/icon-draw.png", "title": "DRAW"},
      { "icon": "img/ui/icon-draw.png", "title": "ERASE"},
      { "icon": "img/ui/icon-draw.png", "title": "FILL"}
    ];
    
  }

  render() {
    super.render();

    const template = `
      <div class="tools"></div>
    `;

    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;
    html.innerHTML = template;

    const toolsDiv = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel .tools`) as HTMLElement;

    this.toolbarMenu.forEach(tool => {

      const toolTemplate = `
        <div data-tool="tool-${tool.title.toLowerCase()}" class="toolMenuItem">
          <div class="toolIcon"><a><img src="${tool.icon}" /></a></div>
          <div class="toolTitle">${tool.title}</div>
        </div>
      `;

      toolsDiv.insertAdjacentHTML('beforeend', toolTemplate);

    });

    // Use event delegation to make event more robust from the toolbar

    const tools = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel .tools`) as HTMLElement;

    tools.addEventListener('click', (event) => {

      const toolItem = (event.target as HTMLElement).closest('.toolMenuItem');

      if (toolItem) {
        const tool = toolItem.getAttribute('data-tool');
        this.app.handleTool(tool);
      }

    });

  }

};