import { insuredRepo } from "../repository/insuredRepo.js";
import { insuranceRepo } from "../repository/insuranceRepo.js";
import insuredType from '../enum/insuredType.js'
import { NOT_AUTHORIZED_MESSAGE, NOT_FOUND_MESSAGE } from "../messages.js";
import { validator } from "../util/validator.js";
import { Insured } from "../model/Insured.js";

async function getAllInsureds(req, res) {
    let result;
    try {
        result = await insuredRepo.getInsureds();
    } catch (err) {
        console.error(`insuredController::getAllInsureds: ${err}`);
    }
    res.render('insured/insureds', { title: 'Insureds', insureds: result, activePage: 'insureds' });
}

const getInsuredDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const insured = await insuredRepo.getInsured(id);
        const insurances = await insuranceRepo.getInsurancesByInsuredId(id);
        if (!insured) {
            return res.status(404).render('404', { title: 'Page Not Found', activePage: 'new-insured' });
        }
        res.render('insured/insured-detail',
            {
                title: 'Insured detail',
                insured: insured,
                insurances: insurances,
                activePage: 'new-insured'
            }
        );
    } catch (err) {
        res.status(404).render('404', { title: 'Page Not Found', activePage: '' });
        console.error(`insuredController::getInsuredDetail: ${err}`);
    }
};

const getInsuredCreate = async (req, res) => {
    const insured = {};
    const successMessage = ''
    res.render('insured/insured-create',
        {
            title: 'Create new',
            insured,
            successMessage,
            insuredTypes: Object.values(insuredType),
            activePage: 'new-insured'
        }
    );
};

const postInsuredCreate = async (req, res) => {
    try {
        const { error, value } = validator.validateInsured(req.body);
        if (error) {
            return res.status(404).render('404', { title: 'Page Not Found' });
        }

        const { name, email, insuredType } = value;
        const insured = new Insured(name, email, insuredType);

        const result = await insuredRepo.createInsured(insured);
        const successMessage = 'Klient úspěšně vytvořen.';
        res.render('insured/insured-create',
            {
                title: 'Create new',
                successMessage,
                insuredTypes: Object.values(insuredType),
                activePage: 'new-insured'
            }
        );
    } catch (err) {
        console.error(`insuredController::postInsuredCreate: ${err}`);
    }
};

const postInsuredUpdate = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedInsured = await insuredRepo.updateInsured(id, req.body);
        const insurances = await insuranceRepo.getInsurancesByInsuredId(id);
        res.render('insured/insured-detail',
            {
                title: 'Insured detail',
                insured: updatedInsured,
                insurances: insurances,
                activePage: ''
            }
        );
    } catch (err) {
        res.status(404).render('404', { title: 'Page Not Found', activePage: '' });
        console.error(`insuredController::postInsuredUpdate: ${err}`);
    }
};

const insuredDelete = async (req, res) => {
    if (req.cookies.loggedAs !== process.env.AUTH_USER) {
        console.error(`insuredController::insuredDelete: ${NOT_AUTHORIZED_MESSAGE}`);
        return res.sendStatus(401);
    }
    try {
        const { id } = req.params;
        await insuredRepo.deleteInsured(id);
        return res.json({ redirect: '/insureds' });
    } catch (err) {
        console.error(`insuredController::insuredDelete: ${NOT_FOUND_MESSAGE} [${req.params.id}]`, err);
        return res.sendStatus(204);
    }
};

export const insuredController = {
    getAllInsureds,
    getInsuredDetail,
    getInsuredCreate,
    postInsuredCreate,
    postInsuredUpdate,
    insuredDelete
}