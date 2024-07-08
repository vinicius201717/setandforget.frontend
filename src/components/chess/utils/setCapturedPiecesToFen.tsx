const countPieces = (fen: string) => {
  const counts: { [key: string]: number } = {
    p: 0,
    r: 0,
    n: 0,
    b: 0,
    q: 0,
    k: 0,
    P: 0,
    R: 0,
    N: 0,
    B: 0,
    Q: 0,
    K: 0,
  }
  for (const char of fen) {
    if (counts[char] !== undefined) {
      counts[char]++
    }
  }
  return counts
}

export const getCapturedPieces = (currentFen: string) => {
  const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  const initialCounts = countPieces(
    initialFen.replace(/\/|[0-9]| [w|b] .+$/g, ''),
  )
  const currentCounts = countPieces(
    currentFen.replace(/\/|[0-9]| [w|b] .+$/g, ''),
  )

  const captured: string[] = []
  for (const piece in initialCounts) {
    const difference = initialCounts[piece] - currentCounts[piece]
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        captured.push(piece)
      }
    }
  }

  return captured
}
