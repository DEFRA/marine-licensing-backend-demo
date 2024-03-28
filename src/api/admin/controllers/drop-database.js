export const dropDatabaseController = {
  handler: async (request, h) => {
    const { db } = request

    await db.collection('applications').deleteMany({})
    await db.collection('counters').deleteMany({})

    return h.response({ message: 'success' }).code(200)
  }
}
