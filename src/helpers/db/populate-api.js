import { createLogger } from '~/src/helpers/logging/logger'
import { fetchApplications } from '~/src/helpers/db/fetch-applications'
import { fetchCounters } from '~/src/helpers/db/fetch-counters'
import { fetchAmendmentRequests } from '~/src/helpers/db/fetch-amendment-requests'

const logger = createLogger()

async function insertData(entities, newEntities) {
  await entities.insertMany(newEntities)
  logger.info(`Inserted ${newEntities.length} ${typeof entities}`)
}

async function populateApi(mongo, db) {
  try {
    const session = mongo.startSession()
    session.startTransaction()

    if ((await db.collection('applications').count()) === 0) {
      const applications = db.collection('applications')
      const newApplications = await fetchApplications()
      await insertData(applications, newApplications)
    }

    if ((await db.collection('amendment-requests').count()) === 0) {
      const amendmentRequests = db.collection('amendment-requests')
      const newAmendmentRequests = await fetchAmendmentRequests()
      await insertData(amendmentRequests, newAmendmentRequests)
    }

    if ((await db.collection('counters').count()) === 0) {
      const counters = db.collection('counters')
      const newCounters = await fetchCounters()
      await insertData(counters, newCounters)
    }

    await session.commitTransaction()
    logger.info('Completed data population')
  } catch (error) {
    logger.error(error)
  }
}

export { populateApi }
