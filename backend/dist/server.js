"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const fileController_1 = require("./controllers/fileController");
const app = (0, express_1.default)();
const port = 3000;
const upload = (0, multer_1.default)({ dest: 'src/uploads/' });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/files', upload.single('file'), fileController_1.uploadFile);
app.get('/api/users', fileController_1.searchUsers);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
