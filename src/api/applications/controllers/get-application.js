export const getApplicationController = {
  handler: async (request, h) => {
    const { params, db } = request

    const applicationId = `${params.prefix}/${params.year}/${params.sequenceNumber}`

    const result = await db
      .collection('applications')
      .findOne(
        { applicationId: { $eq: applicationId } },
        { projection: { _id: 0 } }
      )

    return h.response({ message: 'success', value: result }).code(200)
  }
}
