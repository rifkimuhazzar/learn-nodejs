import addressService from "../service/address-service.js";

async function create(req, res, next) {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    const result = await addressService.create(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const result = await addressService.get(user, contactId, addressId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = req.params.addressId;

    const result = await addressService.update(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    await addressService.remove(user, contactId, addressId);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const result = await addressService.list(user, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export default { create, get, update, remove, list };
