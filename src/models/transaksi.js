const connection = require('../configs/db')

module.exports = {
    postTransaksi: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO transaksi SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    postDetail: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO detailtransaksi SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getTransaksi: (by) => {
        console.log(by);
        
        let where = ''
        if (by === 'today') {
            where = ` Year(\`tanggalBeli\`)=Year(CURDATE()) AND Month(\`tanggalBeli\`)= Month(CURDATE()) AND Date(\`tanggalBeli\`)= CURDATE()`;
        } else if (by === 'week') {
            where = ` YEARWEEK(\`tanggalBeli\`)= YEARWEEK(CURDATE())`;
        } else if (by === 'month') {
            where = ` Year(\`tanggalBeli\`)=Year(CURDATE()) AND Month(\`tanggalBeli\`)= Month(CURDATE())`;
        } else if (by === 'year') {
            where = ` Year(\`tanggalBeli\`)=Year(CURDATE())`;
        } else {
            where = `tanggalBeli != ''`
        }
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM transaksi INNER JOIN detailtransaksi on detailtransaksi.idTransaksi = transaksi.idTransaksi INNER JOIN menu ON detailtransaksi.idMenu = menu.idMenu WHERE ' + where, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}