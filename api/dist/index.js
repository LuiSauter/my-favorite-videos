"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = __importDefault(require("./app"));
require("./database");
exports.server = app_1.default.listen(app_1.default.get('port'), () => {
    console.log('Server on port', app_1.default.get('port'));
});
