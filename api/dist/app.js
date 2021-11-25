"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const special_routes_1 = __importDefault(require("./routes/special.routes"));
// initializations
const app = (0, express_1.default)();
// settings
app.set('port', config_1.default.PORT);
// middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.static('../frontend/build'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
// routes
app.use('/api/videos', videos_routes_1.default);
app.use('/user', auth_routes_1.default);
app.use('/spc', special_routes_1.default);
exports.default = app;
