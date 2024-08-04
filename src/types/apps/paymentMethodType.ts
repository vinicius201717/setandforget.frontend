import { PostAddressResponseType } from './addressType'

export interface PaymentMethodCardProps {
  address: PostAddressResponseType | null | undefined
  scrollToBillingAddress: () => void
}
