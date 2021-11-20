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
exports.getAllUsers = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please. Send your email and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: 'The user already exists, no created' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please. Send your email and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ msg: 'The user does not exist' });
    const isMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(req.body.password));
    if (isMatch) {
        const token = createToken(user);
        return res.status(200).json({ token: token });
    }
    else {
        return res.status(400).json({ msg: 'The email or password is incorrect' });
    }
});
exports.signIn = signIn;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
