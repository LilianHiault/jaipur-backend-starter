import express from "express"
import * as gameService from "../services/gameService"
import * as databaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  try {
    const newGame = gameService.createGame(req.body.name)
    res.status(201).json(newGame)
  } catch (err) {
    res.status(400).send("Missing name parameter")
  }
})

// Get /games
// on ne met que "/" car on a défini dans index.js que "/" signifie "/games"
router.get("/", function (req, res) {
  const listGame = databaseService.getGames()
  // const listGame = databaseService.findGames()
  res.status(200).json(listGame)
})

// Get /games/id
router.get("/:id", function (req, res) {
  const games = databaseService.getGames()
  // const games = databaseService.findGamesById()
  const gameId = Number.parseInt(req.params.id)
  // filter pour trouver le bon id
  const game = games.find((game) => game.id === gameId)
  if (!game) {
    res.status(404).json("Game not found")
  } else {
    res.status(200).json(game)
  }
})

// Delete  /games/id
/*
router.delete("/:id", function (req, res) {
  const games = databaseService.getGames()
  const gameId = Number.parseInt(req.params.id)
  const game = games.find((game) => game.id === gameId)
  if (!game) {
    res.status(404).json("partie non trouvée")
  } else {
    delete databaseService.game
    res.status(200).json("partie supprimée")
  }
})
*/

/*
router.delete("/:id", function (req, res) {
  const valid = databaseService.DeleteGameById()
  if (!valid) {
    res.status(404).json("cette partie n'existe pas")
  } else {
    res.status(200).json("partie supprimée")
  }
})
*/

export default router
