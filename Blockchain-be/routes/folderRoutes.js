import express from "express";
import {
  getAllFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.get("/", getAllFolders); // GET  /api/folders
router.get("/:id", getFolderById); // GET  /api/folders/:id
router.post("/", createFolder); // POST /api/folders
router.put("/:id", updateFolder); // PUT  /api/folders/:id
router.delete("/:id", deleteFolder); // DELETE /api/folders/:id

export default router;
