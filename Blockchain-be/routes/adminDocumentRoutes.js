import express from "express";
import {
  adminGetAllDocuments,
  adminGetDocumentById,
  adminUpdateStatus,
} from "../controllers/adminDocumentController.js";

// import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    console.log("🔥 HIT ROUTE: GET /api/admin/documents");
    next();
  },
  adminGetAllDocuments
);

router.get(
  "/:id",
  (req, res, next) => {
    console.log("🔥 HIT ROUTE: GET /api/admin/documents/:id");
    next();
  },
  adminGetDocumentById
);

router.put(
  "/:id/status",
  (req, res, next) => {
    console.log("🔥 HIT ROUTE: PUT /api/admin/documents/:id/status");
    next();
  },
  adminUpdateStatus
);

export default router;
