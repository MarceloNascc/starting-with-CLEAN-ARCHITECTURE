import Express from "express";
import ExpressAdapter from "../../adapter/ExpressAdapter";
import ParkingLotController from "../../controllers/ParkingLotController";

const app = Express();

app.get(
  "/parking-lots/:code",
  ExpressAdapter.create(ParkingLotController.getParkingLot)
);

app.listen(3000);
