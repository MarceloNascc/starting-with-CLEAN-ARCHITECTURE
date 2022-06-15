import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";

test("Should get parking lot", async () => {
  const parkingLotRepository = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepository);

  const parkingLot = await getParkingLot.execute("shopping");
  expect(parkingLot?.code).toBe("shopping");
});

test("Should enter parking lot", async () => {
  // const parkingLotRepository = new ParkingLotRepositoryMemory();
  const parkingLotRepository = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepository);
  const getParkingLot = new GetParkingLot(parkingLotRepository);

  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter?.occupiedSpaces).toBe(0);

  await enterParkingLot.execute(
    "shopping",
    "NAN-6587",
    new Date("2021-03-01T10:00:00")
  );

  const parkingLotAfterEnter = await getParkingLot.execute("shopping");
  expect(parkingLotAfterEnter?.occupiedSpaces).toBe(1);
});

test("Should be closed", async () => {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepository);
  const getParkingLot = new GetParkingLot(parkingLotRepository);

  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter?.occupiedSpaces).toBe(0);

  const enterParkingLotPromise = enterParkingLot.execute(
    "shopping",
    "NAN-6587",
    new Date("2021-03-01T23:00:00")
  );

  expect(enterParkingLotPromise).rejects.toThrow("The parking lot is closed");
});

test("Should be full", async () => {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepository);
  const getParkingLot = new GetParkingLot(parkingLotRepository);

  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter?.occupiedSpaces).toBe(0);

  await enterParkingLot.execute(
    "shopping",
    "NAN-6587",
    new Date("2021-03-01T10:00:00")
  );
  await enterParkingLot.execute(
    "shopping",
    "NAN-6580",
    new Date("2021-03-01T10:00:00")
  );
  await enterParkingLot.execute(
    "shopping",
    "NAN-6581",
    new Date("2021-03-01T10:00:00")
  );
  await enterParkingLot.execute(
    "shopping",
    "NAN-6582",
    new Date("2021-03-01T10:00:00")
  );
  await enterParkingLot.execute(
    "shopping",
    "NAN-6583",
    new Date("2021-03-01T10:00:00")
  );
  const enterParkingLotPromise = enterParkingLot.execute(
    "shopping",
    "NAN-6585",
    new Date("2021-03-01T10:00:00")
  );

  expect(enterParkingLotPromise).rejects.toThrow("The parking lot is full");
});
