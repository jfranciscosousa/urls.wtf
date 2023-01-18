const CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";

function getCryptoRandomBetween(min: number, max: number): number {
	const MAX_VAL = 4294967295;
	const numberOfRandomsNeeded = Math.ceil((max - min) / MAX_VAL);
	let cryptoRandomNumbers = new Uint32Array(numberOfRandomsNeeded);
	cryptoRandomNumbers = crypto.getRandomValues(cryptoRandomNumbers);

	const sum = cryptoRandomNumbers.reduce((memo, current) => memo + current, 0);
	const randomDecimal = sum / (MAX_VAL * numberOfRandomsNeeded);

	// If result is 1, retry. otherwise, return decimal.
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
