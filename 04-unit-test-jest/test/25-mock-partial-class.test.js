import { UserRepository } from "../src/user-repository";
import { UserService } from "../src/user-service";

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock partial class UserRepository - findById(id)", () => {
  const user = { id: 1, name: "Hello World" };
  const findByIdMock = jest.spyOn(repository, "findById");
  findByIdMock.mockImplementation((id) => {
    return id === user.id ? user : "id not found";
  });

  expect(service.findById(1)).toEqual(user);
  expect(service.findById(2)).toEqual("id not found");

  expect(findByIdMock).toHaveBeenCalled();
  expect(findByIdMock).toHaveBeenCalledWith(1);

  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledWith(1);
});

test.failing("test mock partial class UserRepository - findAll()", () => {
  service.findAll();
});
