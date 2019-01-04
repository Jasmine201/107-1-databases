const db = require('../util/database');

module.exports = class member {
    constructor(MId, ID, Name, Phone) {
        this.MId = MId;
        this.ID = ID;
        this.Name = Name;
        this.Phone = Phone;
    }

    // READ
    static fetchAll() {
        return db.execute('SELECT * FROM member');
    }

    static findByMId(MId) {
        return db.execute('SELECT * FROM member where MId = ?', [MId]);
    }

    static deleteByMId(MId) {
        return db.execute(
            'DELETE FROM member WHERE MId = ?', [MId]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM member');
    }

    static add(req, res) {
        //console.log('add():', req.body.name, req.body.price);
        return db.execute(
            'INSERT INTO member (ID, Name, Phone) VALUES (?, ?, ?)',
            [req.body.ID, req.body.Name, req.body.Phone]
        );
    }

    static updateByMId(req, res) {
        const MId = req.body.MId;
        const ID = req.body.ID;
        const Name = req.body.Name;
        const Phone = req.body.Phone;
        //const date = new Date();
        console.log('model:updateByMId()', MId, ID, Name, Phone)
        return db.execute(
            'UPDATE member SET ID=?, Name=?, Phone=? WHERE MId = ?', [ID, Name, Phone, MId]
        );
    }

}