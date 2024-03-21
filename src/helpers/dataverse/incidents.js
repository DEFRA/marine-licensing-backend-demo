import { Wreck } from '@hapi/wreck'
import { config } from '~/src/config'
import { getHeaders } from '~/src/helpers/dataverse'

export const getIncidentsByContact = async (token, contactId) => {
  const { payload } = await Wreck.get(
    `${config.get('dataverseApiUrl')}/incidents?$filter=contains(contactid, '${contactId}')`,
    {
      headers: await getHeaders(token)
    }
  )

  return JSON.parse(payload).value.map((incident) => ({
    number: incident.ticketnumber,
    title: incident.title,
    link: `${config.get('dynamicsUrl')}/main.aspx?appid=${config.get('dynamicsAppId')}&pagetype=entityrecord&etn=incident&id=${incident.incidentid}`
  }))
}
