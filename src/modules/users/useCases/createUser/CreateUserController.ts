import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    const result = this.createUserUseCase.execute({ name, email });

    return result ? response.status(201).send() : response.status(401).send();
  }
}

export { CreateUserController };
