import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

type IngredientResponse = {
  message: string;
  ingredient: {
    id: string;
    name: string;
    measure: string;
    amount: number;
    amount_max: number;
    amount_min: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

describe("POST - /ingredients", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/super").send({
      name: "testaurant",
      email: "admin@email.com",
      phone: "+55061940028922",
      password: "admin123",
    });
  });

  const mockIngredient = {
    name: "cenoura",
    measure: "kg",
    amount: 50,
    amountMax: 100,
    amountMin: 15,
  };

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create an ingredient", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin123",
    });

    const createIngredientResponse = await request(app)
      .post("/ingredients")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockIngredient);

    console.log("ingredient body: ", createIngredientResponse.body);

    expect(createIngredientResponse.status).toBe(201);
    expect(createIngredientResponse.body).toMatchObject<IngredientResponse>({
      message: "Ingredient created",
      ingredient: {
        ...createIngredientResponse.body.ingredient,
        ...mockIngredient,
      },
    });
  });
  it("Should not be able to create an ingredient without sending accessLevel 1 or 2", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin123",
    });

    const withoutAccessUser = await request(app)
      .post("/employees")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        name: "John doe",
        email: "johndoe@email.com",
        phone: "999999999999",
        password: "12345678",
        accessLevel: 3,
      });

    const withoutAccessLogin = await request(app).post("/sessions").send({
      email: "johndoe@email.com",
      password: "12345678",
    });

    const createIngredientResponse = await request(app)
      .post("/ingredients")
      .set("Authorization", `Bearer ${withoutAccessLogin.body.token}`)
      .send({
        name: "Batata",
        measure: "kg",
        amount: 50,
        amountMax: 100,
        amountMin: 15,
      });

    expect(createIngredientResponse.status).toBe(401);
    expect(createIngredientResponse.body).toEqual(
      expect.objectContaining({
        message: "Unauthorized",
      })
    );
  });
  it("Should not be able to create an ingredient with repeated name", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin123",
    });

    const createIngredientResponse = await request(app)
      .post("/ingredients")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockIngredient);

    expect(createIngredientResponse.status).toBe(409);
    expect(createIngredientResponse.body).toEqual(
      expect.objectContaining({
        message: "Ingredient already exists, add to its amount instead",
      })
    );
  });
});
