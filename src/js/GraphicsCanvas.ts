export default class GraphicsCanvas {

  window: any;
  options: canvasOptions;
  ctx: CanvasRenderingContext2D | null;

  constructor(options: canvasOptions, window: any) {
    this.window = window;
    this.options = options;
    this.ctx = null;
  }

  public render() {
    const template = `<canvas id="${this.options.id}"></canvas>`;

    const canvasTemplate = document.querySelector(`#Window-${this.window.title.toLowerCase().replace(' ', '-')} .graphicscanvas`) as HTMLElement;
    canvasTemplate.innerHTML = template;

    const canvas = document.querySelector(`#${this.options.id}`) as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // Set canvas size based on rows, cols, and zoom
    canvas.width = this.options.cols * this.options.zoom;
    canvas.height = this.options.rows * this.options.zoom;

    if (this.ctx) {
      this.drawGrid();
    }
  }

  private drawGrid() {
    if (!this.ctx) return;

    const { cols, rows, zoom, grid } = this.options;

    this.ctx.clearRect(0, 0, cols * zoom, rows * zoom);

    // Draw grid if enabled
    if (grid) {
      this.ctx.strokeStyle = "#cccccc";  // Set grid line color
      this.ctx.lineWidth = 1;  // Set grid line width

      // Draw vertical grid lines
      for (let col = 0; col <= cols; col++) {
        this.ctx.beginPath();
        this.ctx.moveTo(col * zoom, 0);
        this.ctx.lineTo(col * zoom, rows * zoom);
        this.ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let row = 0; row <= rows; row++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, row * zoom);
        this.ctx.lineTo(cols * zoom, row * zoom);
        this.ctx.stroke();
      }

      // Draw border around the canvas
      this.ctx.strokeStyle = "#cccccc";  // Set border color to black
      this.ctx.lineWidth = 2;  // Set border line width
      this.ctx.strokeRect(0, 0, cols * zoom, rows * zoom);
    }
  }
}
