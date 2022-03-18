CREATE TABLE products_images
(
    id INT,
    image_url VARCHAR(3000) NOT NULL,
    product_id INT NOT NULL,
    created_at datetime DEFAULT now(),

    PRIMARY KEY(id),
    foreign key (product_id) references products(id)
);
