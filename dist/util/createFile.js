"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
var fs_1 = __importDefault(require("fs"));
function createFile(filePath, fileContent) {
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, fileContent);
        console.log("File created: ".concat(filePath));
    }
}
exports.createFile = createFile;
