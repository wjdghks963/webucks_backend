-- create allergirs table

CREATE TABLE allergies (
    id INT,
    name VARCHAR(200) UNIQUE NOT NULL,
    created_at datetime DEFAULT now(),

    PRIMARY KEY(id)
);

