const fs = require("fs");
import writeFile from "../write-file/index";

/**
 * EN: Converts values of different units according to the given proportion
 * PT: Converte o valores entre unidades na sua devida proporção
 *
 * @param {Number} value
 *  EN: the current value, without unit
 *  PT: valor corrente da variável, sem unidade
 * @param {Number} proportion
 * EN: proportion between units (ex 1s => 1000ms)
 * PT: proporção entre as unidades (ex 1s => 1000ms)
 * @param {String} newUnit
 * EN: unit of the output value (ex "ms")
 * PT: unidade do valor convertido (ex "ms")
 * @returns {String}
 * EN: converted value with its unit
 * PT: valor convertido concatenado a sua unidade
 */
function convertBetweenUnits(
  value: number,
  proportion: number,
  newUnit?: string
): string {
  const newValue = value / proportion;
  return `${newValue}${newUnit ? newUnit : ""};`;
}

/**
 * EN: Handles unit conversion in case it is necessary
 * PT: Lida com a conversão de valores de acordo com as unidades
 * Ex:
 * - 10px -> 1rem
 * - 15ms -> 0.15s
 * - 40% -> 0.4
 *
 * @param {Number} variable
 * EN: variable value, with its unit
 * PT: valor da variavel, com a unidade
 * @returns {String | Number}
 * EN: converted value, with our without unit
 * PT: valor convertido, com ou sem unidade
 */
function handleUnits(variable: string) {
  const unit = variable.replace(/[0-9]/g, "");
  const value = parseInt(variable.replace(/a-zA-Z/g, ""), 10);
  switch (unit) {
    case "px":
      // EN: converts pixels into rems in 1 to 10 proportion
      // PT: converte pixels em rems mna proporção de 1 pra 10
      return convertBetweenUnits(value, 10, "rem");
    case "%":
      return convertBetweenUnits(value, 100);
    case "ms":
      return convertBetweenUnits(value, 100, "s");
    default:
      return variable;
  }
}

/**
 * EN: Converts an object into a string array that represents the CSS variables.
 *     All object keys are concatenated, separated by a hyphen (-), as in a breadcrumb.
 *     The final value is associated to the key separated by a colon (:).
 *     Ex: { color: { white: { hex: #fff, rgb: 255, 255, 255 } } }
 *         [ '--color-white-hex: #fff;', '--color-white-rga: 255, 255, 255;' ]
 *
 * PT: Converte um objeto em um array que representa as variáveis de CSS.
 *     As chaves do objeto são concatenadas, separadas por um hífen ('-'), como em um breadcrumb.
 *     O valor final é associado a esse breadcrumb separado por dois pontos (:).
 *     Ex: { cor: { branco: { hex: #fff, rgb: 255, 255, 255 } } }
 *         [ '--cor-branco-hex: #fff;', '--cor-branco-rga: 255, 255, 255;' ]
 *
 * @param {*} obj
 * EN: object with the data to be converted to CSS variables
 * PT: objeto com as informações a serem convertidas em variáveis CSS
 * @param {Strint} [prefix]
 * EN: optional, prefix to be added to the begining of the concatenation
 * PT: opcional, prefixo adicionado ao início da concatenação
 * @returns
 */
function createVariables(obj: any, prefix?: string) {
  return (
    Object.entries(obj)
      .map(([key, value]) => {
        if (value === null) return;

        // EN: if `value` is an object, parse it recursively
        // PT: se `value` for um objeto, parsear recursivamente
        if (typeof value === "object") {
          const newPrefix = prefix ? `${prefix}-${key}` : key;
          return createVariables(value, newPrefix);
        }

        // EN: if `value` is a string, go through unit handling
        // PT: se `value` for uma string, passá-lo pela função de conversão de unidades
        if (typeof value == "string") {
          value = handleUnits(value);
        }

        // EN: build the css variable string and converts it to lowercase
        // PT: monta a string da variável de CSS e converte para caixa baixa
        const cssVariable = `-${
          prefix ? `-${prefix}-` : "-"
        }${key}: ${value};\n`.toLowerCase();
        return cssVariable;
      })
      // join avoids the inclusion of a comma character by `map` function
      // `join` evita que a função `map` inclua um caracter de vírgula
      .join("")
  );
}

/**
 * EN: mounts the string that will be written in the file
 * PT: monta a string que será escrita no arquivo
 * @param {String} variables
 */
function getFileContent(variables: string) {
  return `
/* THIS IS AN AUTO GENERATED FILE */
/* PLEASE DO NOT EDIT THIS DIRECTLY */

:root {
${variables}}`;
}

/**
 * EN: Creates the CSS file with the variables in the designated folder
 * PT: Cria o arquivo das variáveis de CSS na pasta de styles
 *
 * @param {object[]} data
 * EN: array with the objects to be converted
 * PT: array como os objects a serem convertidos
 * @param {String} filepath
 * EN: filename of the file to be created
 * PT: nome do arquivo a ser criado
 */
function objectToCSS(data: object[], outputFile: string) {
  const variables = data.map(obj => createVariables(obj)).join("");
  const content = getFileContent(variables);
  const outputPath = `${__dirname}/${outputFile}`;
  writeFile(outputPath, content);
}

export default objectToCSS;
