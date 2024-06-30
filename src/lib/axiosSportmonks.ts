import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.SPORTMONKS_URL)

export const apiSportmonks = axios.create({
  baseURL: process.env.SPORTMONKS_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.SPORTMONKS_TOKEN,
  },
})
