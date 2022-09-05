const CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";

function getCryptoRandomBetween(min: number, max: number): number {
  //the highest random value that crypto.getRandomValues could store in a Uint32Array
  var MAX_VAL = 4294967295;

  //find the number of randoms we'll need to generate in order to give every number between min and max a fair chance
  var numberOfRandomsNeeded = Math.ceil((max - min) / MAX_VAL);

  //grab those randoms
  var cryptoRandomNumbers = new Uint32Array(numberOfRandomsNeeded);
  crypto.getRandomValues(cryptoRandomNumbers);

  //add them together
  for (var i = 0, sum = 0; i < cryptoRandomNumbers.length; i++) {
    sum += cryptoRandomNumbers[i];
  }

  //and divide their sum by the max possible value to get a decimal
  var randomDecimal = sum / (MAX_VAL * numberOfRandomsNeeded);

  //if result is 1, retry. otherwise, return decimal.
  return randomDecimal === 1
    ? getCryptoRandomBetween(min, max)
    : Math.floor(randomDecimal * (max - min + 1) + min);
}

function getRandomChar() {
  return CHARACTERS.charAt(getCryptoRandomBetween(0, CHARACTERS.length - 1));
}

export default function secureRandomString(length: number) {
  for (var i = 0, str = ""; i < length; i++) str += getRandomChar();

  return str;
}
