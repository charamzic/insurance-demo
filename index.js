const Joi = require('joi');
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());

const insuredList = [
    { id: 1, name: 'Petr', },
    { id: 2, name: 'Jan', },
    { id: 3, name: 'Lucie', }
];

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/insured', (req, res) => {
    if (!insuredList || insuredList.length >= 0) {
        return res.status(404).send(`List of insured not available.`);
    }
    res.send(insuredList);
});

app.get('/api/insured/:id', (req, res) => {
    const insured = insuredList.find(i => i.id === parseInt(req.params.id));
    if (!insured) {
        return res.status(404).send(`Insured with given id [${req.params.id}] was not found.`);
    }
    res.send(insured);
});

app.post('/api/insured', (req, res) => {
    const { error, value } = validateInsured(req.body);
    if (error) {
        return res.status(400).send(`Invalid Request: ${error.message}`);
    }

    const insured = {
        id: insuredList.length + 1,
        name: value.name
    };

    insuredList.push(insured);
    res.send(insured);
});

app.put('/api/insured/:id', (req, res) => {
    const insured = insuredList.find(i => i.id === parseInt(req.params.id));
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

app.delete('/api/insured/:id', (req, res) => {
    const insured = insuredList.find(i => i.id === parseInt(req.params.id));
    if (!insured) {
        return res.status(404).send(`Insured with given id [${req.params.id}] was not found.`);
    }

    const index = insuredList.indexOf(insured);
    insuredList.splice(index, 1);

    res.send(insured);
});

function validateInsured(insured) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(insured);
}
