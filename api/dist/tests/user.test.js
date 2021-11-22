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
const helpers_1 = require("../helpersTest/helpers");
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = require("..");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    for (const user of helpers_1.initialUsers) {
        const userObject = new user_1.default(user);
        yield userObject.save();
    }
}));
describe('POST /user/signup && /user/signin', () => {
    const newUser = {
        email: 'gabriel@gmail.com',
        password: 'gabrieldev',
    };
    test('login fails with proper status code and message if username is not yet registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helpers_1.api
            .post('/user/signin')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(response.body.msg).toContain('The user does not exist');
    }));
    test('given a eamil and password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .post('/user/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const response = yield helpers_1.api.get('/user/all').send();
        expect(response.body).toHaveLength(helpers_1.initialUsers.length + 1);
    }));
    test('should respond 200 status code when user log in', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .post('/user/signin')
            .send({
            email: 'sauter@gmail.com',
            password: 'sauterdev',
        })
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
    test('should respond with a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .get('/user/all')
            .send()
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close(true);
        yield mongoose_1.default.disconnect();
        __1.server.close();
    }));
});
