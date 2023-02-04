import { validate } from "uuid";

import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";

describe("UsersRepository", () => {
  let usersRepository: UsersRepository;

  beforeAll(() => {
    usersRepository = UsersRepository.getInstance();
  });

  it("should be able to create new users", () => {
    const user = usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    expect(user).toMatchObject({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
      admin: false,
    });
    expect(validate(user.getId)).toBe(true);
    expect(user.getCreatedAt).toBeInstanceOf(Date);
  });

  it("should be able to list all users", () => {
    const user = usersRepository.create({
      name: "Danilo Vieira",
      email: "danilo@rocketseat.com",
    });

    const users = usersRepository.list();

    expect(users).toStrictEqual(expect.arrayContaining([user]));
  });

  it("should be able to find user by ID", () => {
    const user = usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const findUser = usersRepository.findById(user.getId);

    expect(findUser).toMatchObject({
      name: user.getName,
      email: user.getEmail,
      admin: false,
    });
    expect(validate(findUser.getId)).toBe(true);
    expect(findUser.getCreatedAt).toBeInstanceOf(Date);
  });

  it("should be able to find user by e-mail address", () => {
    const user = usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const findUser = usersRepository.findByEmail(user.getEmail);

    expect(findUser).toMatchObject({
      name: user.getName,
      email: user.getEmail,
      admin: false,
    });
    expect(validate(findUser.getId)).toBe(true);
    expect(findUser.getCreatedAt).toBeInstanceOf(Date);
  });

  it("should be able to turn an user as admin", () => {
    const user = usersRepository.create({
      name: "Vinicius Fraga",
      email: "vinifraga@rocketseat.com",
    });

    const admin = usersRepository.turnAdmin(user);

    expect(admin).toMatchObject({
      name: user.getName,
      email: user.getEmail,
      admin: true,
    });
    expect(validate(admin.getId)).toBe(true);
    expect(admin.getCreatedAt).toBeInstanceOf(Date);
    expect(admin.getUpdatedAt).toBeInstanceOf(Date);
  });
});
