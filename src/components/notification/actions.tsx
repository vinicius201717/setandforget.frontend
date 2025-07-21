/* eslint-disable no-unused-vars */
import { ActionTypeEnum } from 'src/context/types'
import FriendShipNotification from './friendshipNotification'

type NotificationActionsProps = {
  action: ActionTypeEnum
  friendshipId: string
  notificationId: string
  status: 'ACCEPTED' | 'DECLINED' | 'PENDING'
}

const NotificationActions = ({
  action,
  friendshipId,
  notificationId,
  status,
}: NotificationActionsProps) => {
  const renderActionComponent = () => {
    switch (action) {
      case ActionTypeEnum.FRIENDSHIP:
        return (
          <FriendShipNotification
            friendshipId={friendshipId}
            notificationId={notificationId}
            status={status}
          />
        )
      case ActionTypeEnum.BLOCK:
        return <span>Blocked</span>
      default:
        return <span>Ação desconhecida</span>
    }
  }

  return <>{renderActionComponent()}</>
}

export default NotificationActions
