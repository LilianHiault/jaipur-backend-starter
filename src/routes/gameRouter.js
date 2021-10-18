import express from "express"
import * as gameService from "../services/gameService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  // TODO return 400 if req.body.name doesn't exist
  try {
    const newGame = gameService.createGame(req.body.name)
    res.status(201).json(newGame)
  } catch (err) {
    res.status(400).send("Missing name parameter")
  }
})

/ Get /games
// on ne met que "/games" car on a défini dans index.js que "/" signifie "/games"
router.get("/", function (req, res) {
  const listGame = databaseService.getGames()
  res.status(200).json(listGame)
})
/*
router.get(":id", function (req, res) {
  const Game = databaseService.getGames()
  // filter pour trouver le bon id
  const GameId = Game.filter(game => game.id === :id)
  if (GameId === null) {
    res.status(400).json("Game not found")
  } else {
    res.status(200).json(GameId)
  }
})
*/
export default router
