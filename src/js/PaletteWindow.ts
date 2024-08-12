import Window from "./Window";

export default class PaletteWindow extends Window {
  
  app: any;

  constructor(options: WindowOptions, app: any){
    super(options);
    this.app = app;
  }

  public render() {
    super.render();

    // Assuming this.app.config holds the configuration object of type ConfigType
    const selectedPlatform = this.app.config.global.selectedPlatform;
    
    
    const platformConfig = this.app.config.platform.find((platform: any) => platform.name === selectedPlatform);
    const selectedPaletteName = platformConfig.settings.selectedPalette; // Adjust if this is not the correct property
    const selectedPalette = platformConfig?.palettes[selectedPaletteName] || [];

    // Create the palette divs
    const paletteDivs = selectedPalette.map((color: string) => {
      
      const colorDiv = document.createElement('div');
      colorDiv.classList.add("palettecolour");
      colorDiv.style.backgroundColor = color;
      colorDiv.setAttribute('data-colour', color);
      //colorDiv.style.width = '40px';  // Adjust as needed
      //colorDiv.style.height = '24px'; // Adjust as needed
      //colorDiv.style.display = 'inline-block';
      //colorDiv.style.margin = '0px';
      //colorDiv.style.padding = '0px';
      //colorDiv.style.border = 'none';
      return colorDiv;
    });

    // Append the palette divs to the template
    const template = `<div id="palette"></div>`;
    const window = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')}`) as HTMLElement;
    window.setAttribute('data-storage-attribute', 'paletteWindow');
    const html = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} .frame .panel`) as HTMLElement;

    html.innerHTML = template;
    
    const paletteContainer = html.querySelector('#palette') as HTMLElement;
    paletteDivs.forEach((div: any) => paletteContainer.appendChild(div));

    const colours = document.querySelector(`#palette`) as HTMLElement;

    colours.addEventListener('click', (event) => {

      const colour = (event.target as HTMLElement).closest('div');

      if (colour) {
        const selected = colour.getAttribute('data-colour');
        //console.log(menu);
        this.app.handlePalette(selected);
      }

    });
    
  }
}
