export const getCasesController = {
  handler: async (request, h) => {
    const cursor = request.db
      .collection('cases')
      .find({}, { projection: { _id: 0 } })

    const caseRecords = await cursor.toArray()

    return h.response({ message: 'success', cases: caseRecords }).code(200)
  }
}
