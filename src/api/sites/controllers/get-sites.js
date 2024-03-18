export const getSitesController = {
  handler: async (request, h) => {
    const cursor = request.db
      .collection('sites')
      .find({}, { projection: { _id: 0 } })

    const sites = await cursor.toArray()

    return h.response({ message: 'success', sites }).code(200)
  }
}
