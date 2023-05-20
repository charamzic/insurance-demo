DROP TABLE IF EXISTS Insurances;

DROP TABLE IF EXISTS Insureds;

CREATE TABLE Insureds
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255),
    email        VARCHAR(255),
    insured_type ENUM ('policyholder', 'insured')
);

CREATE TABLE Insurances
(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    insured_id       INT NULL,
    policy_number    VARCHAR(50),
    start_date       VARCHAR(50),
    end_date         VARCHAR(50),
    premium_amount   DECIMAL(10, 2),
    coverage_details TEXT,
    FOREIGN KEY (insured_id) REFERENCES Insureds (id)
);

INSERT INTO Insureds (id, name, email, insured_type)
VALUES (1, 'Tomáš Marný', 'tomas@marny.cz', 'policyholder'),
       (2, 'Julie Skvostná', 'julie@skvostna.cz', 'insured'),
       (3, 'Testan Testovič', 'testan@testovic.cz', 'insured');

INSERT INTO Insurances (id, insured_id, policy_number, start_date, end_date, premium_amount, coverage_details)
VALUES (1, 1, 'POL001', '2023-01-01', '2023-12-31', 1000.00, 'Coverage details for policy 1'),
       (2, 2, 'POL002', '2023-02-01', '2023-07-31', 750.50, 'Coverage details for policy 2'),
       (3, 2, 'POL003', '2023-03-15', '2024-03-14', 1200.00, 'Coverage details for policy 3'),
       (4, 3, 'POL004', '2023-04-01', '2024-03-31', 900.00, 'Coverage details for policy 4');
