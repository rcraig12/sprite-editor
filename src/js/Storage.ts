import {defaultConfig} from './Config';

class Storage {
  private storageKey: string = 'retroEditor';

  constructor() {
    this.initializeState();
  }

  // Initialize the state in local storage
  private initializeState() {
    const currentState = this.getState();
    const updatedState = this.getUpdatedState(currentState);
    this.setState(updatedState);
  }

  // Merge platform settings
  private mergePlatforms(currentPlatforms: PlatformSettings[] = []): PlatformSettings[] {
    const defaultPlatforms = defaultConfig.platform;
    const updatedPlatforms: PlatformSettings[] = [];

    defaultPlatforms.forEach(defaultPlatform => {
      const matchingPlatform = currentPlatforms.find(platform => platform.name === defaultPlatform.name);
      if (matchingPlatform) {
        updatedPlatforms.push({ ...defaultPlatform, settings: { ...defaultPlatform.settings, ...matchingPlatform.settings } });
      } else {
        updatedPlatforms.push(defaultPlatform);
      }
    });

    return updatedPlatforms;
  }

  // Merge User Data
  private mergeUserData(currentUserData: UserData = { sprites: [], tiles: [], maps: [], animations: [] }): UserData {
    const defaultUserData = defaultConfig.userdata;
  
    return {
      sprites: currentUserData.sprites.length > 0 ? currentUserData.sprites : defaultUserData.sprites,
      tiles: currentUserData.tiles.length > 0 ? currentUserData.tiles : defaultUserData.tiles,
      maps: currentUserData.maps.length > 0 ? currentUserData.maps : defaultUserData.maps,
      animations: currentUserData.animations.length > 0 ? currentUserData.animations : defaultUserData.animations,
    };
  }
  

  // Get the state from local storage
  getState(): ConfigType {
    const state = localStorage.getItem(this.storageKey);
    return state ? JSON.parse(state) as ConfigType : { ...defaultConfig };
  }

  resetState(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Set the state in local storage
  setState(state: ConfigType) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  // Validate and update the state based on the default config
  validateState() {
    const currentState = this.getState();
    const updatedState = this.getUpdatedState(currentState);
    if (this.hasStateChanged(currentState, updatedState)) {
      this.setState(updatedState);
    }
  }

  // Update the state based on the default config
  private getUpdatedState(currentState: ConfigType): ConfigType {
    return {
      global: { ...defaultConfig.global, ...currentState.global },
      platform: this.mergePlatforms(currentState.platform),
      userdata: this.mergeUserData(currentState.userdata),
    };
  }

  // Check if the state has changed
  private hasStateChanged(currentState: ConfigType, updatedState: ConfigType): boolean {
    return JSON.stringify(currentState) !== JSON.stringify(updatedState);
  }

  // Get the current configuration
  getConfig(): ConfigType {
    this.validateState();
    return this.getState();
  }

  getWindowCoordinates(windowName: string): { top: number; left: number; zindex: number } {
    const state = this.getState();

    if (state.global.selectedEditor === "sprite"){
      const coordConfig = state.global.editors.sprite as Record<string, { top: number; left: number; zindex: number }>;
      return coordConfig[windowName] || { top: 10, left: 10, zindex: 100  };
    }

    if (state.global.selectedEditor === "tile"){
      const coordConfig = state.global.editors.tile as Record<string, { top: number; left: number; zindex: number }>;
      return coordConfig[windowName] || { top: 10, left: 10, zindex: 100 };
    }

    // It should never get here but if it does supply values
    return { top: 10, left: 10, zindex: 100};
    
  }

  setWindowCoordinates(window: any) {

    const state = this.getState();
  
    // Assert that sprite is a record with string keys
    if (state.global.selectedEditor === "sprite"){

      const coordConfig = state.global.editors.sprite as Record<string, { top: number; left: number }>;
    
      const windowName = window.constructor.name.toString();
      const prop = windowName.charAt(0).toLowerCase() + windowName.slice(1);

      if ( windowName === "ToolWindow" || 
           windowName === "ToolWindow" || 
           windowName === "PaletteWindow" || 
           windowName === "SpriteEditorWindow" || 
           windowName === "SpritePreviewWindow" ||
           windowName === "SpriteListWindow" ||
           windowName === "SpriteAnimationWindow" ){
        
        // Update the coordinates
        coordConfig[prop] = {
          top: window.top,
          left: window.left
        };

      }
    }

    // Assert that tile is a record with string keys
    if (state.global.selectedEditor === "tile"){

      const coordConfig = state.global.editors.tile as Record<string, { top: number; left: number }>;
    
      const windowName = window.constructor.name.toString();
      const prop = windowName.charAt(0).toLowerCase() + windowName.slice(1);

      if ( windowName === "ToolWindow" || 
        windowName === "PaletteWindow" || 
        windowName === "CharsetWindow" || 
        windowName === "TileWindow" || 
        windowName === "TileMapWindow" ){
        
        // Update the coordinates
        coordConfig[prop] = {
          top: window.top,
          left: window.left,
        };

      }
    }

    const allWindows = Array.from(document.querySelectorAll('#DesktopCanvas .window'));

    allWindows.forEach((win) => {
        const element = win as HTMLElement;
        const zIndex = parseInt(element.style.zIndex) || 0;
        const storageAttribute = element.getAttribute('data-storage-attribute');

        if (!storageAttribute) {
            console.warn('Missing data-storage-attribute on window:', element);
            return;
        }

        // Update the sprite editor's coordinates if selected
        if (state.global.selectedEditor === "sprite") {
            const coordConfig = state.global.editors.sprite as Record<string, { top: number; left: number; zindex: number }>;
            coordConfig[storageAttribute] = {
                top: parseInt(element.style.top) || 0,
                left: parseInt(element.style.left) || 0,
                zindex: zIndex
            };
        }

        // Update the tile editor's coordinates if selected
        else if (state.global.selectedEditor === "tile") {
            const coordConfig = state.global.editors.tile as Record<string, { top: number; left: number; zindex: number }>;
            coordConfig[storageAttribute] = {
                top: parseInt(element.style.top) || 0,
                left: parseInt(element.style.left) || 0,
                zindex: zIndex
            };
        }
    });
  
    this.setState(state);

   }
 
}

export default Storage;