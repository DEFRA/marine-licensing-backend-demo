import { amendmentRequest } from '~/src/models/amendment-request'

export const putAmendmentRequestController = {
  options: {
    validate: {
      payload: amendmentRequest
    }
  },
  handler: async (request, h) => {
    const {
      db,
      params: { prefix, year, sequenceNumber },
      payload
    } = request

    await db
      .collection('amendment-requests')
      .findOneAndReplace(
        { applicationId: { $eq: `${prefix}/${year}/${sequenceNumber}` } },
        { ...payload },
        { upsert: true }
      )

    return h.response({ message: 'success' }).code(200)
  }
}
