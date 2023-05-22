import { pool } from '../config/mysql.js';

const getInsurances = async () => {
    const [rows] = await pool.query("SELECT * FROM Insurances");
    return rows;
};

const getInsurancesByInsuredId = async id => {
    const [rows] = await pool.query(
        `
            SELECT id, policy_number
            FROM Insurances
            WHERE insured_id = ?
        `,
        [id]
    );
    return rows;
};

const getInsurance = async id => {
    const [row] = await pool.query(
        `
            SELECT *
            FROM Insurances
            WHERE id = ?
        `,
        [id]
    );
    return row[0];
};

const createInsurance = async insurance => {
    const { insuredId, policyNumber, startDate, endDate, premiumAmount, coverageDetails } = insurance;
    const [result] = await pool.query(
        `
            INSERT INTO Insurances (insured_id, policy_number, start_date, end_date, premium_amount, coverage_details)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        [insuredId, policyNumber, startDate, endDate, premiumAmount, coverageDetails]
    );
    const id = result.insertId;
    return { id, insuredId, policyNumber, startDate, endDate, premiumAmount, coverageDetails };
};

const updateInsurance = async (id, insurance) => {
    const { insured_id, start_date, end_date, premium_amount, coverage_details } = insurance;
    await pool.query(
        `
            UPDATE Insurances
            SET insured_id       = ?,
                start_date       = ?,
                end_date         = ?,
                premium_amount   = ?,
                coverage_details = ?
            WHERE id = ?
        `,
        [insured_id, start_date, end_date, premium_amount, coverage_details, id]
    );

    return insurance;
};

const deleteInsurance = async id => {
    await pool.query(
        `
            DELETE
            FROM Insurances
            WHERE id = ?;
        `,
        [id]
    );
};

const deleteInsurancesByInsuredId = async insuredId => {
    await pool.query(
        `
            DELETE
            FROM Insurances
            WHERE insured_id = ?;
        `,
        [insuredId]
    );
};


export const insuranceRepo = {
    getInsurances,
    getInsurancesByInsuredId,
    getInsurance,
    createInsurance,
    updateInsurance,
    deleteInsurance,
    deleteInsurancesByInsuredId
}