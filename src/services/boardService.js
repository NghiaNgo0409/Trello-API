/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { boardModel } from '~/models/boardModel'
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

export const boardService = {
  createNew
}
