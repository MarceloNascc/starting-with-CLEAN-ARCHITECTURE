import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory
  implements ParkingLotRepository
{
  parkingLots = [
    {
      code: "shopping",
      capacity: 5,
      openHour: 8,
      closedHour: 22,
      // occupiedSpaces: 0,
    },
  ];
  parkedCars: { code: string; plate: string; date: Date }[] = [];

  getParkingLot(code: string): Promise<ParkingLot | undefined> {
    const parkingLotData = this.parkingLots.find(
      (parkingLot) => parkingLot.code === code
    );

    if (!parkingLotData) {
      return Promise.resolve(undefined);
    }

    const occupiedSpaces = this.parkedCars.length;

    const parkingLot = ParkingLotAdapter.create(
      parkingLotData?.code,
      parkingLotData?.capacity,
      parkingLotData?.openHour,
      parkingLotData?.closedHour,
      occupiedSpaces
    );

    return Promise.resolve(parkingLot);
  }

  saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
    this.parkedCars.push({ code, plate, date });

    return Promise.resolve();
  }
}
