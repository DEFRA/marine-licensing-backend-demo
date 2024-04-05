export const dropDatabaseController = {
  handler: async (request, h) => {
    const { db } = request

    await db.collection('applications').deleteMany({})
    await db.collection('counters').deleteMany({})
    await db.collection('counters').insertOne({
      name: 'applicationId',
      counter: 1
    })
    await db.collection('amendment-requests').deleteMany({})

    return h.response({ message: 'success' }).code(200)
  }
}
