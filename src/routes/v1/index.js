/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoute'
import { cardRoutes } from './cardRoute'
import { columnRoutes } from './columnRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: 'APIs V1 are ready to use.', code: StatusCodes.OK })
})

// Board APIs
Router.use('/boards', boardRoutes)

// Column APIs
Router.use('/columns', columnRoutes)

// Card APIs
Router.use('/cards', cardRoutes)

export const APIs_V1 = Router
