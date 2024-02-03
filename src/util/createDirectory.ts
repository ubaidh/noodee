import fs from 'fs'
export function createDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Directory created: ${dirPath}`);
    }
}