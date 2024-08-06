export default class Desktop {

  app: any;
  status: string;
  
  constructor(app: any) {

    this.app = app;
    this.status = "Welcome to Retro Editor ©2024";
  
  }

  render(): void {

    const template = `
      <div id="App">
        <div id="Menu"></div>
        <div id="Desktop">
          <div id="Outer">
            <div id="DesktopCanvas"></div>
          </div>
        </div>
        ${this.status !== '' ? `<div id="Status">${this.status}</div>`:``}
      </div>
    `;

    const html = document.querySelector('body') as HTMLElement;
    html.innerHTML = template;

  }

  updateStatus(value: string): void {

    const windowElement = document.querySelector(`#Status`) as HTMLElement;

    if (windowElement){

      this.status = value;
      windowElement.innerText = value;

    }

  }

  toggle_fullscreen(): void {
    if (
      !document.fullscreenElement && // alternative standard method
      !(<any>document).mozFullScreenElement &&
      !(<any>document).webkitFullscreenElement &&
      !(<any>document).msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((<any>document.documentElement).msRequestFullscreen) {
        (<any>document.documentElement).msRequestFullscreen();
      } else if ((<any>document.documentElement).mozRequestFullScreen) {
        (<any>document.documentElement).mozRequestFullScreen();
      } else if ((<any>document.documentElement).webkitRequestFullscreen) {
        (<any>document.documentElement).webkitRequestFullscreen(
          (<any>Element).ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((<any>document).msExitFullscreen) {
        (<any>document).msExitFullscreen();
      } else if ((<any>document).mozCancelFullScreen) {
        (<any>document).mozCancelFullScreen();
      } else if ((<any>document).webkitExitFullscreen) {
        (<any>document).webkitExitFullscreen();
      }
    }
  }

}