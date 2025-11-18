import express from "express";
import { getAdminReport } from "../controllers/adminReportController.js";
import { adminUpdateStatus } from "../controllers/documentController.js";

const router = express.Router();

router.get("/report", getAdminReport);
router.put("/documents/:id/status", adminUpdateStatus);

export default router;
