import Window from "./Window";

export default class CharsetWindow extends Window {

  private charsetImage: HTMLImageElement;
  private tileWidth: number = 16; // assuming each tile is 16x16
  private tileHeight: number = 16;
  private selectedTile: { x: number, y: number } = { x: 0, y: 0 };

  constructor(options: WindowOptions){
    super(options);
    this.charsetImage = new Image();
    this.charsetImage.src = 'img/charset/c64.png';
    this.charsetImage.onload = () => this.drawCharset();
  }

  private drawCharset() {
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
    const numColumns = this.charsetImage.width / this.tileWidth;
    const numRows = this.charsetImage.height / this.tileHeight;

    ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        ctx.strokeRect(col * this.tileWidth, row * this.tileHeight, this.tileWidth, this.tileHeight);
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