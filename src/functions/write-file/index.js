"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function writeFile(outputPath, content) {
    fs_1.default.writeFile(outputPath, content, function (err) {
        if (err)
            return console.log(err);
        console.log("The file was saved!");
    });
}
exports.default = writeFile;
