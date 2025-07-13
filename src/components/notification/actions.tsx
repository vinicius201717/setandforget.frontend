/* eslint-disable no-unused-vars */
import { ActionTypeEnum } from 'src/context/types'
import FriendShipNotification from './friendshipNotification'

type NotificationActionsProps = {
  action: ActionTypeEnum
  friendshipId: string
}

const NotificationActions = ({
  action,
  friendshipId,
}: NotificationActionsProps) => {
  const renderActionComponent = () => {
    switch (action) {
      case ActionTypeEnum.FRIENDSHIP:
        return <FriendShipNotification friendshipId={friendshipId} />
      case ActionTypeEnum.BLOCK:
        return <span>Blocked</span>
      default:
        return <span>Ação desconhecida</span>
    }
  }

  return <>{renderActionComponent()}</>
}

export default NotificationActions
