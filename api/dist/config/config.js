"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    MONGO_DATABASE: process.env.MONGO_DB_URL || '',
    MONGO_DATABASE_TEST: process.env.MONGO_DB_URL_TEST || '',
    NODE_ENVS: process.env.NODE_ENV || '',
    PORT: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'tokentest'
};
