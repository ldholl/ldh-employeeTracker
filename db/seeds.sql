INSERT INTO department 
(dept_name)
VALUES 
('Human Resources'),
('Finance'),
('Legal'),
('Engineering'),
('Sales');

INSERT INTO roles 
(title, salary, role_department)
VALUES
('HR Manager', 100000.5, 1),
('Marketing Specialist', 70000, 5),
('Business analyst', 70000, 5),
('Accountant', 80000, 2),
('Sales Rep', 50000, 5),
('Lawyer', 110000, 3);

INSERT INTO employee 
(first_name, last_name, role_id)
VALUES
('Dante', 'Rossetti', 2),
('J. William', 'Waterhouse', 5),
('Elizabeth', 'Siddal', 2),
('Frederic', 'Leighton', 5),
('Evelyn', 'Morgan', 6),
('Frederick', 'Sandys', 1),
('Georgiana', 'Burne-Jones', 2),
('Frank', 'Cadogan', 5),
('Marie', 'Spartali-Stillman', 3);
