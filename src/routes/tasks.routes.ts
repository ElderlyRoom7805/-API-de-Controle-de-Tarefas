import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { DoesCategoryExist } from "../middlewares/doesCategoryExist";
import { ValidateBody } from "../middlewares/validateBody";
import { createTaskSchema } from "../schemas/createTask.schema";
import { DoesTaskExist } from "../middlewares/doesTaskExist";
import { editTaskSchema } from "../schemas/editTask.schema";
import { DoesTaskCategoryExist } from "../middlewares/doesTaskCategoryExist";
import { DoesQueryCategoryExist } from "../middlewares/doesQueryCategoryExist";

export const tasksRouter = Router();

const tasksController = new TasksControllers();

tasksRouter.post("/", ValidateBody.execute({body: createTaskSchema}), DoesTaskCategoryExist.execute, tasksController.createTask);

tasksRouter.get("/", DoesQueryCategoryExist.execute, tasksController.getTask);

tasksRouter.get("/:id", DoesTaskExist.execute, tasksController.getOneTask);

tasksRouter.patch("/:id", ValidateBody.execute({body: editTaskSchema}), DoesTaskExist.execute, DoesCategoryExist.execute, tasksController.editTask);

tasksRouter.delete("/:id", DoesTaskExist.execute, tasksController.deleteTask);