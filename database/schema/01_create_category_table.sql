-- create category table
CREATE TABLE categories
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  created_at datetime DEFAULT now(),
  PRIMARY KEY (id)
);

