import { createLogger } from '~/src/helpers/logging/logger'
import { fetchApplicants } from '~/src/helpers/db/fetch-applicants'
import { fetchApplications } from '~/src/helpers/db/fetch-applications'
import { fetchSites } from '~/src/helpers/db/fetch-sites'
import { fetchCounters } from '~/src/helpers/db/fetch-counters'

const logger = createLogger()

async function insertData(entities, newEntities) {
  await entities.insertMany(newEntities)
  logger.info(`Inserted ${newEntities.length} ${typeof entities}`)
}

async function populateApi(mongo, db) {
  try {
    const session = mongo.startSession()
    session.startTransaction()

    if ((await db.collection('applicants').count()) === 0) {
      const applicants = db.collection('applicants')
      const newApplicants = await fetchApplicants()
      await insertData(applicants, newApplicants)
    }

    if ((await db.collection('applications').count()) === 0) {
      const applications = db.collection('applications')
      const newApplications = await fetchApplications()
      await insertData(applications, newApplications)
    }

    if ((await db.collection('counters').count()) === 0) {
      const counters = db.collection('counters')
      const newCounters = await fetchCounters()
      await insertData(counters, newCounters)
    }

    if ((await db.collection('sites').count()) === 0) {
      const sites = db.collection('sites')
      const newSites = await fetchSites()
      await insertData(sites, newSites)
    }

    await session.commitTransaction()
    logger.info('Completed data population')
  } catch (error) {
    logger.error(error)
  }
}

export { populateApi }
