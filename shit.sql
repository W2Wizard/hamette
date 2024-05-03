CREATE TABLE Person (id INTEGER PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT,gender TEXT,birth_date DATE,death_date DATE);

CREATE TABLE Marriage (
    id INTEGER PRIMARY KEY,
    spouse1_id INTEGER NOT NULL,
    spouse2_id INTEGER NOT NULL,
    marriage_date DATE,
    divorce_date DATE,
    FOREIGN KEY (spouse1_id) REFERENCES Person(id),
    FOREIGN KEY (spouse2_id) REFERENCES Person(id)
);

CREATE TABLE Parentage (
    child_id INTEGER NOT NULL,
    parent_id INTEGER NOT NULL,
    FOREIGN KEY (child_id) REFERENCES Person(id),
    FOREIGN KEY (parent_id) REFERENCES Person(id),
    PRIMARY KEY (child_id, parent_id)
);