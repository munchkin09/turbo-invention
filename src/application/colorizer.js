const colorsLight = {
  cloud: '\x1b[94m', // azul claro
  floor: '\x1b[92m', // verde claro
  foundation: '\x1b[91m', // rojo claro
  street: '\x1b[93m', // amarillo claro
  reset: '\x1b[0m', // reset
  characters: '\x1b[95m', // magenta claro
};

const colorsDark = {
  cloud: '\x1b[34m', // azul oscuro
  floor: '\x1b[32m', // verde oscuro
  foundation: '\x1b[31m', // rojo oscuro
  street: '\x1b[33m', // amarillo oscuro
  reset: '\x1b[0m', // reset
  characters: '\x1b[35m', // magenta oscuro
};
const colorsMatrix = {
  cloud: '\x1b[38;5;240m', // gris oscuro
  floor: '\x1b[38;5;34m', // verde oscuro
  foundation: '\x1b[48;5;22m', // verde oscuro
  street: '\x1b[38;5;28m', // verde oscuro
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;5;40m', // verde oscuro
};

const colorsDracula = {
  cloud: '\x1b[38;2;98;114;164m', // violeta claro
  floor: '\x1b[38;2;80;250;123m', // verde menta
  foundation: '\x1b[38;2;255;85;85m', // rojo coral
  street: '\x1b[38;2;189;147;249m', // morado claro
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;248;248;242m', // blanco
};

const colorsMaterial = {
  cloud: '\x1b[38;2;63;81;181m', // azul oscuro
  floor: '\x1b[38;2;139;195;74m', // verde claro
  foundation: '\x1b[38;2;244;67;54m', // rojo vivo
  street: '\x1b[38;2;255;152;0m', // naranja
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;33;33;33m', // negro
};
const colorsOneDark = {
  cloud: '\x1b[38;2;97;175;239m', // azul claro
  floor: '\x1b[38;2;152;195;121m', // verde claro
  foundation: '\x1b[38;2;208;135;112m', // rojo coral
  street: '\x1b[38;2;220;220;170m', // amarillo verdoso
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;171;178;191m', // gris claro
};
const colorsRainbow = {
  cloud: '\x1b[38;2;255;0;0m', // rojo -> naranja
  floor: '\x1b[38;2;255;165;0m', // naranja -> amarillo
  foundation: '\x1b[38;2;255;255;0m', // amarillo -> verde
  street: '\x1b[38;2;0;128;0m', // verde -> azul
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;0;0;255m', // azul -> añil
};

const themes = ['light', 'dark', 'matrix', 'dracula', 'material', 'onedark', 'rainbow'];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];

const selectedColors = randomTheme === 'light' ? colorsLight :
                      randomTheme === 'dark' ? colorsDark :
                      randomTheme === 'matrix' ? colorsMatrix :
                      randomTheme === 'dracula' ? colorsDracula :
                      randomTheme === 'material' ? colorsMaterial :
                      randomTheme === 'onedark' ? colorsOneDark :
                      randomTheme === 'rainbow' ? colorsRainbow:
                      colorsMatrix; // tema por defecto

console.warn('Random Theme: '+randomTheme);

function colorizeCharacter(character) {
  
  switch (character) {
      case '#':
          return `${selectedColors.cloud}${character}${selectedColors.reset}`;
      case 'I':
          return `${selectedColors.floor}${character}${selectedColors.reset}`;
      case '¡':
          return `${selectedColors.foundation}${character}${selectedColors.reset}`;
      case '_':
          return `${selectedColors.street}${character}${selectedColors.reset}`;
      default:
          return character;
  }
}

module.exports = {
  colorizeCharacter
};