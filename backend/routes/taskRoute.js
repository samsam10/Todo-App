import express from "express"
import { addTask, getTask, removeTask, updateTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask",requireAuth, getTask)
router.get("/removeTask",requireAuth, removeTask)
router.put("/updateTask", requireAuth, updateTask)

export default router;