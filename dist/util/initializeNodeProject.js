"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeNodeProject = void 0;
var child_process_1 = require("child_process");
function initializeNodeProject(projectPath) {
    (0, child_process_1.execSync)('npm init -y', { cwd: projectPath });
    console.log("Node.js project initialized in ".concat(projectPath));
    var packages = [
        "bcrypt",
        "cors",
        "dotenv",
        "express",
        "morgan",
        "mysql2",
        "sequelize",
    ];
    (0, child_process_1.execSync)("npm install ".concat(packages.join(' ')), { cwd: projectPath });
    console.log('Required packages installed');
}
exports.initializeNodeProject = initializeNodeProject;
