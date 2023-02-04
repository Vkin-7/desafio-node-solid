import request from "supertest";
import { v4 } from "uuid";

import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";
import { app } from "../server";

describe("[GET] /users", () => {
  it("should be able to list all users", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user1 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    usersRepository.turnAdmin(user1);

    const user2 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const user3 = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app)
      .get("/users")
      .set("user_id", user1.getId);

    expect(
      response.body.map((res) => ({
        ...res,
        created_at: new Date(res.created_at),
        updated_at: res.updated_at ? new Date(res.updated_at) : undefined,
      }))
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...user1, admin: true }),
        user2,
        user3,
      ])
    );
  });

  describe("[POST] /users", () => {
    it("should be able to create new users", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "John Doe",
          email: "john.doe@example.com",
        })
        .expect(201);

      expect(response.body).toMatchObject({
        name: "John Doe",
        email: "john.doe@example.com",
        admin: false,
      });
    });

    it("should not be able to create new users when email is already taken", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "John Doe",
          email: "john.doe@example.com",
        })
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("[PATCH] /users/:user_id/admin", () => {
    it("should be able to turn an user as admin", async () => {
      const usersRepository = UsersRepository.getInstance();

      const user = usersRepository.create({
        name: String(Math.random()),
        email: String(Math.random()),
      });

      const response = await request(app).patch(`/users/${user.getId}/admin`);

      expect(response.body).toMatchObject({
        name: user.getName,
        email: user.getEmail,
      });
      expect(response.body.admin).toBe(true);
    });

    it("should not be able to turn a non existing user as admin", async () => {
      const response = await request(app)
        .patch(`/users/${v4()}/admin`)
        .expect(404);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("[GET] /users/:user_id", () => {
    it("should be able to get user profile by ID", async () => {
      const usersRepository = UsersRepository.getInstance();

      const user = usersRepository.create({
        name: String(Math.random()),
        email: String(Math.random()),
      });

      const response = await request(app).get(`/users/${user.getId}`);

      const parsedResponse = {
        ...response.body,
        created_at: new Date(response.body.created_at),
        updated_at: response.body.updated_at
          ? new Date(response.body.updated_at)
          : undefined,
      };

      expect(parsedResponse).toMatchObject({
        ...user,
        created_at: user.getCreatedAt,
        updated_at: user.getUpdatedAt,
      });
    });

    it("should not be able to show profile of a non existing user", async () => {
      const response = await request(app).get(`/users/${v4()}`).expect(404);

      expect(response.body.error).toBeTruthy();
    });
  });

  it("should not be able to a non admin user get list of all users", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app)
      .get("/users")
      .set("user_id", user.getId)
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it("should not be able to a non admin user get list of all users", async () => {
    const usersRepository = UsersRepository.getInstance();

    const user = usersRepository.create({
      name: String(Math.random()),
      email: String(Math.random()),
    });

    const response = await request(app)
      .get("/users")
      .set("user_id", user.getId)
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it("should not be able to a non existing user get list of all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("user_id", v4())
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});
