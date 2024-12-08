import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

async function isContact(user, contactId) {
  contactId = validate(getContactValidation, contactId);
  const totalContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContact !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }
  return contactId;
}

async function create(user, contactId, request) {
  contactId = await isContact(user, contactId);
  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
}

async function get(user, contactId, addressId) {
  contactId = await isContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "Address is not found");
  }
  return address;
}

async function update(user, contactId, request) {
  contactId = await isContact(user, contactId);
  const address = validate(updateAddressValidation, request);
  const totalAddresses = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  if (totalAddresses !== 1) {
    throw new ResponseError(404, "Address is not found");
  }

  return prismaClient.address.update({
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    where: {
      id: address.id,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
}

async function remove(user, contactId, addressId) {
  contactId = await isContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const totalAddresses = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (totalAddresses !== 1) {
    throw new ResponseError(404, "Address is not found");
  }

  await prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
}

async function list(user, contactId) {
  contactId = await isContact(user, contactId);
  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
}

export default { create, get, update, remove, list };
