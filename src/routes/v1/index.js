import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' })
})

// Boards
Router.use('/boards', boardRoute)
// Columns
Router.use('/columns', columnRoute)
// Cards
Router.use('/cards', cardRoute)



export const APIs_V1 = Router