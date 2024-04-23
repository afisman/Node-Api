export const bookingsCreateQuery = `CREATE TABLE IF NOT EXISTS booking 
    (_id  INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255), 
    order_date TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, 
    check_in TIMESTAMP NOT NULL, 
    check_out TIMESTAMP NOT NULL, 
    hour_check_in VARCHAR(50) NOT NULL,
    hour_check_out VARCHAR(50) NOT NULL, 
    discount INT NOT NULL, 
    special_request VARCHAR(255), 
    status VARCHAR(255), 
    room INT NOT NULL, 
    FOREIGN KEY(room) 
    REFERENCES room(_id), 
    PRIMARY KEY(_id)); `;

export const roomCreateQuery = `
    CREATE TABLE IF NOT EXISTS room (
	_id INT AUTO_INCREMENT NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    room_number VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    offer VARCHAR(255) NOT NULL,
    room_floor VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    discount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (_id)
);`;

export const contactCreateQuery = `
    CREATE TABLE IF NOT EXISTS contact (
	_id INT AUTO_INCREMENT NOT NULL,
	image VARCHAR(500) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    date TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
    message VARCHAR(500) NOT NULL,
    rating INT NOT NULL,
    is_read BOOLEAN NOT NULL,
    PRIMARY KEY (_id)
);`;

export const userCreateQuery = `
    CREATE TABLE IF NOT EXISTS employee (
	_id  INT AUTO_INCREMENT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    photo VARCHAR(420) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (_id)
);`;

export const longQuery = `
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS employee;
CREATE TABLE IF NOT EXISTS employee (
	_id  INT AUTO_INCREMENT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    photo VARCHAR(420) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS room;
CREATE TABLE IF NOT EXISTS room (
	_id INT AUTO_INCREMENT NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    room_number VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    offer VARCHAR(255) NOT NULL,
    room_floor VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    discount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS booking;
CREATE TABLE IF NOT EXISTS booking (
	_id  INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(255),
    order_date TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP NOT NULL,
    hour_check_in VARCHAR(50) NOT NULL,
    hour_check_out VARCHAR(50) NOT NULL,
    discount INT NOT NULL,
    special_request VARCHAR(255),
    status VARCHAR(255),
    room INT NOT NULL,
    FOREIGN KEY (room) REFERENCES room(_id),
    PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS contact;
CREATE TABLE IF NOT EXISTS contact (
	_id INT AUTO_INCREMENT NOT NULL,
	image VARCHAR(500) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    date TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
    message VARCHAR(500) NOT NULL,
    rating INT NOT NULL,
    is_read BOOLEAN NOT NULL,
    PRIMARY KEY (_id)
);


DROP TABLE IF EXISTS amenity;
CREATE TABLE IF NOT EXISTS amenity(
	_id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(255),
    PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS room_amenity;
CREATE TABLE IF NOT EXISTS room_amenity(
	_id INT AUTO_INCREMENT NOT NULL,
    room_id INT NOT NULL,
    amenity_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(_id),
    FOREIGN KEY (amenity_id) REFERENCES amenity(_id),
    PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS photo;
CREATE TABLE IF NOT EXISTS photo (
	_id INT AUTO_INCREMENT NOT NULL,
    url VARCHAR(500),
    room_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(_id),
	PRIMARY KEY (_id)
);
`;
