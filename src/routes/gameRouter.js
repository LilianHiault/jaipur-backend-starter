import express from "express"
import * as gameService from "../services/gameService"
import * as databaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  // Return 400 if req.body.name doesn't exist
  try {
    const newGame = gameService.createGame(req.body.name)
    res.status(201).json(newGame)
  } catch (err) {
    res.status(400).send("Missing name parameter")
  }
})

router.put("/:id/take-good", function (req, res) {
  /* Return 200 if player can take good
    403 if he has 7 cards or if it's not his turn
    404 if the game id doesn't exist
  */
  const games = databaseService.getGames()
  const currGame = games.find((game) => game.id === req.body.id)
  if (currGame) {
    if (currGame.currentPlayerIndex === req.body.playerIndex) {
      if (currGame._players[req.body.playerIndex].hand.length < 8) {
        gameService.takeGood(
          currGame,
          req.body.playerIndex,
          req.body.takeGoodPayload
        )
      } else {
        req.status(403).send("The hand's size can't exceed 7 cards")
      }
    } else {
      res.status(403).send("It's not this player's turn")
    }
  } else {
    res.status(404).send("Invalid game id")
  }
})

export default router
