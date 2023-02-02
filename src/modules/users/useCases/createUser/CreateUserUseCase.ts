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
      return this.usersRepository.create({ email, name });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export { CreateUserUseCase };
