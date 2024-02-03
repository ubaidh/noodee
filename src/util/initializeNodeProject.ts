import { execSync } from 'child_process'
export function initializeNodeProject(projectPath: string): void {
    execSync('npm init -y', { cwd: projectPath });
    console.log(`Node.js project initialized in ${projectPath}`);
    const packages = [
        "bcrypt",
        "cors",
        "dotenv",
        "express",
        "morgan",
        "mysql2",
        "sequelize",
    ];
    execSync(`npm install ${packages.join(' ')}`, { cwd: projectPath });
    console.log('Required packages installed');
}