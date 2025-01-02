// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

// for example, these files become:

// 1. name.jpg
// 2. name.png
// 3. this.pdf
// 4. harry.zip
// 5. Rohan.zip
// 6. cat.jpg
// 7. harry.pdf

// this:
// jpg/name.jpg, jpg/cat.jpg
// png/name.png
// pdf/this.pdf pdf/harry.pdf
// zip/harry.zip zip/Rohan.zip

import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const basepath = "D:\\JS\\EX_15";

let files = await fsPromises.readdir(basepath);

for (const item of files) {
  console.log("running for ", item);
  let ext = item.split(".")[item.split(".").length - 1];
  if (ext != "js" && ext != "json" && item.split(".").length > 1) {
    if (fs.existsSync(path.join(basepath, ext))) {
      // Move the file to this directory if its not a js or json file
      await fsPromises.rename(
        path.join(basepath, item),
        path.join(basepath, ext, item)
      );
    } else {
      await fsPromises.mkdir(path.join(basepath, ext), { recursive: true });
      await fsPromises.rename(
        path.join(basepath, item),
        path.join(basepath, ext, item)
      );
    }
  }
}
