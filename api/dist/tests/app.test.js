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
const mongoose_1 = __importDefault(require("mongoose"));
const video_1 = __importDefault(require("../models/video"));
const helpers_1 = require("../helpersTest/helpers");
const __1 = require("..");
jest.useFakeTimers('legacy');
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield video_1.default.deleteMany({});
    /**
    * const videosObject = initialVideos.map(video => new Video(video))
    * const promises = videosObject.map(video => video.save())
    * Promise.all(promises)
    */
    // best controll or correct use
    for (const video of helpers_1.initialVideos) {
        const videoObject = new video_1.default(video);
        yield videoObject.save();
    }
}));
describe('GET /api/videos', () => {
    test('should respond with a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .get('/api/videos')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
    test('there are videos', () => __awaiter(void 0, void 0, void 0, function* () {
        const { response } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(response.body).toHaveLength(helpers_1.initialVideos.length);
    }));
    test('the first video is about:...', () => __awaiter(void 0, void 0, void 0, function* () {
        const { contents } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(contents).toContain('Testing for videos');
    }));
});
describe('POST /api/videos', () => {
    describe('given a title and description', () => {
        const newVideo = {
            title: 'test video',
            url: 'https://www.youtube.com/watch?v=D0KrWq0i1QI&list=RDMM&index=1'
        };
        test('a valid video can be added', () => __awaiter(void 0, void 0, void 0, function* () {
            yield helpers_1.api
                .post('/api/videos')
                .send(newVideo)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            const { contents, response } = yield (0, helpers_1.getAllContentFromVideos)();
            expect(response.body).toHaveLength(helpers_1.initialVideos.length + 1);
            expect(contents).toContain(newVideo.title);
        }));
        test('should have a content type: application/json in header', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield helpers_1.api.post('/api/videos').send(newVideo);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        }));
        test('should respond with an task ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield helpers_1.api.post('/api/videos').send(newVideo);
            expect(response.body._id).toBeDefined();
        }));
    });
    describe('when title and description in missing', () => {
        test('should respond with a 400 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const fields = [
                {},
                { title: 'test videos' },
                { url: 'http://example.com' }
            ];
            for (const body of fields) {
                yield helpers_1.api
                    .post('/api/videos')
                    .send(body)
                    .expect(400);
                const { response } = yield (0, helpers_1.getAllContentFromVideos)();
                expect(response.body).toHaveLength(helpers_1.initialVideos.length);
            }
        }));
    });
});
describe('DELETE /api/videos/:id', () => {
    test('a video can be not deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .delete('/api/videos/123124')
            .expect(400);
        const { response } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(response.body).toHaveLength(helpers_1.initialVideos.length);
    }));
    test('a video can be deleted!', () => __awaiter(void 0, void 0, void 0, function* () {
        const { response: firstResponse } = yield (0, helpers_1.getAllContentFromVideos)();
        const { body } = firstResponse;
        yield helpers_1.api
            .delete(`/api/videos/${body[0]._id}`)
            .expect(200);
        const { response } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(response.body).toHaveLength(helpers_1.initialVideos.length - 1);
    }));
});
describe('UPDATE /api/videos/:id', () => {
    const videoUpdated = {
        title: 'video 1 updated successfully',
        url: 'https://youtu.be/AH13izmP4fM?list=RDD0KrWq0i1QI',
        description: 'video description updated'
    };
    test('a video can be not updated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .put('/api/videos/123456')
            .send(videoUpdated)
            .expect(400);
        const { response } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(response.body).toHaveLength(helpers_1.initialVideos.length);
    }));
    test('a video can be updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const { response: firstResponse } = yield (0, helpers_1.getAllContentFromVideos)();
        const { body } = firstResponse;
        yield helpers_1.api
            .put(`/api/videos/${body[0]._id}`)
            .send(videoUpdated)
            .expect(200);
        const { contents } = yield (0, helpers_1.getAllContentFromVideos)();
        expect(contents).toContain('video 1 updated successfully');
    }));
});
describe('GET /api/videos/:id', () => {
    test('there should not be a video with that invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helpers_1.api
            .get('/api/videos/123456')
            .expect(400);
    }));
    test('should respond with a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { response } = yield (0, helpers_1.getAllContentFromVideos)();
        const { _id } = response.body[0];
        yield helpers_1.api
            .get(`/api/videos/${_id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }));
});
// afterEach(() => mongoose.disconnect())
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close(true);
    yield mongoose_1.default.disconnect();
    __1.server.close();
}));
