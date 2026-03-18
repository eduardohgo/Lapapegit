import { Router } from "express";
import { adminHome } from "../../controllers/admin/admin.controller.js";
import { createBackup } from "../../controllers/admin/backup.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

router.get("/", authenticate, requireRole("admin", "administrador"), adminHome);
router.post(
  "/backups/create",
  authenticate,
  requireRole("admin", "administrador"),
  createBackup
);

export default router;