import request from "supertest"
import app from "../app"
import lodash from "lodash"
import * as databaseService from "../services/databaseService"
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
  test("Take a good from the market", async () => {
    // Read files
    fs.readFileSync.mockImplementation(() => {
      const game = {
        id: 1,
        name: "test",
        market: ["camel", "camel", "camel", "diamonds", "diamonds"],
        _deck: ["spice", "spice"],
        _players: [
          {
            hand: ["cloth", "cloth", "diamonds", "diamonds", "gold"],
          },
          {
            hand: ["gold", "gold", "gold", "gold", "gold"],
          },
        ],
        currentPlayerIndex: 0,
      }
      return JSON.stringify(game)
    })

    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "camel", "diamonds", "spice"],
      _deck: ["spice"],
      _players: [
        {
          hand: ["cloth", "cloth", "diamonds", "diamonds", "gold", "diamonds"],
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
    }

    // const responseSave = databaseService.saveGame(game)
    // console.log(responseSave)

    // const games = databaseService.getGames()
    // const currGame = games.find((game) => game.id === 1)
    // console.log(currGame)

    const response = await request(app)
      .put("/games/1/take-good")
      .send("diamonds")

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(expectedGame)
  })
})
