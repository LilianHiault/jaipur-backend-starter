import request from "supertest"
import app from "../app"
import lodash from "lodash"
// import { createGame } from "../services/gameService"
import fs from "fs"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

// Prevent shuffle for tests
jest.mock("lodash")
lodash.shuffle.mockImplementation((array) => array)

describe("Game router", () => {
  test("should create a game", async () => {
    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "camel", "diamonds", "diamonds"],
      _deck: [
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
      ],
      _players: [
        {
          hand: ["diamonds", "diamonds", "diamonds", "diamonds", "gold"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 1, 2, 3, 1, 2, 3],
        4: [4, 6, 6, 4, 5, 5],
        5: [8, 10, 9, 8, 10],
      },
      isDone: false,
    }

    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })

  // test pour le get /games
  test("should list games", async () => {
    const rep = await request(app).get("/games").send({ name: "test" })
    expect(rep.statusCode).toBe(200)
  })

  // tests pour le get /games/id
  test("should list the game with the good id", async () => {
    fs.readFileSync.mockImplementation(() =>
      JSON.stringify([{ id: 1 }, { id: 2 }])
    )
    const rep = await request(app).get("/games/1").send({ name: "test" })
    expect(rep.statusCode).toBe(200)
    expect(rep.body).toStrictEqual({ id: 1 })
  })

  test("should send an error due to the id", async () => {
    const rep = await request(app).get("/games/-1").send({ name: "test" })
    expect(rep.statusCode).toBe(404)
  })

  // test pour le delete /games/id
  test("should delete the game with the good id", async () => {
    const rep = await (
      await request(app).delete("games/1")
    ).setEncoding({ name: "test" })
    expect(rep.statusCode).toBe(200)
  })
})
