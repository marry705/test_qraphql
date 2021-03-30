export class DirectoryPath {
    path = '';

    constructor(newPath?: string) {
      this.setPath(newPath || '');
    }

    getPath(): string {
      return this.path;
    }

    setPath(newPath: string): void {
      this.path = newPath;
    }
}
