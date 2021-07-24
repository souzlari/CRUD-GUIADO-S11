const express = require("express");
const router = express.Router();

const travelsController = require("../controllers/travelsControllers");
const passengersController = require("../controllers/passengersControllers");

// VIAGENS
router.get("/travels" , travelsController.getAllTravels);
router.get("/travels/capacity", travelsController.getAllTravelsOrder);
router.get("/travels/:id" , travelsController.getTravelById);

router.post("/travels/:id/passenger/create" , travelsController.createPassenger);
router.delete("./travels/:id/delete", travelsController.deleteTravel);

// MOTORISTA

router.post("/travels/:id/driverCreate", travelsController.createDriver);

router.put("/travels/:id/updateDriver", travelsController.replaceDriver);

router.patch("/travels/:id/update", travelsController.updateDriver);

// PASSAGEIROS

router.get("/passengers", passengersController.getAllPassengers);

router.delete("/passengers/:id", passengersController.deletePassenger);

router.put("/passengers/update/:id" , passengersController.replacePassenger);

router.patch("/passengers/updateName/:id" ,passengersController.updateName);

module.exports = router