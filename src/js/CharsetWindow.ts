import Window from "./Window";

export default class CharsetWindow extends Window {

  private charsetImage: HTMLImageElement;
  private tileWidth: number = 16; // assuming each tile is 16x16
  private tileHeight: number = 16;
  private borderSize: number = 2; // 2-pixel border around each tile
  private selectedTile: { x: number, y: number } = { x: 0, y: 0 };

  constructor(options: WindowOptions){
    super(options);
    this.charsetImage = new Image();
    this.charsetImage.src = 'img/charset/c64.png';
    this.charsetImage.onload = () => this.paint();
  }

  private paint() {
    const canvas = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} #Canvas`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.width = this.charsetImage.width;
    canvas.height = this.charsetImage.height;
    

    if (ctx) {
      ctx.drawImage(this.charsetImage, 0, 0);
      this.drawGrid(ctx);
    }
  }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    const numColumns = (this.charsetImage.width - this.borderSize) / (this.tileWidth + this.borderSize);
    const numRows = (this.charsetImage.height - this.borderSize) / (this.tileHeight + this.borderSize);

    ctx.strokeStyle = '#000000';
    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        const x = this.borderSize + col * (this.tileWidth + this.borderSize);
        const y = this.borderSize + row * (this.tileHeight + this.borderSize);
        ctx.strokeRect(x, y, this.tileWidth, this.tileHeight);
      }
    }
  }

  private handleCanvasClick(event: MouseEvent) {
    const canvas = event.currentTarget as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / this.tileWidth);
    const row = Math.floor(y / this.tileHeight);

    this.selectedTile = { x: col, y: row };
    this.drawSelectedTile();
  }

  private drawSelectedTile() {
    const selectedTileCanvas = document.querySelector(`#Window-${this.title.toLowerCase().replace(' ', '-')} #SelectedTile`) as HTMLCanvasElement;
    const ctx = selectedTileCanvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, selectedTileCanvas.width, selectedTileCanvas.height);
      ctx.drawImage(
        this.charsetImage,
        this.selectedTile.x * this.tileWidth, this.selectedTile.y * this.tileHeight,
        this.tileWidth, this.tileHeight,
        0, 0,
        selectedTileCanvas.width, selectedTileCanvas.height
      );
    }
  }

};