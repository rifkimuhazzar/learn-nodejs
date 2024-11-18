create table sample (
  id varchar(100) not null,
  name varchar(100) not null,
  primary key (id)
);

show tables;
desc sample;
select * from sample;

show create table sample;

CREATE TABLE customers (
	id varchar(100) not null,
    name varchar(100) not null,
    email varchar(100) not null,
    phone varchar(100) not null,
    primary key(id),
    constraint customers_email_unique unique (email),
	constraint customers_phone_unique unique (phone)
);

SHOW CREATE TABLE customers;

CREATE TABLE `customers` (
   `id` varchar(100) NOT NULL,
   `name` varchar(100) NOT NULL,
   `email` varchar(100) NOT NULL,
   `phone` varchar(100) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `customers_email_unique` (`email`),
   UNIQUE KEY `customers_phone_unique` (`phone`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 SELECT * FROM customers;
 
 DELETE FROM customers where id = "hw";
 
 DELETE FROM customers where id = "w4";
 
 INSERT INTO customers (id, name, email, phone) 
 VALUES ("h2", "Hello 2", "hello2@example.com", "333333333333"), 
		("w2", "World 2", "world2@example.com", "444444444444"),
        ("h3", "Hello 3", "hello3@example.com", "555555555555"),
		("w3", "World 3", "world3@example.com", "666666666666");
 
 CREATE TABLE products (
	id VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
 );

SHOW CREATE TABLE products;
CREATE TABLE `products` (
   `id` varchar(100) NOT NULL,
   `name` varchar(100) NOT NULL,
   `price` int NOT NULL,
   `stock` int NOT NULL,
   `category` varchar(100) NOT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 SELECT * FROM products;
 
 INSERT INTO products(id, name, price, stock, category)
 VALUES ("P0001", "A", 1000, 100, "K1"),
		("P0002", "B", 2000, 200, "K1"),
        ("P0003", "C", 3000, 300, "K1"),
        ("P0004", "D", 4000, 400, "K2"),
        ("P0005", "E", 5000, 500, "K2");
        
create table categories(
	id int not null auto_increment,
    name varchar(100) not null,
    primary key(id)
)engine innodb;

desc categories;
select * from categories;

--------------------------------------------------------------------------------- 
create table wallet(
	id varchar(100) not null,
    balance int not null,
    customer_id varchar(100) not null,
    constraint wallet_customer_id_fk foreign key(customer_id) references customers(id),
    constraint wallet_cutomer_id_unique unique key(customer_id)
) engine innodb;

show create table wallet;

CREATE TABLE `wallet` (
   `id` varchar(100) NOT NULL,
   `balance` int NOT NULL,
   `customer_id` varchar(100) NOT NULL,
   UNIQUE KEY `wallet_cutomer_id_unique` (`customer_id`),
   CONSTRAINT `wallet_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--------------------------------------------------------------------------------- 

select * from wallet;
select* from customers;

create table comments(
	id int not null auto_increment,
    customer_id varchar(100) not null,
    title varchar(100) not null,
    description text,
    primary key(id),
    constraint comments_customer_id_fk foreign key (customer_id) references customers(id)
);

show create table comments;
select * from comments;
insert into comments (customer_id, title, description)
values	("h1", "Comment 1", "Sample comment 1"),
		("h1", "Comment 2", "Sample comment 2"),
        ("h2", "Comment 3", "Sample comment 3"),
        ("h2", "Comment 4", "Sample comment 4");

select * from customers;
select * from products;

create table likes (
	customer_id varchar(100) not null,
    product_id varchar(100) not null,
    primary key (customer_id, product_id),
    constraint likes_customer_id_fk foreign key (customer_id) references customers (id),
    constraint likes_product_id_fk foreign key (product_id) references products (id)
);

show create table likes;
select * from likes;

create table _loves (
	A varchar(100) not null,
    B varchar(100) not null,
    primary key (A, B),
    constraint customer_loves_fk foreign key (A) references customers (id),
    constraint product_loves_fk foreign key (B) references products (id)
);

select * from _loves;

show databases;
create database belajar_nodejs_prisma;
use belajar_nodejs_prisma;
show tables;

select * from sample;
desc sample;
alter table sample add column full_description text;

desc _prisma_migrations;
select * from _prisma_migrations;