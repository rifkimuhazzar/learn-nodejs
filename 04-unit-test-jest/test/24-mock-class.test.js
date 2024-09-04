import { UserRepository } from "../src/user-repository";
import { UserService } from "../src/user-service";

jest.mock("../src/user-repository");

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock class UserRepository - save(user)", () => {
  const user = { id: 1, name: "Hello World" };
  service.save(user);

  expect(repository.save).toHaveBeenCalled();
  expect(repository.save).toHaveBeenCalledTimes(1);
  expect(repository.save).toHaveBeenCalledWith(user);
});

test("test mock class UserRepository - finById(Id)", () => {
  const user = { id: 1, name: "Hello World" };
  repository.findById.mockImplementation((id) => {
    return id === user.id ? user : "id not found";
  });

  expect(service.findById(1)).toEqual(user);
  expect(service.findById(22)).toEqual("id not found");

  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledTimes(2);
  expect(repository.findById).toHaveBeenCalledWith(1);
  expect(repository.findById).toHaveBeenCalledWith(22);
});

test("test mock class UserRepository - findAll()", () => {
  const users = [
    { id: 1, name: "Hello" },
    { id: 2, name: "World" },
  ];
  repository.findAll.mockReturnValueOnce(users);

  expect(service.findAll()).toEqual(users);

  expect(repository.findAll).toHaveBeenCalled();
  expect(repository.findAll).toHaveBeenCalledTimes(1);
});
