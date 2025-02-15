const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async create(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
                [username, hashedPassword], 
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    }

    static async authenticate(username, password) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], 
                async (err, results) => {
                    if (err) reject(err);
                    if (results.length === 0) resolve(null);
                    
                    const match = await bcrypt.compare(password, results[0].password);
                    resolve(match ? results[0] : null);
                });
        });
    }
}

module.exports = User;