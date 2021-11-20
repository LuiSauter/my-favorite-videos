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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContentFromVideos = exports.initialUsers = exports.initialVideos = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
exports.api = (0, supertest_1.default)(app_1.default);
exports.initialVideos = [
    {
        title: 'Testing for videos',
        url: 'https://www.youtube.com/watch?v=p0OH206z9Wg',
        description: 'This is a video for test'
    },
    {
        title: 'Testing for videos 2',
        url: 'https://www.youtube.com/watch?v=vMLk_T0PPbk&list=RDvMLk_T0PPbk&index=1',
        description: 'This is a video for test 2'
    },
    {
        title: 'Testing for videos 3',
        url: 'https://www.youtube.com/watch?v=8DowcVNF0Lk',
        description: 'This is a video for test 3'
    }
];
exports.initialUsers = [
    {
        email: 'sauter@gmail.com',
        password: 'sauterdev'
    },
    {
        email: 'luis@gmail.com',
        password: 'luisdev'
    }
];
const getAllContentFromVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield exports.api.get('/api/videos').send();
    return {
        response,
        contents: response.body.map((video) => video.title)
    };
});
exports.getAllContentFromVideos = getAllContentFromVideos;
