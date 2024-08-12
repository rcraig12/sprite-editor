import GraphicsCanvas from "./GraphicsCanvas";
import Window from "./Window";

export default class TileMapWindow extends Window {
  canvas: any;


  constructor(options: WindowOptions){
    super(options);
    this.canvas = new GraphicsCanvas({
      id: "tileMapCanvas",
      cols: 40,
      rows: 25,
      zoom: 24,
      grid: true,
      edit: true
    },this);
  }

  public render() {
    super.render();

    const template = `<div class="graphicscanvas"></div>`;

    const window = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
    window.setAttribute('data-storage-attribute', 'tileMapWindow');

    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;
    html.innerHTML = template;

    this.canvas.render();

  }

}