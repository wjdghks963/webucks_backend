-- create nutritions table

CREATE TABLE nutritions (
    id INT ,
    product_id INT NOT NULL,
    caffein FLOAT NULL,
    fat FLOAT NULL,
    sugar FLOAT NULL,
    sodium FLOAT NULL,
    created_at datetime DEFAULT now(),

    PRIMARY KEY(id),
    foreign key (product_id) references products(id)
)


