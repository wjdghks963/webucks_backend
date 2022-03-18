
CREATE TABLE products_allergies (
    id INT,
    product_id INT,
    allergy_id INT,
    created_at datetime DEFAULT now(),

    PRIMARY KEY(id),
    foreign key (product_id) references products(id),
    foreign key (allergy_id) references allergies(id)
);