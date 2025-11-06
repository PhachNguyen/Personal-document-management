import express from "express";
import multer from "multer";
import fs from "fs";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import dotenv from "dotenv";
dotenv.config();
console.log("ID:", process.env.INFURA_PROJECT_ID);
console.log("SECRET:", process.env.INFURA_PROJECT_SECRET);

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;
const auth =
    "Basic " + Buffer.from(`${projectId}:${projectSecret}`).toString("base64");

// const ipfs = create({
//     host: "ipfs.infura.io",
//     port: 5001,
//     protocol: "https",
//     headers: { authorization: auth },
// });
const ipfs = create({ url: "https://dweb.link/api/v0" });


router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = fs.readFileSync(req.file.path);
        const result = await ipfs.add(file);
        fs.unlinkSync(req.file.path); // xóa file tạm

        res.json({
            success: true,
            cid: result.path,
            url: `https://ipfs.io/ipfs/${result.path}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
});

export default router;
