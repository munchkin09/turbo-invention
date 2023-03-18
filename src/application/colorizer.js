const colorsLight = {
  cloud: '\x1b[94m', // azul claro
  floor: '\x1b[92m', // verde claro
  foundation: '\x1b[91m', // rojo claro
  street: '\x1b[93m', // amarillo claro
  reset: '\x1b[0m', // reset
  characters: '\x1b[95m', // magenta claro
};

const colorsMatrix = {
  cloud: '\x1b[38;5;240m', // gris oscuro
  floor: '\x1b[38;5;34m', // verde oscuro
  foundation: '\x1b[48;5;22m', // verde oscuro
  street: '\x1b[38;5;28m', // verde oscuro
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;5;40m', // verde oscuro
};

const colorsLightBlue = {
  cloud: '\x1b[38;2;97;175;239m', // azul claro
  floor: '\x1b[38;2;152;195;121m', // verde claro
  foundation: '\x1b[38;2;208;135;112m', // rojo coral
  street: '\x1b[38;2;220;220;170m', // amarillo verdoso
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;171;178;191m', // gris claro
};

const colorsBloody = {
  cloud: '\x1b[38;2;255;0;0m', // rojo -> naranja
  floor: '\x1b[38;2;255;165;0m', // naranja -> amarillo
  foundation: '\x1b[38;2;255;255;0m', // amarillo -> verde
  street: '\x1b[38;2;0;128;0m', // verde -> azul
  reset: '\x1b[0m', // reset
  characters: '\x1b[38;2;0;0;255m', // azul -> añil
};

const themes = ['light', 'matrix', 'bloody',  'lightblue'];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];

const selectedColors = randomTheme === 'light' ? colorsLight :
                      randomTheme === 'matrix' ? colorsMatrix :
                      randomTheme === 'lightblue' ? colorsLightBlue :
                      randomTheme === 'bloody' ? colorsBloody:
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