/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware for handling error
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello, I am ${env.AUTHOR} running at http://${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  exitHook(() => {
    console.log(' Closing database connection...')
    CLOSE_DB()
    console.log('Database connection closed')
  })
}

(async () => {
  try {
    console.log('Connecting to database...')
    await CONNECT_DB()
    console.log('Connected to database')

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit()
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to database'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.log(error)
//     process.exit()
//   })

