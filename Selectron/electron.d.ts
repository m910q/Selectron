declare class BrowserWindow {
      setFullScreen(flag: boolean);
}

declare class HTMLWebviewElement extends HTMLElement {
      src: string;
      webContents: WebContents;

      goBack(): void;
      goForward(): void;
      getURL(): string;
      getWebContents(): WebContents;
      loadURL(url: string);
      executeJavaScript(code: string, userGesture?: boolean): Promise<any>;
      executeJavaScript(code: string, userGesture?: boolean, callback?: (any) => any): void;
      openDevTools();
      closeDevTools();
      isDevToolsOpened();
      isDevToolsFocused();
      inspectElement(x: number, y: number);
      setZoomLevel(level: number);

      addEventListener(event: 'did-navigate', eventCall: (e: { url: string }) => void);
      addEventListener(event: 'did-navigate-in-page', eventCall: (e: { url: string, isMainFrame: boolean }) => void);
      addEventListener(event: 'page-favicon-updated', eventCall: (e: { favicons: Array<string> }) => void);
      addEventListener(event: 'new-window', eventCall: (e: { url : string, frameName: string, disposition : "default" | "foreground-tab" | "background-tab" | "new-window" | "save-to-disk" | "other", options: Object }) => void);
      addEventListener(event: 'page-title-updated', eventCall: (e: { title: string }) => void);
      addEventListener(event: 'did-start-loading', eventCall: () => void);
      addEventListener(event: 'did-stop-loading', eventCall: () => void);
      addEventListener(event: 'media-started-playing', eventCall: () => void);
      addEventListener(event: 'media-paused', eventCall: () => void);
      addEventListener(event: 'enter-html-full-screen', eventCall: () => void);
      addEventListener(event: 'leave-html-full-screen', eventCall: () => void);
      addEventListener(event: 'update-target-url', eventCall: (e: { url: string }) => void);
      addEventListener(event: 'dom-ready', eventCall: () => void);
      addEventListener(event: string, eventCall: (e: any) => void);
}
declare class WebContents {
      executeJavaScript(code: string, userGesture?: boolean, callback?: (result: any) => void): Promise<any>;
      reload(): void;
      on(eventName: "context-menu", eventFunc: (e: Event, params: MenuContextParams) => void);
      on(eventName: string, eventFunc: (e: Event, params: any) => void);
      once(eventName: string, eventFunc: (e: Event, params: any) => void);
      downloadURL(url: string): void;
      savePage(fullPath: string, saveType: "HTMLOnly" | "HTMLComplete" | "MHTML", callback: (error: boolean) => void): boolean;
      isFocused(): boolean;
      sendInputEvent(event: { type: 'char', keyCode: string });


      undo();
      redo();
      cut();
      copy();
      paste();
      pasteAndMatchStyle();
      delete();
      selectAll();
      unselect();
}
declare class MenuContextParams {
      linkURL: string;
      linkText: string;
      pageURL: string;
      frameURL: string;
      srcURL: string;
      mediaType: "none" | "image" | "audio" | "video" | "canvas" | "file" | "plugin";
      hasImageContents: boolean;
      isEditable: boolean;
      selectionText: string;
      titleText: string;
      misspelledWord: string;
      frameCharset: string;
      inputFieldType: "none" | "plainText" | "password" | "other";
      menuSourceType: "none" | "mouse" | "keyboard" | "touch" | "touchMenu";
      mediaFlags : MediaFlags;
      editFlags : EditFlags;
}
declare class MediaFlags {
      inError: boolean;
      isPaused: boolean;
      isMuted: boolean;
      hasAudio: boolean;
      isLooping: boolean;
      isControlsVisible: boolean;
      canToggleControls: boolean;
      canRotate: boolean;
}
declare class EditFlags {
      canUndo: boolean;
      canRedo: boolean;
      canCut: boolean;
      canCopy: boolean;
      canPaste: boolean;
      canDelete: boolean;
      canSelectAll: boolean; 
}