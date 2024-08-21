/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)
    const getRealCard = await cardModel.findOneByID(createdCard.insertedId)

    if (getRealCard) {
      await columnModel.pushCardOrderIds(getRealCard)
    }
    return getRealCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}
