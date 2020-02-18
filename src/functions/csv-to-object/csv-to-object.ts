const fs = require("fs");
import slugify from "../slugify/index.js";
import writeFile from "../write-file/index";

/**
 * EN: Parses the string data to object
 * PT: Converte os dados de string para objeto
 *
 * @param data
 * EN: String with the csv data
 * PT: data em formato CSV numa longa string
 * @param delimiter
 * EN: CSV delimiter, default to comma (,)
 * PT: delimitador do CSV, padrão é virgula (,)
 */
function parseCSV(data: string, delimiter: string) {
  const dataAsArray = data.split(/\r\n/).map(v => v.split(delimiter));
  const objectKeys = dataAsArray[0];
  const objectValues = dataAsArray.slice(1);
  const dataAsObjects = objectValues.map((value: string[]) => {
    let obj = {};
    objectKeys.forEach(
      (key: string, i: number) => (obj[slugify(key)] = value[i])
    );
    return obj;
  });
  return dataAsObjects;
}

/**
 * EN: Reads a CSV file and converts it into a JSON file
 * PT: Converte um arquivo CSV em JSON
 *
 * @param inputFile
 * EN: path to the file to be read
 * PT: caminho para o arquivo a ser lido
 * @param outputFile
 * EN: path to the file to the JSON file written
 * PT: caminho para o arquivo JSON a ser escrito
 * @param delimiter
 * EN: CSV delimiter, default to comma (,)
 * PT: delimitador do CSV, padrão é virgula (,)
 */
function csvToObject(inputFile: string, outputFile: string, delimiter = ",") {
  fs.readFile(inputFile, "utf8", async (err: Error, data: string) => {
    if (err) return console.error(err);

    const content = JSON.stringify(parseCSV(data, delimiter));
    const outputPath = `${__dirname}/${outputFile}`;
    writeFile(outputPath, content);
  });
}

export default csvToObject;
