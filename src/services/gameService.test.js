import * as gameService from "./gameService"

// TODO: Mock lodash shuffle

describe("Game service", () => {
  test("should put camels from hand to herd", () => {
    const game = {
      _players: [
        { hand: ["camel", "camel", "camel", "camel", "camel"], camelsCount: 0 },
        {
          hand: ["gold", "diamonds", "spice", "spice", "leather"],
          camelsCount: 0,
        },
      ],
    }
    gameService.putCamelsFromHandToHerd(game)
    expect(game._players[0].hand.length).toBe(0)
    expect(game._players[0].camelsCount).toBe(5)
    expect(game._players[1].camelsCount).toBe(0)
    expect(game._players[1].hand.length).toBe(5)
    expect(game._players[1].hand).toStrictEqual([
      "gold",
      "diamonds",
      "spice",
      "spice",
      "leather",
    ])
  })

  test("should init a deck", () => {
    const deck = gameService.initDeck()
    expect(deck.filter((card) => card === "diamonds").length).toBe(6)
    expect(deck.filter((card) => card === "gold").length).toBe(6)
    expect(deck.filter((card) => card === "silver").length).toBe(6)
    expect(deck.filter((card) => card === "cloth").length).toBe(8)
    expect(deck.filter((card) => card === "spice").length).toBe(8)
    expect(deck.filter((card) => card === "leather").length).toBe(10)
    expect(deck.filter((card) => card === "camel").length).toBe(11 - 3)
    expect(deck.length).toBe(55 - 3)
  })
  test("should draw 2 cards in deck", () => {
    const deck = ["diamonds", "gold", "spice", "spice"]
    const cards = gameService.drawCards(deck, 2)
    expect(cards).toStrictEqual(["diamonds", "gold"])
    expect(cards.length).toBe(2)
  })
  // More tests : 1 card, 0 cards, empty deck, ...
})
