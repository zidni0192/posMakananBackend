const models = require('../models/transaksi')
module.exports = {
    postTransaksi: async (req, res) => {
        const date = new Date()
        // const idTransaksi = 'TRS-' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
        const dataTransaksi = {
            idTransaksi: req.body.idTransaksi,
            total: req.body.total,
            tanggalBeli: new Date(),
        }
        const dataDetail = req.body.detail
        const jumlah = req.body.jumlah
        models.postTransaksi(dataTransaksi).then(async (result) => {
            // res.json({ ...dataTransaksi, idTransaksi: result.insertId })
            for (let a = 0; a < dataDetail.length; a++) {
                let index = dataDetail.indexOf(dataDetail[a])
                await models.postDetail({idTransaksi:req.body.idTransaksi,idMenu:dataDetail[index].idMenu,jumlah:jumlah[index].jumlah})
                    .catch((error) => {
                        console.log(error);
                    })
            }
            res.json(result)
        }).catch((error) => {
            console.log(error);
        })
    },
    getTransaksi: (req, res) => {
        models.getTransaksi(req.query.sort).then((result) => {
            res.json(result)
        }).catch((error) => {
            console.log(error);
        })
    }
}