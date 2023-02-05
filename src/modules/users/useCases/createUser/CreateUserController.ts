import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;

      if (!name || !email) {
        return response
          .status(400)
          .send({ error: "Name and Email is required!" });
      }

      const result = this.createUserUseCase.execute({ name, email });

      return response.status(201).send(result);
    } catch (error) {
      const { message } = error;
      return response.status(400).send({ error: message });
    }
  }
}

export { CreateUserController };
