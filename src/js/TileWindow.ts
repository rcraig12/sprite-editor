import Window from "./Window";

export default class TileWindow extends Window {

  constructor(options: WindowOptions){
    super(options);

  }

  public render() {
    super.render();

    const template = `
      <div>
        <div></div>
        <div></div>
      </div>
    `;

    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;
    html.innerHTML = template;

  }

};