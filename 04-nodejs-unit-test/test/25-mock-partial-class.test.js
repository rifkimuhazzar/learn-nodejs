import { UserRepository } from "../src/24-user-repository.js";
import { UserService } from "../src/24-user-service.js";

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock partial class findById", () => {
  const user = {
    id: 1,
    name: "name",
  };

  const findByIdMock = jest.spyOn(repository, "findById"); // hanya menjadikan mock function findById saja
  findByIdMock.mockReturnValueOne(user);

  expect(service.findById(1)).toEqual(user);

  expect(findByIdMock).toHaveBeenCalled();
  expect(findByIdMock).toHaveBeenCalledWith(1);

  // sama dengan menggunakan variable findByIdMock
  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledWith(1);
});

test.failing("test mock partial class findAll", () => {
  service.findAll();
});
