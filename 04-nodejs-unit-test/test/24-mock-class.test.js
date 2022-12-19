import { UserRepository } from "../src/24-user-repository.js";
import { UserService } from "../src/24-user-service.js";

jest.mock("../src/24-user-repository.js");

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock user save", () => {
  const user = {
    id: 1,
    name: "Rifki",
  };

  service.save(user);

  expect(repository.save).toHaveBeenCalled();
  expect(repository.save).toHaveBeenCalledWith(user);
});

test("test mock class findById", () => {
  const user = {
    id: 1,
    name: "Rifki",
  };

  repository.findById.mockReturnValueOnce(user);

  expect(service.findById(1)).toEqual(user);
  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledWith(1);
});

test("test mock class findByAll", () => {
  const user = [
    {
      id: 1,
      name: "Rifki",
    },
    {
      id: 1,
      name: "Rifki",
    },
  ];

  repository.findAll.mockReturnValueOnce(user);

  expect(service.findAll()).toEqual(user);
  expect(repository.findAll).toHaveBeenCalled();
});
