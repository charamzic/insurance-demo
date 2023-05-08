CREATE TABLE Insureds
(
    insured_id   INT PRIMARY KEY,
    name         VARCHAR(255),
    email        VARCHAR(255),
    phone_number VARCHAR(20),
    insured_type ENUM ('policyholder', 'insured')
);

CREATE TABLE Insurances
(
    insurance_id     INT PRIMARY KEY,
    insured_id       INT,
    policy_number    VARCHAR(50),
    start_date       DATE,
    end_date         DATE,
    premium_amount   DECIMAL(10, 2),
    coverage_details TEXT,
    FOREIGN KEY (insured_id) REFERENCES Insureds (insured_id)
);

INSERT INTO Insureds (insured_id, name, email, phone_number, insured_type)
VALUES (1, 'Tomáš Marný', 'tomas@marny.cz', '123456789', 'policyholder'),
       (2, 'Julie Skvostná', 'julie@skvostna.cz', '987654321', 'insured'),
       (3, 'Testan Testovič', 'testan@testovic.cz', '555555555', 'insured');

INSERT INTO Insurances (insurance_id, insured_id, policy_number, start_date, end_date, premium_amount, coverage_details)
VALUES (1, 1, 'POJ001', '2023-01-01', '2023-12-31', 1000.00, 'Coverage details for policy 1'),
       (2, 2, 'POJ002', '2023-02-01', '2023-07-31', 750.50, 'Coverage details for policy 2'),
       (3, 2, 'POJ003', '2023-03-15', '2024-03-14', 1200.00, 'Coverage details for policy 3'),
       (4, 3, 'POJ004', '2023-04-01', '2024-03-31', 900.00, 'Coverage details for policy 4');

