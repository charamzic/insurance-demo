import { pool } from '../config/mysql.js';
import { insuranceRepo } from "./insuranceRepo.js";

const getInsureds = async () => {
    const [rows] = await pool.query("SELECT * FROM Insureds");
    return rows;
};

const getInsuredsIdAndName = async () => {
    const [rows] = await pool.query(
        `
            SELECT id, name
            FROM Insureds
        `
    );
    return rows;
};

const getInsured = async id => {
    const [row] = await pool.query(
        `
            SELECT id, name, email, insured_type
            FROM Insureds
            WHERE id = ?
        `,
        [id]
    );
    return row[0];
};

const createInsured = async insured => {
    const { name, email, insuredType } = insured;
    const [result] = await pool.query(
        `
            INSERT INTO Insureds (name, email, insured_type)
            VALUES (?, ?, ?)
        `,
        [name, email, insuredType]
    );
    const id = result.insertId;
    return { id, name, email, insuredType };
};

const updateInsured = async (id, insured) => {
    const { name, email, insuredType } = insured;
    const [result] = await pool.query(
        `
            UPDATE Insureds
            SET name         = ?,
                email        = ?,
                insured_type = ?
            WHERE id = ?
        `,
        [name, email, insuredType, id]
    );

    if (result.affectedRows === 0) {
        throw new Error('Insured not found or no changes made.');
    }

    return insured;
};

const deleteInsured = async id => {
    await insuranceRepo.deleteInsurancesByInsuredId(id);
    await pool.query(
        `
            DELETE
            FROM Insureds
            WHERE id = ?;
        `,
        [id]
    );
};

export const insuredRepo = {
    getInsureds,
    getInsuredsIdAndName,
    getInsured,
    createInsured,
    updateInsured,
    deleteInsured
}