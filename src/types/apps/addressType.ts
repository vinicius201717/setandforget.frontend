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
  addresses: PostAddressResponseType[]
  setAddresses: (addresses: PostAddressResponseType[]) => void
}

export interface AddressListSetAddressesProps {
  setAddresses: React.Dispatch<React.SetStateAction<PostAddressResponseType[]>>
}
