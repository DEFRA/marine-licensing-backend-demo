export const getAmendmentRequestController = {
  handler: async (request, h) => {
    const {
      db,
      params: { prefix, year, sequenceNumber }
    } = request

    const amendmentRequest = await db.collection('amendment-requests').findOne({
      applicationId: { $eq: `${prefix}/${year}/${sequenceNumber}` }
    })

    return h.response({ message: 'success', value: amendmentRequest }).code(200)
  }
}
