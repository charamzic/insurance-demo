import { insuranceRepo } from "../repository/insuranceRepo.js";
import { validator } from "../util/validator.js";
import { NOT_FOUND_MESSAGE } from "../messages.js";
import { insuredRepo } from "../repository/insuredRepo.js";
import { Insurance } from "../model/Insurance.js";

const getAllInsurances = async (req, res) => {
    try {
        const result = await insuranceRepo.getInsurances();
        res.render('insurance/insurances', { title: 'Insurances', insurances: result, activePage: 'insurances' });
    } catch (err) {
        console.error(`insuranceController::getAllInsurances: ${err}`);
    }
};

const getInsuranceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const insurance = await insuranceRepo.getInsurance(id);
        if (!insurance) {
            return res.status(404).render('404', { title: 'Page Not Found', activePage: '' });
        }
        res.render('insurance/insurance-detail', { title: 'Insurance detail', insurance: insurance, activePage: '' });
    } catch (err) {
        res.status(404).render('404', { title: 'Page Not Found' });
        console.error(`insuranceController::getInsuranceDetail: ${err}`);
    }
};

const getInsuranceCreate = async (req, res) => {
    const insurance = {};
    const successMessage = ''
    const insureds = await insuredRepo.getInsuredsIdAndName();
    res.render('insurance/insurance-create',
        {
            title: 'Create new',
            insurance,
            successMessage,
            insureds,
            activePage: 'new-insurance'
        }
    );
};

const postInsuranceCreate = async (req, res) => {
    try {
        const { error, value } = validator.validateInsurance(req.body);
        if (error) {
            return res.status(404).render('404', { title: 'Page Not Found', activePage: '' });
        }

        const { insured_id, start_date, end_date, premium_amount, coverage_details } = value;
        const insurance = new Insurance(
            insured_id, start_date, end_date, premium_amount, coverage_details
        );
        const result = await insuranceRepo.createInsurance(insurance);
        const insureds = await insuredRepo.getInsuredsIdAndName();
        const successMessage = 'Pojistka úspěšně vytvořena.';
        res.render('insurance/insurance-create',
            {
                title: 'Create new',
                insureds,
                successMessage,
                activePage: 'new-insurance'
            }
        );
    } catch (err) {
        console.error(`insuranceController::postInsuranceCreate: ${err}`);
    }
};

const postInsuranceUpdate = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedInsurance = await insuranceRepo.updateInsurance(id, req.body);
        res.render('insurance/insurance-detail', {
            title: 'Insurance detail',
            insurance: updatedInsurance,
            activePage: ''
        });
    } catch (err) {
        console.error(`insuranceController::update: ${err}`);
    }
};

const insuranceDelete = async (req, res) => {
    try {
        const { id } = req.params;
        await insuranceRepo.deleteInsurance(id);
        return res.json({ redirect: '/insurances' });
    } catch (err) {
        console.error(`insuranceController::insuranceDelete: ${NOT_FOUND_MESSAGE} [${req.params.id}]`, err);
        return res.sendStatus(204);
    }
};

export const insuranceController = {
    getAllInsurances,
    getInsuranceDetail,
    getInsuranceCreate,
    postInsuranceCreate,
    postInsuranceUpdate,
    insuranceDelete
}