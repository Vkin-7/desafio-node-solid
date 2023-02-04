import { v4 as uuidV4 } from "uuid";

class User {
  constructor(
    private name: string,
    private email: string,
    private created_at: Date,
    private id: string = uuidV4(),
    private admin: boolean = false,
    private updated_at?: Date
  ) {}

  get getId(): string {
    return this.id;
  }

  get getEmail(): string {
    return this.name;
  }

  get getAdmin(): boolean {
    return this.admin;
  }

  set setAdmin(value: boolean) {
    this.admin = value;
  }
}

export { User };
