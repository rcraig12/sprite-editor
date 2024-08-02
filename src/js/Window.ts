export default class Window {
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  resizable: boolean;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private isDragging: boolean = false;

  constructor({ title, top, left, width, height, resizable = true }: WindowOptions) {
    this.title = title;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.resizable = resizable;
  }

  showWindow() {
    const template = `
      <div id="Window-${this.title.toLowerCase().replace(' ', '-')}" class="window" style="position:absolute;top:${this.top}px;left:${this.left}px;width:${this.width}px;height:${this.height}px;z-index:100">
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
    html.innerHTML = template;

    this.addEventListeners();
  }

  private addEventListeners() {
    const windowElement = document.getElementById(`Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
    const controlbar = windowElement.querySelector('.controlbar') as HTMLElement;

    controlbar.addEventListener('mousedown', (e) => this.onMouseDown(e));
    windowElement.addEventListener('mousedown', () => this.onWindowClick(windowElement));

    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseUp());
  }

  private onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.offsetX = e.clientX - this.left;
    this.offsetY = e.clientY - this.top;
    document.body.style.userSelect = 'none';  // Prevent text selection while dragging
  }

  private onMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      const parentElement = document.getElementById('GUI') as HTMLElement;
      const parentRect = parentElement.getBoundingClientRect();
      const windowElement = document.getElementById(`Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
      const windowRect = windowElement.getBoundingClientRect();

      let newLeft = e.clientX - this.offsetX;
      let newTop = e.clientY - this.offsetY;

      // Ensure the window stays within the parent's boundaries
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft + windowRect.width > parentRect.width) {
        newLeft = parentRect.width - windowRect.width;
      }

      if (newTop < 0) {
        newTop = 0;
      } else if (newTop + windowRect.height > parentRect.height) {
        newTop = parentRect.height - windowRect.height;
      }

      this.left = newLeft;
      this.top = newTop;

      windowElement.style.left = `${this.left}px`;
      windowElement.style.top = `${this.top}px`;
    }
  }

  private onMouseUp() {
    this.isDragging = false;
    document.body.style.userSelect = '';  // Re-enable text selection
  }

  private onWindowClick(windowElement: HTMLElement) {
    let zIndex = parseInt(windowElement.style.zIndex) || 0;
    zIndex++;
    windowElement.style.zIndex = zIndex.toString();
  }
}
