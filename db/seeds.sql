INSERT INTO departments (department_name)
VALUES 
('Management'),
('Sales'),
('Marketing'),
('Operations'),
('Maintenance'),
('Human Resources'),
('Finance AR & AP'),
('Product Engineering'),
('Research and Development'),
('Legal');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer', 435000.00, 1),
('Sales Manager', 610000.00, 2),
('Marketing Director', 242000.00, 3),
('Operations Head', 143000.00, 4),
('Head of Maintenance', 92000.00, 5),
('Head of Human Resources', 185000.00, 6),
('Finance Manager', 185000.00, 7),
('Head Engineer', 190000, 8),
('Research and Development Manager ', 190000.00, 9),
('Head of Legal', 210000.00, 10);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ian', 'Sills', 1, 1),
('Steven', 'Sills', 2, 2),
('Marco', 'Polo', 3, 3),
('Chariman', 'Mao', 4, 4),
('Bob', 'The-Builder', 5, 5),
('Nice', 'Old-Lady', 6, 6),
('Ebenezer', 'Scrooge', 7, 7),
('Elon', 'Musk', 8, 8),
('Leo', 'Davinci', 9, 9),
('Johnnie', 'Cochran', 10, 10);