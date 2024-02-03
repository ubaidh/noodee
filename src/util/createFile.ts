import fs from 'fs';

export function createFile(filePath: string, fileContent: string): void {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
        console.log(`File created: ${filePath}`);
    }
}
