import { validate } from "uuid";

import { User } from "../../../modules/users/model/User";

describe("User model", () => {
  it("should be able to create an user with all props", () => {
    const user = new User(
      "Atlas",
      "atlas@fromspace.com",
      new Date(),
      new Date()
    );

    expect(user).toMatchObject({
      name: "Atlas",
      email: "atlas@fromspace.com",
      admin: false,
    });
    expect(validate(user.getId)).toBe(true);
    expect(user.getCreatedAt).toBeInstanceOf(Date);
    expect(user.getUpdatedAt).toBeInstanceOf(Date);
  });
});
