const moment = require('moment');

const Include = require('../models/include')
const Place = require('../models/place');
const Order = require('../models/order');
const Book = require('../models/book');

exports.getPId = (req, res, next) => {
    Include.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            //console.log(JSON.stringify(rows));
            //res.send(JSON.stringify(rows));
            res.render('include', {
                data: rows,
                title: 'Include List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDeleteInclude = (req, res, next) => {
    Include.deleteByPId(req.query.PId)
        .then(([rows]) => {
            res.redirect('/');
        })
        .catch();
};

exports.getEditInclude = async (req, res, next) => {

    let All;
    let pid;
    let PId;
    let OId;
    let BId;

    const getAll = await Include.fetchAll()
        .then(([rows]) =>{
            All = rows;
        })

    const getpid = await Include.findByPId(req.query.PId)
        .then(([rows]) => {
            pid = rows;
        })
    console.log(pid);

    const getPId = await Place.fetchAll()
        .then(([rows]) => {
            PId = rows;
        })
    
    const getOId = await Order.fetchAll()
        .then(([rows]) => {
            OId = rows;
            //console.log('findCategories(): ', JSON.stringify(rows));
        })

    const getBId = await Book.fetchAll()
        .then(([rows]) => {
            BId = rows;
        })

    res.render('editInclude', {
        data: pid,
        title: 'Edit Include',
        All:All,
        PId:PId,
        OId:OId,
        BId:BId
    });

};

exports.postUpdateInclude = (req, res, next) => {

    Include.updateByPId(req, res)
        .then(([rows]) => {
            res.redirect('/include');
        })
        .catch(err => console.log(err));
};

exports.postAddInclude = (req, res, next) => {

    Include.add(req, res)
        .then(([rows]) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};