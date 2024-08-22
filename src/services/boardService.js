/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)
    const getRealBoard = await boardModel.findOneByID(createdBoard.insertedId)
    console.log(getRealBoard)
    return getRealBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    const resBoard = cloneDeep(board)
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => column._id.toString() === card.columnId.toString()
      )
    })

    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update
}
