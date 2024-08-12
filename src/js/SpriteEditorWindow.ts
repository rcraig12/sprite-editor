import GraphicsCanvas from "./GraphicsCanvas";
import Window from "./Window";

export default class SpriteEditorWindow extends Window {

  canvas: GraphicsCanvas;

  constructor(options: WindowOptions){

    super(options);
    this.canvas = new GraphicsCanvas({
      id: "editorCanvas",
      cols: 16,
      rows: 16,
      zoom: 22,
      grid: true,
      edit: true
    },this);

  }

  public render() {
    super.render();

    const template = `<div class="graphicscanvas"></div>`;
    
    const window = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
    window.setAttribute('data-storage-attribute', 'spriteEditorWindow');

    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;
    html.innerHTML = template;

    this.canvas.render();

  }

}