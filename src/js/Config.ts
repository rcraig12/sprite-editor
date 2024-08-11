export const defaultConfig: ConfigType = {
  global: {
    version: "1.0.0 alpha",
    selectedPlatform: "Commodore 64",
    selectedEditor: "sprite",
    selectedTool: "draw",
    currentFile: "",
    editors: {
      sprite: {
        toolWindow: { top: 10, left: 10 },
        paletteWindow: { top: 10, left: 90 },
        spriteEditorWindow: { top: 10, left: 230 },
        spritePreviewWindow: { top: 444, left: 10 },
        spriteListWindow: { top: 10, left: 640 },
        spriteAnimationWindow: { top: 320, left: 640 }
      },
      tile: {
        toolWindow: { top: 10, left: 10 },
        paletteWindow: { top: 10, left: 90 },
        charsetWindow: { top: 10, left: 1170 },
        tileWindow: { top: 360, left: 1170 },
        tileMapWindow: { top: 10, left: 180 }
      },
      sound: {}
    }
  },
  platform: [
    {
      name: "Commodore 64",
      palettes: {
        colodore: [
          "#000000", "#ffffff", "#813338", "#75cec8", "#8e3c97", "#56ac4d", 
          "#2e2c9b", "#edf171", "#8e5029", "#553800", "#c46c71", "#4a4a4a", 
          "#7b7b7b", "#a9ff9f", "#706deb", "#b2b2b2"
        ],
        pepto: [
          "#000000", "#ffffff", "#67372d", "#73a3b1", "#6e3e83", "#5b8d48", 
          "#362976", "#b7c576", "#6c4a2a", "#423908", "#98675b", "#444444", 
          "#6c6c6c", "#9dd28a", "#6d5fb0", "#959595"
        ],
        custom: [
          "#000000", "#ffffff", "#813338", "#75cec8", "#8e3c97", "#56ac4d", 
          "#2e2c9b", "#edf171", "#8e5029", "#553800", "#c46c71", "#4a4a4a", 
          "#7b7b7b", "#a9ff9f", "#706deb", "#b2b2b2"
        ],
      },
      settings: {
        selectedPalette: "pepto"
      }
    },
    {
      name: "Commander X16",
      palettes: {
        cx16: [
          "#000000", "#ffffff", "#880000", "#AAFFEE", "#CC44CC", "#00CC55", 
          "#0000AA", "#EEEE77", "#DD8855", "#664400", "#FF7777", "#333333", 
          "#777777", "#AAFF66", "#0088FF", "#BBBBBB"
        ],
        custom: [
          "#000000", "#ffffff", "#880000", "#AAFFEE", "#CC44CC", "#00CC55", 
          "#0000AA", "#EEEE77", "#DD8855", "#664400", "#FF7777", "#333333", 
          "#777777", "#AAFF66", "#0088FF", "#BBBBBB"
        ],
      },
      settings: {
        selectedPalette: "cx16"
      }
    }
  ]
};
