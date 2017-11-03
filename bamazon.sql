CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dapartment_name VARCHAR(100) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);



INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("football", "sports" , 39.95, 25);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("cleats", "sports" , 119.95, 55);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("canoes", "outdoors" , 499.95, 9);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("xbox", "gaming" , 499.95, 200);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("guitar", "music" , 999.95, 15);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("blender", "cooking" , 49.95, 6);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("backpack", "school" , 35.99, 30);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("computer", "computing" , 1400.00, 42);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("tent", "outdoors" , 199.95, 17);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("leash", "pets" , 24.95, 14);