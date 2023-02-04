import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    try {
      const userAlreadyExists = this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("Cannot create a new user when email is already taken");
      }

      return this.usersRepository.create({ email, name });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { CreateUserUseCase };
