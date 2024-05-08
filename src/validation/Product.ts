import Joi from "joi"

export const productValidat = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    value: Joi.number().greater(Joi.ref('productionCost')),
    productionCost: Joi.number(),
    photo: Joi.any(),
    size: Joi.any(),
    format: Joi.any(),
})