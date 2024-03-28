import joi from 'joi'

export const amendmentComment = joi.object({
  originalValue: joi.string(),
  comment: joi.string()
})
