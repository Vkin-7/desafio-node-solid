import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    try {
      const user = this.usersRepository.findById(user_id);

      if (user && user.getAdmin) {
        return this.usersRepository.list();
      }

      throw new Error("User non exists or user not is admin");
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { ListAllUsersUseCase };
