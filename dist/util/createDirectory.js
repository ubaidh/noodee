"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectory = void 0;
var fs_1 = __importDefault(require("fs"));
function createDirectory(dirPath) {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath);
        console.log("Directory created: ".concat(dirPath));
    }
}
exports.createDirectory = createDirectory;
