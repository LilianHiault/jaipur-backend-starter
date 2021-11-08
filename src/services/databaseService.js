import fs from "fs"
import path from "path"

const DATABASE_FILE = path.join(__dirname, "../../storage/database.json")

// Read the file storage/database.json and return the parsed array of games.
export function getGames() {
  try {
    const file = fs.readFileSync(DATABASE_FILE)
    return JSON.parse(file)
  } catch (e) {
    return []
  }
}

// Save a game to storage/database.json
export function saveGame(game) {
  const games = getGames()
  const gameIndex = games.findIndex((g) => g.id === game.id)
  if (gameIndex >= 0) {
    games[gameIndex] = game
  } else {
    games.push(game)
  }
  try {
    fs.mkdirSync(path.dirname(DATABASE_FILE))
  } catch (e) {
    // Do nothing
  }
  fs.writeFileSync(path.join(DATABASE_FILE), JSON.stringify(games))
  return games
}

/*
export function DeleteGameById(id) {
  try{
    const file = fs.writeFileSync(DATABASE_FILE)
  } catch (e) {
    return[]
  }
  // const listGames = getGames()
  // const gameId = listGames.find((gameId) => gameId.id === id)
  const gameId = file.find((gameId) => gameId.id === id)
  delete gameId 
}
*/
