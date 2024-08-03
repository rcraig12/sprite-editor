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

  // Get the state from local storage
  getState(): ConfigType {
    const state = localStorage.getItem(this.storageKey);
    return state ? JSON.parse(state) as ConfigType : { ...defaultConfig };
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
      platform: this.mergePlatforms(currentState.platform)
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
}

export default Storage;