import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { ResponseError } from "../error/response-error.js";

async function create(user, request) {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
}

async function get(user, contactId) {
  contactId = validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found");
  }
  return contact;
}

async function update(user, request) {
  const contact = validate(updateContactValidation, request);
  const totalContact = await prismaClient.contact.count({
    where: {
      id: contact.id,
      username: user.username,
    },
  });

  if (totalContact !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.update({
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    where: {
      id: contact.id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
}

async function remove(user, contactId) {
  contactId = validate(getContactValidation, contactId);
  const totalContact = await prismaClient.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  if (totalContact !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
}

async function search(user, request) {
  request = validate(searchContactValidation, request);
  const skip = (request.page - 1) * request.size;
  const filters = [];
  filters.push({ username: user.username });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: { contains: request.name },
        },
        {
          last_name: { contains: request.name },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: { contains: request.email },
    });
  }
  if (request.phone) {
    filters.push({
      phone: { contains: request.phone },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_page: Math.ceil(totalItems / request.size),
      total_item: totalItems,
    },
  };
}

export default { create, get, update, remove, search };
