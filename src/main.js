import MyWorker from "./worker.js?worker";

new MyWorker();
// new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
