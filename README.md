# Bits and Bobs

Pieces of code I've had to re-write over and over again, saved here for future consultation

## Dependencies

- [Typescript](https://www.typescriptlang.org/)

## Functions

### csvToObject

Function that converts a CSV file into a JSON file. Example below

```javascript
csvToObject("input.csv", "output.json");
```

`input.csv`

```csv
Portal da Transparência do Município de Rio Branco,http://transparencia.riobranco.ac.gov.br/,Rio Branco,Rio Branco,AC,Brasil,Brasil,,Municipal
Portal da Transparência do Município de Maceió,http://www.transparencia.maceio.al.gov.br/,Maceió,Maceió,AL,Brasil,Brasil,,Municipal
Portal da Transparência do Município de Macapá,http://transparencia.macapa.ap.gov.br/transparenciafinancas/,Macapá,Macapá,AP,Brasil,Brasil,,Municipal
```

`output.json`

```json
[
  {
    "base": "Portal da Transparência do Município de Rio Branco",
    "link": "http://transparencia.riobranco.ac.gov.br/",
    "mantenedor": "Rio Branco",
    "cidade": "Rio Branco",
    "estado": "AC",
    "pais": "Brasil",
    "bandeira": "Brasil",
    "categoria": "",
    "tags": "Municipal"
  },
  {
    "base": "Portal da Transparência do Município de Maceió",
    "link": "http://www.transparencia.maceio.al.gov.br/",
    "mantenedor": "Maceió",
    "cidade": "Maceió",
    "estado": "AL",
    "pais": "Brasil",
    "bandeira": "Brasil",
    "categoria": "",
    "tags": "Municipal"
  },
  {
    "base": "Portal da Transparência do Município de Macapá",
    "link": "http://transparencia.macapa.ap.gov.br/transparenciafinancas/",
    "mantenedor": "Macapá",
    "cidade": "Macapá",
    "estado": "AP",
    "pais": "Brasil",
    "bandeira": "Brasil",
    "categoria": "",
    "tags": "Municipal"
  }
]
```

### objectToCSS

Function that converts a JSON file into a CSS variables file. Example below

```javascript
objectToCSS("input.json", "output.css");
```

`input.json`

```json
{
  "AZUL": {
    "HEX": "#004691",
    "RGB": "0, 70, 145"
  },
  "VERMELHO": {
    "HEX": "#ec1f37",
    "RGB": "236, 31, 55"
  },
  "TEXTO": {
    "HEX": "#d8d8d8",
    "RGB": "216, 216, 216"
  }
}
```

`output.css`

```css
/* THIS IS AN AUTO GENERATED FILE */
/* PLEASE DO NOT EDIT THIS DIRECTLY */

:root {
  --azul-hex: #004691;
  --azul-rgb: 0, 70, 145;
  --vermelho-hex: #ec1f37;
  --vermelho-rgb: 236, 31, 55;
  --texto-hex: #d8d8d8;
  --texto-rgb: 216, 216, 216;
}
```
