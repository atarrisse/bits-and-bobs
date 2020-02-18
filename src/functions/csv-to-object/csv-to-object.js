"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var index_js_1 = __importDefault(require("../slugify/index.js"));
var index_1 = __importDefault(require("../write-file/index"));
/**
 * EN: Parses the string data to object
 * PT: Converte os dados de string para objeto
 *
 * @param data
 * EN: String with the csv data
 * PT: data em formato CSV numa longa string
 * @param delimiter
 * EN: CSV delimiter, default to comma (,)
 * PT: delimitador do CSV, padrão é virgula (,)
 */
function parseCSV(data, delimiter) {
    var dataAsArray = data.split(/\r\n/).map(function (v) { return v.split(delimiter); });
    var objectKeys = dataAsArray[0];
    var objectValues = dataAsArray.slice(1);
    var dataAsObjects = objectValues.map(function (value) {
        var obj = {};
        objectKeys.forEach(function (key, i) { return (obj[index_js_1.default(key)] = value[i]); });
        return obj;
    });
    return dataAsObjects;
}
/**
 * EN: Reads a CSV file and converts it into a JSON file
 * PT: Converte um arquivo CSV em JSON
 *
 * @param inputFile
 * EN: path to the file to be read
 * PT: caminho para o arquivo a ser lido
 * @param outputFile
 * EN: path to the file to the JSON file written
 * PT: caminho para o arquivo JSON a ser escrito
 * @param delimiter
 * EN: CSV delimiter, default to comma (,)
 * PT: delimitador do CSV, padrão é virgula (,)
 */
function csvToObject(inputFile, outputFile, delimiter) {
    var _this = this;
    if (delimiter === void 0) { delimiter = ","; }
    fs.readFile(inputFile, "utf8", function (err, data) { return __awaiter(_this, void 0, void 0, function () {
        var content, outputPath;
        return __generator(this, function (_a) {
            if (err)
                return [2 /*return*/, console.error(err)];
            content = JSON.stringify(parseCSV(data, delimiter));
            outputPath = __dirname + "/" + outputFile;
            index_1.default(outputPath, content);
            return [2 /*return*/];
        });
    }); });
}
exports.default = csvToObject;
