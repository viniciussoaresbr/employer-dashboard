import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { employeeController } from "../controllers/employee.controller";
import { fileController } from "../controllers/file.controller";
import { userController } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth";
import { upload } from "../middlewares/file";

const router = Router();

router.post("/users", userController.save);
router.get("/users/:userId", authToken, userController.findUserById);
router.post("/auth", authController.auth);
router.post("/employees", authToken, employeeController.save);
router.get("/employees", authToken, employeeController.findAll);
router.post(
  "/upload",
  authToken,
  upload("./src/images", "avatar"),
  fileController.uploadAvatar
);
router.get("/download/:id", fileController.download);

export { router };
