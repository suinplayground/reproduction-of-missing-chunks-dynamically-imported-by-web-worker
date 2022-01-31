console.log("Hello from worker.js");

// dynamic import
import("./myModule.js").then(() => {
  console.log("myModule.js was imported")
});

export default undefined;
