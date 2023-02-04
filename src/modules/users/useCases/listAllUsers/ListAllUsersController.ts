import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const user_id = request.get("user_id") as string;
    const result = this.listAllUsersUseCase.execute({ user_id });

    return response.status(200).send(result);
  }
}

export { ListAllUsersController };
