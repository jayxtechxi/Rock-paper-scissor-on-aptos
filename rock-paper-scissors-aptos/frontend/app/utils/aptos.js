import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

const config = new AptosConfig({
  network: Network.TESTNET
})

const aptos = new Aptos(config)

/**
 * fetch score for an account
 * @param {string} address
 * @returns {number} score
 */
export const fetchScore = async (address) => {
  let score = 0
  try {
    if (address) {
      ([score] = await aptos.view({
        payload: {
          function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::get_player_score`,
          type_arguments: [],
          functionArguments: [address]
        }
      }))
    }
  } catch (err) {
    console.error(err)
  }
  return score
}

/**
 * fetch computer move for the last game
 * @param {string} address
 * @returns {number} computer move
 */
export const fetchComputerMove = async (address) => {
  try {
    const [computerMove] = await aptos.view({
      payload: {
        function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::get_computer_move`,
        typeArguments: [],
        functionArguments: [address]
      }
    })
    return computerMove
  } catch (err) {
    console.error(err)
  }
}

/**
 * fetch result of last game
 * @param {string} address
 * @returns {number} game result
 */
export const fetchGameResult = async (address) => {
  try {
    const [gameResult] = await aptos.view({
      payload: {
        function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::get_game_result`,
        typeArguments: [],
        functionArguments: [address]
      }
    })
    return gameResult
  } catch (err) {
    console.error(err)
  }
}
