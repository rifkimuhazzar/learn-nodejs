import { EventEmitter } from "events";

const emitter = new EventEmitter();

emitter.addListener("hi", (name) => console.info(`Hi, ${name}`));
emitter.addListener("hi", (name) => console.info(`Hi, ${name}`));

emitter.emit("hi", "Rifki");
