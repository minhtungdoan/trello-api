import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { BoardRoute } from '~/routes/v1/boardRoute'

const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' })
})

Router.use('/boards', BoardRoute)

export const APIs_V1 = Router