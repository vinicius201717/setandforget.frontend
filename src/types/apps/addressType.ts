/* eslint-disable no-unused-vars */
export interface PostAddressResponseType {
  id: string
  userId: string
  address: string
  state: string
  city: string
  zipCode: number
  country: string
  createdAt: Date
  updatedA: Date
}

export interface PostAddressType {
  address: string
  state: string
  city: string
  zipCode: number
  country: string
}

export interface AddressListProps {
  address: PostAddressResponseType | null | undefined
  setAddress: (address: PostAddressResponseType | null | undefined) => void
}

export interface AddressListSetAddressesProps {
  setAddress: React.Dispatch<
    React.SetStateAction<PostAddressResponseType | null | undefined>
  >
}
