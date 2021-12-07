/*
  These snippets are just small utility functions to help with printing data to a div for debugging,
  or generating a random colour hex string for the login form.
*/

/**
 * Converts a vector to a string for debug printing.
 * @param {THREE.Vector3} v Vector to convert.
 * @returns {string} Text represtation of the vector.
 */
function vectorToString(v) {
  return `(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;
}

// Accumulate text to display.
let toPrint = '';
function print(...params) {
  toPrint += params.join(' ') + '<br/>';
}

// Display the text and clear the buffer for next frame.
function showReadout(readout) {
  readout.innerHTML = toPrint;
  toPrint = '';
}


/**
 * Generates a random colour in hex format.
 * @returns {number} 24-bit number represenging 3 bytes of RGB colour values.
 */
function randomColourHex() {
  const maxVal = 0xFFFFFF;
  const randomNumber = Math.random() * maxVal;
  return Math.floor(randomNumber);
}

/**
 * Converts an integer to a hexidecimal string.
 * @param {number} rgb component of integer type.
 * @returns {string} hexidecimal component.
 */
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
/* Taken from Tim Down on StackOverflow
 * @param {number[]} triplet, an array of RGB values in the range 0-1.
 * @returns {string} hexidecimal string.
 */
function rgbToHex(rgb) {
  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

/* Taken from Tim Down on StackOverflow
 * @param {string} input hex value.
 * @returns {number[]} triplet, an array of RGB values in the range.
 */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}


/**
 * Converts a number representing an RGB or RGBA colour into a hexadecimal string.
 * @param {number} colour 
 * @returns {string} Text representation of this number in hexadecimal.
 */
function colourHexToString(colour) {
  return colour.toString(16);
}

/**
 * Unpacks a colour represented by a single 3 or 4-byte number as an array of values 0-1.
 * @param {number} colourHex a number representing a 24-bit RGB colour or 32-bit RGBA colour.
 * @returns {number[]} the colour as an array of RGB(A) values in the range 0-1, in order [R, G, B, (A)].
 */
function colourHexToTriplet(colourHex) {
  const fourBytes = colourHex > 0xFFFFFF;
  const output = fourBytes ? [0, 0, 0, 0] : [0, 0, 0];
  // Detect whether we have a 3 or 4-byte 
  let i = output.length - 1;
  while (colourHex > 0) {
    const byte = colourHex & 0xFF;
    output[i] = byte / 255.0;
    colourHex >>= 8;
    i--;
  }
  return output;
}
/**
 * normalizes a colour value from 0-255 to 0-1.
 * @param {number[]} colour triplet of rgb values ranging from 0-255.
 * @returns {number[]} colour triplet of rgb values ranging from 0-1.
 */
function normalizeColour(colourTriplet) {
  colourTriplet[0] /= 255;
  colourTriplet[1] /= 255;
  colourTriplet[2] /= 255;
  return colourTriplet;
}


//capitalizes the first character in a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Generates a random name using random adjective and noun
function generateName() {
  const adjectiveList = ['adorable', 'adventurous', 'aggressive', 'angry', 'anxious', 'bad', 'black', 'bored', 'brainy', 'calm', 'careful', 'beautiful', 'lone', 'red', 'purple', 'pink',
    'brown', 'white', 'green', 'orange', 'cool', 'swaggy', 'interesting', 'intelligent', 'smart', 'clumsy', 'funny', 'charismatic', 'cheerful', 'charming', 'curious', 'crazy', 'dangerous',
    'clever', 'cooperative', 'busy', 'brave', 'courageous', 'eager', 'evil', 'gorgeous', 'gifted', 'fragile', 'healthy', 'hungry', 'lonely', 'mysterious', 'shy', 'ugly', 'talented', 'witty'];
  const nounList = ['bear', 'coyote', 'human', 'individual', 'person', 'cat', 'dog', 'player', 'wolf', 'tiger', 'leopard', 'parrot', 'bird', 'fish', 'animal', 'gamer', 'athlete', 'teacher'
    , 'student', 'driver', 'runner', 'singer', 'dancer', 'pedestrian', 'cow', 'pig', 'chicken', 'engineer', 'doctor', 'nurse', 'firefighter', 'warrior', 'soldier', 'mage', 'knight', 'baker',
    'chef', 'emperor', 'actor', 'flower', 'horse', 'kangaroo', 'lizard', 'monkey', 'zebra', 'ghost', 'magician', 'elephant', 'canadian', 'apple', 'specimen', 'unit', 'citizen'];

  let adjective = capitalizeFirstLetter(adjectiveList[Math.floor(Math.random() * adjectiveList.length)]);
  let noun = capitalizeFirstLetter(nounList[Math.floor(Math.random() * nounList.length)]);
  return `${adjective} ${noun}`;
}

/**
 * Packs a triplet of colour values into a single 3-byte number.
 * @param {number[]} triplet an array of RGB values in the range 0-1.
 * @returns {number} a 24-bit unsigned integer representing an RGB colour.
 */
function colourTripletToHex(triplet) {
  let output = 0;
  for (let i = 0; i < 3; i++) {
    output += Math.floor(triplet[2 - i] * 0xFF) << (8 * i);
  }
  return output;
}

function azimuthFromQuaternion(q) {
  let s = 2 * (q._w * q._y + q._z * q._x);
  let c = 1 - 2 * (q._x * q._x + q._y * q._y);
  return Math.atan2(s, c);
}

export { vectorToString, print, showReadout, randomColourHex, colourHexToString, colourHexToTriplet, colourTripletToHex, azimuthFromQuaternion, hexToRgb, rgbToHex, normalizeColour, generateName}