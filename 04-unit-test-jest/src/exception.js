export class MyException extends Error {}

export function callMe(name) {
  if (name === "Hello") {
    throw new MyException("Terjadi kesalahan");
  } else {
    return "OK";
  }
}
