export enum CarouselProperty {
    Position = 'position',
    Settings = 'settings',
    Width = 'width',
    Items = 'items'
};

export enum CarouselState {
    Busy = 'busy',
    Interacting = 'interacting',
    Rotating = 'rotating'
};

export enum CarouselEventType {
    Initializing = 'initializing',
    Initialized = 'initialized',
    Change = 'change',
    Changed = 'changed',
    Resize = 'resize',
    Resizing = 'resizing',
    Resized = 'resized',
    Refresh = 'refresh',
    Refreshed = 'refreshed',
    Translate = 'translate',
    Translated = 'translated',
    Animating = 'animating',
    Refreshing = 'refreshing'    
};