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

    const applicationId = `${prefix}/${year}/${sequenceNumber}`

    await db
      .collection('amendment-requests')
      .findOneAndReplace(
        { applicationId: { $eq: applicationId } },
        { ...payload },
        { upsert: true }
      )

    await db
      .collection('applications')
      .updateOne(
        { applicationId },
        { $set: { applicationStatus: 'amendment-requested' } }
      )

    return h.response({ message: 'success' }).code(200)
  }
}
