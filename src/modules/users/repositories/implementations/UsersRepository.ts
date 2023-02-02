import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User(name, email, new Date());

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.getId === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.getEmail === email);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.getId === receivedUser.getId
    );

    if (userIndex !== -1) {
      this.users[userIndex].setAdmin = true;

      return receivedUser;
    }

    return null;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
