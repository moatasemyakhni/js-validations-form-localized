import translations from "../../src/translations";
import { IMultipleParams } from "../../src/validations/interface";
import { shouldBeEqual, shouldBeNotEqual } from "../../src/validations/multipleInputs";


const originalData: IMultipleParams = {
	lang: 'fr',
	value: ['Hello World', 'Hi World'],
	customMessage: 'Custom Message',
	key: ['pwd', 'confirm pwd'],
};

test('custom error in shouldBeEqual', () => {
	const data = { ...originalData };
	try {
		shouldBeEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(data.customMessage);
	}
});

test('default error in shouldBeEqual with no keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = undefined;
	try {
		shouldBeEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(translations[data.lang].FORM_VALIDATION_MESSAGES.MULTI_EQUAL);
	}
});

test('default error in shouldBeEqual with 2 keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = ['Hello world', 'Hello World'];
	data.value = ['123', 123];

	try {
		shouldBeEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		let message = `${translations[data.lang].FORM_VALIDATION_MESSAGES.EQUAL}`;
		message = `${data.key[0]} ${message} ${data.key[1]}`;
		expect(error).toEqual(message);
	}
});

test('default error in shouldBeEqual with multiple keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = ['Hello world', 'Hello World', 'james'];
	data.value = ['123', 123, "HI"];
	try {
		shouldBeEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		let message = data.key.join(', ') + translations[data.lang].FORM_VALIDATION_MESSAGES.MULTI_EQUAL_WITH_KEY;
		expect(error).toEqual(message);
	}
});

test('no error in shouldBeEqual occur', () => {
	const data = { ...originalData };
	data.key = ['HI', 'HELLO', 'HEY'];
	data.value = [123, 123, 123];
	try {
		shouldBeEqual(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});


// no equal

test('custom error in shouldBeNotEqual', () => {
	const data = { ...originalData };
	data.value = [123, 123];
	try {
		shouldBeNotEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(data.customMessage);
	}
});

test('default error in shouldBeNotEqual with no keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = undefined;
	data.value = [123, 123];
	try {
		shouldBeNotEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(translations[data.lang].FORM_VALIDATION_MESSAGES.NOT_MULTI_EQUAL);
	}
});

test('default error in shouldBeNotEqual with 2 keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = ['Hello world', 'Hello World'];
	data.value = ["SAME VALUE", "SAME VALUE"];

	try {
		shouldBeNotEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		let message = `${translations[data.lang].FORM_VALIDATION_MESSAGES.NO_EQUAL}`;
		message = `${data.key[0]} ${message} ${data.key[1]}`;
		expect(error).toEqual(message);
	}
});

test('default error in shouldBeNotEqual with multiple keys', () => {
	const data = { ...originalData };
	data.customMessage = null;
	data.key = ['Hello world', 'Hello World', 'james'];
	data.value = [123, 123, 123];

	try {
		shouldBeNotEqual(data);
		expect(false).toBeTruthy();
	} catch (error) {
		let message = data.key.join(', ') + translations[data.lang].FORM_VALIDATION_MESSAGES.NOT_MULTI_EQUAL_WITH_KEY;
		expect(error).toEqual(message);
	}
});

test('no error in shouldBeNotEqual occur', () => {
	const data = { ...originalData };
	data.key = ['HI', 'HELLO', 'HEY'];
	data.value = ['123', 1.23, 44];
	try {
		shouldBeNotEqual(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});