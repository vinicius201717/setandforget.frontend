import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const ChessBoardComponent = dynamic(
  () => import('../../../components/chess/ChessBoardComponent'),
  { ssr: false },
)

const ChessPlay: React.FC = () => {
  const router = useRouter()
  const { chessRoomId } = router.query

  return <ChessBoardComponent chessRoomId={chessRoomId as string} />
}

export default ChessPlay
