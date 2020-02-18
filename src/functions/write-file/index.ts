import fs from "fs";

function writeFile(outputPath: string, content: any) {
  fs.writeFile(outputPath, content, err => {
    if (err) return console.log(err);
    console.log("The file was saved!");
  });
}

export default writeFile;
