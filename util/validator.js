import Joi from "joi";
import insuredType from "../enum/insuredType.js";

const validateInsured = insured => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        insuredType: Joi.equal(insuredType.INSURED, insuredType.POLICY_HOLDER)
    });
    return schema.validate(insured);
};

const validateInsurance = insurance => {
    const schema = Joi.object({
        insured_id: Joi.string().allow(null).empty('').default(null),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        premium_amount: Joi.number().required(),
        coverage_details: Joi.string().allow(null).empty('')
    });
    return schema.validate(insurance);
};

export const validator = {
    validateInsured, validateInsurance
}