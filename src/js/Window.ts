export default class Window {

  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  resizable: boolean;

  constructor({ title, top, left, width, height, resizable = true }: WindowOptions ){

    this.title = title;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.resizable = resizable;

  }

  showWindow(){

    console.log(`CharsetWindow "${this.title}" using width: ${this.width}`);

    const template = `
      <div id="Window-${this.title.toLowerCase().replace(' ', '-')}" class="window" style="position:absolute;top:${this.top}px;left:${this.left}px;width:${this.width}px;height:${this.height}px">
        <div class="controlbar">${this.title}</div>
        <div class="frame">
          <div id="WindowCanvas">
            <div id="Panel">
              <canvas id="Canvas"></canvas>
              <canvas id="SelectedTile" width="32" height="32"></canvas>
            </div>
          </div>
        </div>
        <div class="status">Window Status</div>
      </div>
    `;

    const html = document.querySelector('#GUI') as HTMLElement;
    console.log(html);
    html.innerHTML = template;
  }



}