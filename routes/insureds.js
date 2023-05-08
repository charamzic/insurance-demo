const express = require('express');
const router = express.Router();
const Joi = require("joi");

const insureds = [
    { id: 1, name: 'Petr', },
    { id: 2, name: 'Jan', },
    { id: 3, name: 'Lucie', }
];

router.get('/', (req, res) => {
    if (!insureds || insureds.length <= 0) {
        return res.status(404).send(`List of insured not available.`);
    }
    res.send(insureds);
});

router.get('/:id', (req, res) => {
    const insured = insureds.find(i => i.id === parseInt(req.params.id));
    if (!insured) {
        return res.status(404).send(`Insured with given id [${req.params.id}] was not found.`);
    }
    res.send(insured);
});

router.post('/', (req, res) => {
    const { error, value } = validateInsured(req.body);
    if (error) {
        return res.status(400).send(`Invalid Request: ${error.message}`);
    }

    const insured = {
        id: insureds.length + 1,
        name: value.name
    };

    insureds.push(insured);
    res.send(insured);
});

router.put('/:id', (req, res) => {
    const insured = insureds.find(i => i.id === parseInt(req.params.id));
    if (!insured) {
        return res.status(404).send(`Insured with given id [${req.params.id}] was not found.`);
    }

    const { error, value } = validateInsured(req.body);
    if (error) {
        return res.status(400).send(`Invalid Request: ${error.message}`);
    }

    insured.name = value.name;
    res.send(insured);
});

router.delete('/:id', (req, res) => {
    const insured = insureds.find(i => i.id === parseInt(req.params.id));
    if (!insured) {
        return res.status(404).send(`Insured with given id [${req.params.id}] was not found.`);
    }

    const index = insureds.indexOf(insured);
    insureds.splice(index, 1);

    res.send(insured);
});

function validateInsured(insured) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(insured);
}

module.exports = router;