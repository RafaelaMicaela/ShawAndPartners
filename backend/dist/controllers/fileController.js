"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.uploadFile = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
const sequelize_1 = require("sequelize");
const strip_bom_stream_1 = __importDefault(require("strip-bom-stream"));
const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = path_1.default.join(__dirname, '../uploads/', file.filename);
    const results = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, strip_bom_stream_1.default)())
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
        try {
            fs_1.default.unlinkSync(filePath);
            await User_1.default.destroy({ where: {} });
            await User_1.default.bulkCreate(results);
            res.status(200).json({ message: 'The file was uploaded and processed successfully.' });
        }
        catch (error) {
            res.status(500).json({ message: `Error processing file` });
        }
    })
        .on('error', (error) => {
        res.status(500).json({ message: `Error processing file: ${error.message}` });
    });
};
exports.uploadFile = uploadFile;
const searchUsers = async (req, res) => {
    const query = req.query.q;
    try {
        const results = await User_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${query}%` } },
                    { city: { [sequelize_1.Op.like]: `%${query}%` } },
                    { country: { [sequelize_1.Op.like]: `%${query}%` } },
                    { favorite_sport: { [sequelize_1.Op.like]: `%${query}%` } },
                ]
            }
        });
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ message: `Error searching users` });
    }
};
exports.searchUsers = searchUsers;
