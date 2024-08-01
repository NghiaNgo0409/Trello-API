/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'

const START_SERVER = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', (req, res) => {
    // Test Absolute import mapOrder
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, I am running at ${hostname}:${port}/`)
  })

  exitHook(() => {
    console.log('4. Closing Database......')
    CLOSE_DB()
    console.log('5. Database closed')
  })
}

;(async () => {
  try {
    console.log('1. Connecting to Database......')
    await CONNECT_DB()
    console.log('2. Connected to Database')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
