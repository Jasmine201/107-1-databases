const moment = require('moment');

const Member = require('../models/member');

exports.getMember = (req, res, next) => {
    Member.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            //console.log(JSON.stringify(rows));
            //res.send(JSON.stringify(rows));
            res.render('member', {
                data: rows,
                title: 'Member List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDeleteMember = (req, res, next) => {
    Member.deleteByMId(req.query.MId)
        .then(([rows]) => {
            res.redirect('/member');
        })
        .catch();
};

exports.getEditMember = async (req, res, next) => {

    let member;
    let mId;

    const getMember = await Member.fetchAll()
        .then(([rows]) => {
            member = rows;
            console.log('findPostById(): ', JSON.stringify(member));
        })

    const findMemberByMId = await Member.findByMId(req.query.MId)
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('YYYY-MM-DD');
                console.log('p.date: ',p.data);
            }
            mId = rows;
            console.log('findPostById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    res.render('editMember', {
        data: mId,
        title: 'Edit Member',
        member: member
    });
};

exports.postUpdateMember = (req, res, next) => {

    Member.updateByMId(req, res)
        .then(([rows]) => {
            res.redirect('/member');
        })
        .catch(err => console.log(err));
};

exports.postAddMember = (req, res, next) => {

    Member.add(req, res)
        .then(([rows]) => {
            res.redirect('/member');
        })
        .catch(err => console.log(err));
};