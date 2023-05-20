import { insuranceRepo } from "../../repository/insuranceRepo.js";
import { validator } from "../../util/validator.js";
import { INTERNAL_SERVER_ERROR_MESSAGE, INVALID_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } from "../../messages.js";
import { Insurance } from "../../model/Insurance.js";

const getAll = async (req, res) => {
    try {
        const insurances = await insuranceRepo.getInsurances();
        if (insurances.length === 0) {
            return res.status(404).send(NOT_FOUND_MESSAGE);
        }

        res.status(200).send(insurances);
    } catch (err) {
        console.error(`insuranceApiController::getAll: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const insurance = await insuranceRepo.getInsurance(id);
        if (!insurance) {
            return res.status(404).send(`${NOT_FOUND_MESSAGE} [${id}]`);
        }

        res.status(200).send(insurance);
    } catch (err) {
        console.error(`insuranceApiController::getOne: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const create = async (req, res) => {
    try {
        const { error, value } = validator.validateInsurance(req.body);
        if (error) {
            return res.status(400).send(`${INVALID_REQUEST_MESSAGE} ${error.message}`);
        }

        const { insured_id, start_date, end_date, premium_amount, coverage_details } = value;
        const insurance = new Insurance(
            insured_id, start_date, end_date, premium_amount, coverage_details
        );

        const result = await insuranceRepo.createInsurance(insurance);
        res.status(201).send(result);
    } catch (err) {
        console.error(`insuranceApiController::create: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const insurance = await insuranceRepo.getInsurance(id);
        if (!insurance) {
            return res.status(404).send(`${NOT_FOUND_MESSAGE} [${req.params.id}]`);
        }

        const validatedData = validateInsuranceData(req.body);
        const { insured_id, start_date, end_date, premium_amount, coverage_details } = validatedData;
        const updated = await insuranceRepo.updateInsurance(
            id,
            { insured_id, start_date, end_date, premium_amount, coverage_details }
        );
        res.status(200).send(updated);
    } catch (err) {
        console.error(`insuranceApiController::update: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await insuranceRepo.deleteInsurance(id);
        return res.sendStatus(200);
    } catch (err) {
        console.error(`insuranceApiController::remove: ${NOT_FOUND_MESSAGE} [${req.params.id}]`, err);
        return res.sendStatus(204);
    }
};

function validateInsuranceData(data) {
    const { error, value } = validator.validateInsurance(data);
    if (error) {
        throw new Error(`insuranceApiController::validateInsuranceData: ${INVALID_REQUEST_MESSAGE} ${error.message}`);
    }
    return value;
}

export const insuranceApiController = {
    getAll, getOne, create, update, remove
}