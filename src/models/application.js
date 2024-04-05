import joi from 'joi'

export const application = joi.object({
  applicationId: joi.string(),
  title: joi.string().required().allow(''),
  background: joi.string().required().allow(''),
  applicant: joi.object({
    firstName: joi.string().required().allow(''),
    lastName: joi.string().required().allow(''),
    email: joi
      .string()
      .required()
      .email({ tlds: { allow: false } })
      .allow(''),
    address: joi.string().allow('')
  }),
  site: joi.object({
    coordinates: joi.string().allow('')
  })
})
