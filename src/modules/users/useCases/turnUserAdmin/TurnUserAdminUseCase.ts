import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    try {
      const user = this.usersRepository.findById(user_id);

      if (user) {
        return this.usersRepository.turnAdmin(user);
      }

      return null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export { TurnUserAdminUseCase };
