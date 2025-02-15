const db = require('../config/database');

class Item {
    static getAllByUser(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM items WHERE user_id = ?', [userId], 
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }

    static getOne(id, userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM items WHERE id = ? AND user_id = ?', 
                [id, userId], 
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                });
        });
    }

    static create(itemData, userId) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO items (name, description, quantity, price, user_id) VALUES (?, ?, ?, ?, ?)',
                [itemData.name, itemData.description, itemData.quantity, itemData.price, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    }

    static update(id, itemData, userId) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE items SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ? AND user_id = ?',
                [itemData.name, itemData.description, itemData.quantity, itemData.price, id, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    }

    static delete(id, userId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM items WHERE id = ? AND user_id = ?',
                [id, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    }
}

module.exports = Item;