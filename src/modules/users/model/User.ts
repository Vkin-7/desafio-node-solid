import { v4 as uuidV4 } from "uuid";

class User {
  constructor(
    private name: string,
    private email: string,
    private created_at: Date,
    private updated_at?: Date,
    private id: string = uuidV4(),
    private admin: boolean = false
  ) {}

  get getId(): string {
    return this.id;
  }

  get getEmail(): string {
    return this.email;
  }

  get getName(): string {
    return this.name;
  }

  get getAdmin(): boolean {
    return this.admin;
  }

  set setAdmin(value: boolean) {
    this.admin = value;
  }

  get getCreatedAt(): Date {
    return this.created_at;
  }

  get getUpdatedAt(): Date {
    return this.updated_at;
  }

  set setUpdatedAt(value: Date) {
    this.updated_at = value;
  }
}

export { User };
