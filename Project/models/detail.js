const db = require('../util/database');

module.exports = class detail {
    constructor(DStart, DTime, DEnd, OId, PId) {
        this.DStart = DStart;
        this.DTime = DTime;
        this.DEnd = DEnd;
        this.OId = OId;
        this.PId = PId;
    }

    // READ
    static fetchAll() {
        return db.execute('SELECT * FROM detail');
    }

    static findByDStart(DStart) {
        return db.execute('SELECT * FROM detail where DStart = ?', [DStart]);
    }

    static deleteByDStart(DStart) {
        return db.execute(
            'DELETE FROM detail WHERE DStart = ?', [DStart]
        );
    }

    static getCount() {
        return db.execute('SELECT COUNT(*) as count FROM detail');
    }

    static add(req, res) {
        return db.execute(
            'INSERT INTO detail (DStart,DTime, DEnd, OId, PId) VALUES (?, ?, ?, ?, ?)',
            [req.body.DStart, req.body.DTime, req.body.DEnd, req.body.OId, req.body.PId]
        );
    }

    // UPDATE
    static updateByDStart(req, res) {
        const DStart = req.body.DStart;
        const DStart1 = req.body.DStart1;
        const DTime = req.body.DTime;
        const DEnd = req.body.DEnd;
        const OId = req.body.OId;
        const PId = req.body.PId;
        //const date = new Date();
        console.log('model:updateByTime()', DStart, DStart1, DTime, DEnd, OId, PId)
        return db.execute(
            'UPDATE detail SET DStart=?, DTime=?, DEnd=? , OId=?, PId=? WHERE DStart = ?', [DStart1, DTime, DEnd, OId, PId, DStart]
        );
    }

}