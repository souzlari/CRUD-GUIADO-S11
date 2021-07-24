const travels = require("../models/travels.json");
const passengers = require("../models/passengers.json");
const fs = require("fs");

const utils = require("../utils/travelsUtils");

const getAllPassengers = (req, res) => {
    res.status(200).send(passengers)
};

const replacePassenger = (req, res) => {
    const idReq = req.params.id
    const {
        name,
        email,
        documentNumber
    } = req.body

    let filteredPassenger = utils.findById(passengers, idReq);
    const index = passengers.indexOf(filteredPassenger);

    let updatePassenger = {
        id: idReq,
        name,
        email,
        documentNumber
    };
    if (index >= 0){
        passengers.splice(index, 1, updatePassenger)
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (e){
            if (e) {
                res.status(500).send({ "message": e })
            } 
            else{
                res.status(200).send({
                    "message": "Passageire substituíde com sucesso!", 
                    updatePassenger
                })
            }
        })

    } else{
         res.status(404).send({ "message": "Passageire não encontrade."})
    }
};

//atualizar apenas nome 
const updateName = (req, res) => {
    const idReq = req.params.id
    let newName = req.body.name

    let filteredPassenger = utils.findById(passengers, idReq);
    if (filteredPassenger) {
        filteredPassenger.name = newName

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function (e) {
            if (e){
                res.status(500).send({ "message": e })
            }
            else{
                res.status(200).send({ "message": "Nome atualizado com sucesso!"
                , filteredPassenger})
            }
        })
    } else{
        res.status(500).send({ "message": "Passageire não encontrade."})
    }

}

const deletePassenger = (req, res) => { 
    let idRequerido = req.params.id

    let filteredPassenger = utils.findById(passengers, idRequerido);
    console.log( "passengers: ", passengers)

    const index = passengers.indexOf(filteredPassenger);

    if(index >= 0) {
        passengers.splice(index, 1)

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf-8', (e) => {
            if(e){
                res.status(500).send({ "message": e})
            } else{
                res.status(200).send({"mensagem": "Passageire deletade com sucesso!" , passengers
            })

           }
        })
    }
}

module.exports = { getAllPassengers, replacePassenger, updateName, deletePassenger }