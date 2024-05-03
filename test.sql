-- insert_data.sql

-- Insert three persons into the Person table
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Parent1', 'Lastname', 'Male', '1970-01-01');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Parent2', 'Lastname', 'Female', '1975-03-15');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Parent3', 'Lastname', 'Female', '1980-07-20');

-- Insert two children for Parent1 and Parent2
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child1', 'Lastname', 'Male', '2000-05-10');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child2', 'Lastname', 'Female', '2005-07-20');

-- Insert four children for Parent1 and Parent3
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child3', 'Lastname', 'Male', '2010-09-30');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child4', 'Lastname', 'Female', '2012-11-15');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child5', 'Lastname', 'Male', '2015-02-20');
INSERT INTO Person (first_name, last_name, gender, birth_date) VALUES ('Child6', 'Lastname', 'Female', '2018-04-25');

-- Establish parentage relationships for children from the first marriage
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child1'), (SELECT id FROM Person WHERE first_name = 'Parent1'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child2'), (SELECT id FROM Person WHERE first_name = 'Parent1'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child1'), (SELECT id FROM Person WHERE first_name = 'Parent2'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child2'), (SELECT id FROM Person WHERE first_name = 'Parent2'));

-- Establish parentage relationships for children from the second marriage
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child3'), (SELECT id FROM Person WHERE first_name = 'Parent1'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child4'), (SELECT id FROM Person WHERE first_name = 'Parent1'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child5'), (SELECT id FROM Person WHERE first_name = 'Parent3'));
INSERT INTO Parentage (child_id, parent_id) VALUES ((SELECT id FROM Person WHERE first_name = 'Child6'), (SELECT id FROM Person WHERE first_name = 'Parent3'));
