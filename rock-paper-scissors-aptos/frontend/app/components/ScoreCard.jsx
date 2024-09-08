import { Stack, Text } from '@mantine/core'

export function ScoreCard ({ score }) {
  return (
    <Stack>
      <Text fw={900}>Score</Text>
      <Text size='xl' fw={900} ta='center'>{score}</Text>
    </Stack>
  )
}
