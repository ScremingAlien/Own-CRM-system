import type { Request, Response, NextFunction } from "express";

import todoService from "./todo.service.js";
import type { CreateTodoInput } from "./todo.validator.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class TodoController {
  private todoService = todoService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todos = await this.todoService.getAll();
      res.success("Get All Todos", todos, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  create = async (
    req: Request<{}, {}, CreateTodoInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title } = req.body;
      const newTodo = await this.todoService.create(title);

      res.success("New Todo Created Successfully", newTodo);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.todoService.delete(id);

      res.success("Todo Deleted Successfully");
    } catch (err) {
      next(err);
    }
  };
}
