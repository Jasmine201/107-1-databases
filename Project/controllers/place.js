const moment = require('moment');

const Place = require('../models/place');

exports.getPlace = (req, res, next) => {
    Place.fetchAll()
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('MMM D, YYYY');
            }
            //console.log(JSON.stringify(rows));
            //res.send(JSON.stringify(rows));
            res.render('place', {
                data: rows,
                title: 'Place List',
            });
        })
        .catch(err => console.log(err));
};

exports.getDeletePlace = (req, res, next) => {
    Place.deleteByPId(req.query.PId)
        .then(([rows]) => {
            res.redirect('/place');
        })
        .catch();
};

exports.getEditPlace = async (req, res, next) => {

    let place;
    let PId;

    const getPlace = await Place.fetchAll()
        .then(([rows]) => {
            place = rows;
            //console.log('findCategories(): ', JSON.stringify(rows));
        })

    const findPlaceByPId = await Place.findByPId(req.query.PId)
        .then(([rows]) => {
            for (let p of rows) {
                p.date = moment(p.date).format('YYYY-MM-DD');
                console.log('p.date: ', p.date);
            }
            PId = rows;
            //console.log('post[0].date: ', post[0].date);
            //console.log('findPostById(): ', JSON.stringify(rows));
        })
        .catch(err => console.log(err));

    res.render('editPlace', {
        data: PId,
        title: 'Edit Place',
        place: place
    });

};

exports.postUpdatePlace = (req, res, next) => {

    Place.updateByPId(req, res)
        .then(([rows]) => {
            res.redirect('/place');
        })
        .catch(err => console.log(err));
};

exports.postAddPlace = (req, res, next) => {

    Place.add(req, res)
        .then(([rows]) => {
            res.redirect('/place');
        })
        .catch(err => console.log(err));
};