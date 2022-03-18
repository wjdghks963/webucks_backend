-- create product table
CREATE TABLE products
(
  id INT NOT NULL AUTO_INCREMENT,
  korean_name VARCHAR(100) NOT NULL,
  english_name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  created_at datetime DEFAULT now(),

    PRIMARY KEY (id)
  foreign key (category_id) references categories(id)
);


