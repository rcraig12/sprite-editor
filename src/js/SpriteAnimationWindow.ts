import Window from "./Window";

export default class SpriteAnimationWindow extends Window {


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
    
    const window = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
    window.setAttribute('data-storage-attribute', 'spriteAnimationWindow');

    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;
    html.innerHTML = template;

  }

}