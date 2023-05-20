import { insuredRepo } from "../../repository/insuredRepo.js";
import { validator } from "../../util/validator.js";
import { INTERNAL_SERVER_ERROR_MESSAGE, INVALID_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } from "../../messages.js";
import { Insured } from "../../model/Insured.js";

const getAll = async (req, res) => {
    try {
        const insureds = await insuredRepo.getInsureds();
        if (insureds.length === 0) {
            return res.status(404).send(NOT_FOUND_MESSAGE);
        }

        res.status(200).send(insureds);
    } catch (err) {
        console.error(`insuredApiController::getAll: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const insured = await insuredRepo.getInsured(id)
        if (!insured) {
            return res.status(404).send(`${NOT_FOUND_MESSAGE} [${id}]`);
        }

        res.status(200).send(insured);
    } catch (err) {
        console.error(`insuredApiController::getOne: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const create = async (req, res) => {
    try {
        const { error, value } = validator.validateInsured(req.body);
        if (error) {
            return res.status(400).send(`${INVALID_REQUEST_MESSAGE} ${error.message}`);
        }

        const { name, email, insuredType } = value;
        const insured = new Insured(name, email, insuredType);

        const result = await insuredRepo.createInsured(insured);
        res.status(201).send(result);
    } catch (err) {
        console.error(`insuredApiController::create: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const insured = await insuredRepo.getInsured(id);
        if (!insured) {
            return res.status(404).send(`${NOT_FOUND_MESSAGE} [${req.params.id}]`);
        }

        const validatedData = validateInsuredData(req.body);
        const { name, email, insuredType } = validatedData;
        const updated = await insuredRepo.updateInsured(id, { name, email, insuredType });
        res.status(200).send(updated);
    } catch (err) {
        console.error(`insuredApiController::update: ${err}`);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await insuredRepo.deleteInsured(id);
        return res.sendStatus(202);
    } catch (err) {
        console.error(`insuredApiController::remove: ${NOT_FOUND_MESSAGE} [${req.params.id}]`, err);
        return res.sendStatus(204);
    }
};

function validateInsuredData(data) {
    const { error, value } = validator.validateInsured(data);
    if (error) {
        throw new Error(`insuredApiController::validateInsuredData: ${INVALID_REQUEST_MESSAGE} ${error.message}`);
    }
    return value;
}

export const insuredApiController = {
    getAll, getOne, create, update, remove
}