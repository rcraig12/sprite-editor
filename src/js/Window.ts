import Storage from './Storage';

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
  public status: string;
  private storage: Storage;
  private zIndex: number;

  
  constructor({ title, top, left, zindex, width, height, resizable = true }: WindowOptions) {
    this.storage = new Storage();
    this.title = title;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.resizable = resizable;
    this.status = "";
    this.zIndex = zindex;

  }


  render() {

    const template = `
      <div id="Window-${this.title.toLowerCase().replace(' ', '-')}" class="window" style="position:absolute;top:${this.top}px;left:${this.left}px;width:${this.width}px;height:${this.height}px;z-index:${this.zIndex};">
        <div class="controlbar">${this.title.toUpperCase()}</div>
        <div class="frame">
            <div class="panel">

            </div>
        </div>
        ${this.status !== '' ? `<div class="status">${this.status}</div>`:``}
      </div>
    `;

    const html = document.querySelector('#DesktopCanvas') as HTMLElement;
    const windowTemplate = this.stringToElement(template);
    html.insertAdjacentElement('beforeend', windowTemplate);

    this.addEventListeners();

  }

  protected addEventListeners() {

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

      const parentElement = document.querySelector('#Desktop') as HTMLElement;
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

    // Save the new window coordinates
  
    console.log(this);
    this.storage.setWindowCoordinates(this);

  }


  private onWindowClick(windowElement: HTMLElement) {

    const allWindows = Array.from(document.querySelectorAll('#DesktopCanvas .window'));

    const zIndexes = allWindows.map((win) => ({

      element: win as HTMLElement,
      zIndex: parseInt((win as HTMLElement).style.zIndex) || 0,

    }));

    zIndexes.sort((a, b) => a.zIndex - b.zIndex);

    let startIndex = 100;

    zIndexes.forEach((win, index) => {

      win.element.style.zIndex = (startIndex + index).toString();

    });

    
    windowElement.style.zIndex = (startIndex + zIndexes.length).toString();

    this.storage.setWindowCoordinates(this);

  }


  updateStatus(value: string): void {

    const windowElement = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .status`) as HTMLElement;

    if (windowElement){

      this.status = value;
      windowElement.innerText = value;

    }

  }


  // Utility function to convert a string to an Element
  stringToElement(htmlString: string): Element {

    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();

    return template.content.firstElementChild as Element;

  }

}



