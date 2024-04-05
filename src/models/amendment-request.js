import joi from 'joi'
import { amendmentComment } from '~/src/models/amendment-comment'

export const amendmentRequest = joi.object({
  applicationId: joi.string().required(),
  title: amendmentComment,
  background: amendmentComment,
  applicant: joi.object({
    firstName: amendmentComment,
    lastName: amendmentComment,
    email: amendmentComment,
    address: amendmentComment
  }),
  site: joi.object({
    coordinates: amendmentComment
  })
})
