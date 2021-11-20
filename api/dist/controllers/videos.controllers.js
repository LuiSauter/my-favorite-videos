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
exports.updateVideo = exports.getOneVideo = exports.deleteVideos = exports.getVideos = exports.createVideo = void 0;
const video_1 = __importDefault(require("../models/video"));
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url } = req.body;
    if (!title || !url)
        return res.sendStatus(400);
    const findUrl = yield video_1.default.findOne({ url: req.body.url });
    if (findUrl) {
        return res.status(301).json();
    }
    const newVideo = new video_1.default({ title, description, url });
    const savedVideo = yield newVideo.save();
    res.json(savedVideo);
});
exports.createVideo = createVideo;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allVideos = yield video_1.default.find({}).sort({ createdAt: 'desc' });
    res.json(allVideos);
});
exports.getVideos = getVideos;
const deleteVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoFound = yield video_1.default.findByIdAndDelete(req.params.id);
        if (!videoFound)
            return res.status(204).json({});
        return res.json(videoFound);
    }
    catch (error) {
        res.status(400).send({ err: 'id used is malformed' });
        console.error(error);
    }
});
exports.deleteVideos = deleteVideos;
const getOneVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const oneVideoFound = yield video_1.default.findById(id);
        if (!oneVideoFound) {
            return res.status(204).json({ error: 'not found video' });
        }
        res.status(200).json(oneVideoFound);
    }
    catch (error) {
        res.status(400).send({ err: 'id used is malformed' });
        console.error(error);
    }
});
exports.getOneVideo = getOneVideo;
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoFound = yield video_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!videoFound) {
            return res.status(204).json({});
        }
        res.status(200).json(videoFound);
    }
    catch (error) {
        res.status(400).send({ err: 'id used is malformed' });
        console.error(error);
    }
});
exports.updateVideo = updateVideo;
