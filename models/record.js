'use strict';

var db = require('../config/db');
var moment = require('moment');

db.run(`CREATE TABLE IF NOT EXISTS banking2 (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATETIME,
          description TEXT,
          debits REAL,
          credits REAL,
          notes TEXT
        )`);

exports.get = function(cb) {
    db.all('SELECT * FROM banking2', cb);
};


exports.create = function(record, cb) {
    console.log('record.date: ',record.date);
    var date = moment(record.date).valueOf();
    console.log('date: ', date);
    db.run('INSERT INTO banking2 (id, date, description, debits, credits, notes) VALUES (?, ?, ?, ?, ?, ?)', [null, date, record.description, record.debits, record.credits, record.notes],
        (err) => {
            if (err) return cb(err);

            db.get(`SELECT * FROM banking2
              WHERE ID = (SELECT MAX(ID) FROM banking2);`, cb);
        });
};
exports.update = function(record, cb) {
    var date = moment(record.date).valueOf();
    console.log(date);
    db.run(`UPDATE banking2 SET date = '${date}', description = '${record.description}',debits = '${record.debits}',credits = '${record.credits}',notes = '${record.notes}' WHERE id = '${record.id}'`,
        (err) => {
            if (err) return cb(err);

            return cb(null, 'success');
        });
};

exports.removeById = function(id, cb) {
    db.run('DELETE FROM banking2 WHERE id = ?', id, cb);
};
