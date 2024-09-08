'use client'

import { useState, useEffect } from 'react'
import { ActionIcon, Box, Button, Group, Paper, Stack, Text, Title, Container } from '@mantine/core'
import CircularProgress from '@/components/Loading/CircularProgress'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'
import { ScoreCard } from '@/components/ScoreCard'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { fetchScore, fetchComputerMove, fetchGameResult } from '@/utils/aptos'

const MOVE = {
  // ROCK
  1: {
    value: 1,
    icon: <FaHandRock size={24} />
  },
  // PAPER
  2: {
    value: 2,
    icon: <FaHandPaper size={24} />
  },
  // SCISSORS
  3: {
    value: 3,
    icon: <FaHandScissors size={24} />
  }
}

const GAME_STATE = {
  gameOver: 0,
  startingGame: 1,
  awaitingPlayerMove: 2,
  submittingPlayerMove: 3
}

export default function Home () {
  const { account, connect, signAndSubmitTransaction, wallet } = useWallet()
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState(GAME_STATE.gameOver)
  const [gameResult, setGameResult] = useState(0)
  const [playerMove, setPlayerMove] = useState(0)
  const [computerMove, setComputerMove] = useState(0)

  useEffect(() => {
    fetchScore(account?.address)
      .then(setScore)
  }, [account])

  const startGame = async () => {
    try {
      await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::start_game`,
          typeArguments: [],
          functionArguments: []
        }
      })
      setGameState(GAME_STATE.awaitingPlayerMove)
      setPlayerMove(0)
      setGameResult(0)
      setComputerMove(0)
    } catch (err) {
      console.error(err)
      setGameState(GAME_STATE.gameOver)
    }
  }

  const savePlayerMove = async (playerMove) => {
    try {
      setGameState(GAME_STATE.submittingPlayerMove)
      await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::set_player_move`,
          typeArguments: [],
          functionArguments: [playerMove]
        }
      })
      setPlayerMove(playerMove)
      await Promise.all([
        fetchComputerMove(account.address).then(setComputerMove),
        fetchGameResult(account.address).then(setGameResult),
        fetchScore(account.address).then(setScore)
      ])
      setGameState(GAME_STATE.gameOver)
    } catch (err) {
      console.error(err)
      setGameState(GAME_STATE.awaitingPlayerMove)
    }
  }

  return (
    <Box 
      sx={(theme) => ({
        backgroundColor: theme.colors.yellow[3],
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      })}
    >
      <Container size="sm">
        <Stack spacing="xl" align="center">
          <Paper 
            shadow="sm" 
            p="xl" 
            radius="lg" 
            withBorder 
            mt={40}  // Added top margin here
            sx={(theme) => ({
              backgroundColor: theme.colors.orange[1],
              border: `4px solid ${theme.colors.orange[9]}`,
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.2)',
            })}
          >
            <Stack align="center" spacing="md">
              <Title 
                order={1} 
                align="center" 
                sx={(theme) => ({
                  color: theme.colors.orange[9],
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '2rem',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                })}
              >
                Rock Paper Scissors
              </Title>
              <Group gap="xl" mt="md">
                {Object.values(MOVE).map(({ value, icon }) => (
                  <ActionIcon
                    key={value}
                    size={60}
                    radius='xl'
                    variant="filled"
                    color="orange"
                    sx={{ boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.2)' }}
                  >
                    {icon}
                  </ActionIcon>
                ))}
              </Group>
            </Stack>
          </Paper>

          <ScoreCard score={score} />

          <CircularProgress isLoading={gameState === GAME_STATE.startingGame}>
            {gameState === GAME_STATE.gameOver && !account?.address && (
              <Button
                size="xl"
                onClick={async () => {
                  await connect(wallet?.name ?? 'Petra')
                }}
                sx={(theme) => ({
                  backgroundColor: theme.colors.green[6],
                  color: theme.white,
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '1rem',
                  padding: '20px 40px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: theme.colors.green[7],
                    transform: 'translate(2px, 2px)',
                    boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  },
                })}
              >
                Connect Wallet
              </Button>
            )}
            {gameState === GAME_STATE.gameOver && account?.address && (
              <Button
                size="xl"
                onClick={startGame}
                sx={(theme) => ({
                  backgroundColor: theme.colors.green[6],
                  color: theme.white,
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '1rem',
                  padding: '20px 40px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: theme.colors.green[7],
                    transform: 'translate(2px, 2px)',
                    boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  },
                })}
              >
                Start Game
              </Button>
            )}
          </CircularProgress>

          {gameState === GAME_STATE.awaitingPlayerMove && (
            <Paper 
              shadow="sm" 
              p="xl" 
              radius="lg" 
              withBorder
              sx={(theme) => ({
                backgroundColor: theme.colors.orange[1],
                border: `4px solid ${theme.colors.orange[9]}`,
                boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.2)',
              })}
            >
              <Stack spacing="md" align="center">
                <Title order={3} c="orange.9">Choose your move</Title>
                <Group>
                  {Object.values(MOVE).map(({ value, icon }) => (
                    <ActionIcon
                      key={value}
                      size={80}
                      radius='xl'
                      variant="filled"
                      color="orange"
                      disabled={gameState === GAME_STATE.submittingPlayerMove}
                      onClick={() => savePlayerMove(value)}
                      sx={{ boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)' }}
                    >
                      {icon}
                    </ActionIcon>
                  ))}
                </Group>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
