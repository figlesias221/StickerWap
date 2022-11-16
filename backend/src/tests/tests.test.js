const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { userOne, setupDatabase } = require("./db");

describe("Signup-Login-Logout-Stickers", () => {
  beforeEach(setupDatabase);

  test("Should signup a new user", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        name: "eeeeee",
        email: "eeusu@eeew.com",
        password: "23432213213@@",
        region: "URU",
      })
      .expect(201);
  });

  test("Should not signup a new user with invalid email", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        name: "eeeeee",
        email: "eeusu@e123123eew",
        password: "myh2131231oeeee",
      })
      .expect(400);
  });

  test("Should not signup a new user with missing fields", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        name: "eeeeee",
        email: "eeusu@e123123eew",
      })
      .expect(400);
  });

  test("Should login existing user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test("Should not login nonexistent user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: "thisisnotmypassword",
      })
      .expect(400);
  });

  test("Should get profile for user", async () => {
    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should modify user", async () => {
    await request(app)
      .put("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: "pepe",
      })
      .expect(200);
  });

  test("Should not login with inexistent user", async () => {
    await request(app)
      .get("/users/login")
      .send({
        email: "ll@ll.com",
        password: "123123123",
      })
      .expect(404);
  });

  test("Should not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
  });

  test("Should logout user", async () => {
    await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should not logout user", async () => {
    await request(app).post("/users/logout").send().expect(401);
  });
  test("Should get all stickers", async () => {
    await request(app)
      .get("/stickers")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should create sticker", async () => {
    await request(app)
      .post("/stickers/1")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should delete sticker", async () => {
    await request(app)
      .post("/stickers/1")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    await request(app)
      .delete("/stickers/1")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Should not delete sticker", async () => {
    await request(app)
      .delete("/stickers/1")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(400);
  });
});
