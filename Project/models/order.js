const db = require('../util/database');

module.exports = class order {
    constructor(OId, ODate, OStatus, MId) {
        this.OId = OId;
        this.ODate = ODate;
        this.OStatus = OStatus;
        this.MId = MId;
    }

    // READ
    static fetchAll() {
        return db.execute('SELECT * FROM project.order');
    }

    static findByOId(OId) {
        return db.execute('SELECT * FROM project.order where OId = ?', [OId]);
    }

    static deleteByOId(OId) {
        return db.execute(
            'DELETE FROM project.order WHERE OId = ?', [OId]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM project.order');
    }

    static add(req, res) {
        return db.execute(
            'INSERT INTO project.order (ODate, OStatus, MId) VALUES (?, ?, ?)',
            [req.body.ODate, req.body.OStatus, req.body.MId]
        );
    }

    // UPDATE
    static updateByOId(req, res) {
        const OId = req.body.OId;
        const ODate = req.body.ODate;
        const OStatus = req.body.OStatus;
        const MId = req.body.MId;
        console.log('model:updateByOId()', OId, ODate, OStatus, MId)
        return db.execute(
            'UPDATE project.order SET ODate=?, OStatus=?, MId=? WHERE OId = ?', [ODate, OStatus, MId, OId]
        );
    }

}