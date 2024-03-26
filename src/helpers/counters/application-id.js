export const generateApplicationId = async (db) => {
  const year = new Date().getFullYear()

  const { counter } = await db.collection('counters').findOneAndUpdate(
    {
      name: 'applicationId'
    },
    { $inc: { counter: 1 } },
    { upsert: true, returnNewDocument: true }
  )

  return `MLA/${year}/${counter.toString().padStart(5, '0')}`
}
