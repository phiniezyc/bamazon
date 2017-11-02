CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dapartment_name VARCHAR(100) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);