import translations from "../../src/translations";
import { IParams } from "../../src/validations/interface";
import { 
	isLessMBSize, 
	isLessThanMinLength, 
	isPassedMaxLength, 
	isPassedMaxMBSize 
} from "../../src/validations/singleInput";



const originalData: IParams = {
	lang: 'en',
	value: 123,
	limit: 100,
	key: 'Hello World',
	customMessage: 'Error Message',
};

test('error custom message of isPassedMaxLength', () => {
	const data = { ...originalData };
	try {
		isPassedMaxLength(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(data.customMessage);
	}
});


test('error default message of isPassedMaxLength with string', () => {
	const data = { ...originalData };
	try {
		data.customMessage = null;
		data.limit = 3;
		data.value = "HELLO World";
		isPassedMaxLength(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.MOST} ${data.limit} ${translations[data.lang].FORM_VALIDATION_MESSAGES.CHARS}`);
	}
});

test('error default message of isPassedMaxLength with number', () => {
	const data = { ...originalData };

	try {
		data.customMessage = null;
		isPassedMaxLength(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.MOST} ${data.limit} `);
	}
});

test('no error should occur in isPassedMaxLength', () => {
	try {
		const data = { ...originalData };

		data.limit = 100;
		data.value = 50;
		isPassedMaxLength(data);
		data.value = "Hello";
		isPassedMaxLength(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});


// min part

test('error custom message of isLessThanMinLength', () => {
	const data = { ...originalData };
	try {
		data.limit = 100;
		data.value = 99;
		isLessThanMinLength(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(data.customMessage);
	}
});


test('error default message of isLessThanMinLength with string', () => {
	const data = { ...originalData };
	try {
		data.customMessage = null;
		data.limit = 3;
		data.value = "Hi";
		isLessThanMinLength(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.LEAST} ${data.limit} ${translations[data.lang].FORM_VALIDATION_MESSAGES.CHARS}`);
	}
});

test('error default message of isLessThanMinLength with number', () => {
	const data = { ...originalData };

	try {
		data.customMessage = null;
		data.limit = 3;
		data.value = 2;
		isLessThanMinLength(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.LEAST} ${data.limit} `);
	}
});

test('no error should occur in isLessThanMinLength', () => {
	try {
		const data = { ...originalData };

		data.limit = 4;
		data.value = 9999;
		isLessThanMinLength(data);
		data.value = "Hello world";
		isLessThanMinLength(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});



// mb

test('error custom message of isPassedMaxMBSize', () => {
	const data = { ...originalData };
	try {
		isPassedMaxMBSize(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(data.customMessage);
	}
});


test('error default message of isPassedMaxMBSize with number', () => {
	const data = { ...originalData };

	try {
		data.customMessage = null;
		isPassedMaxMBSize(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.MOST} ${data.limit} ${translations[data.lang].FORM_VALIDATION_MESSAGES.MB}`);
	}
});

test('no error should occur in isPassedMaxMBSize', () => {
	try {
		const data = { ...originalData };

		data.limit = 100;
		data.value = 50;
		isPassedMaxLength(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});


// min mb part

test('error custom message of isLessMBSize', () => {
	const data = { ...originalData };
	try {
		data.limit = 100;
		data.value = 99;
		isLessMBSize(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(data.customMessage);
	}
});


test('error default message of isLessMBSize with number', () => {
	const data = { ...originalData };

	try {
		data.customMessage = null;
		data.limit = 3;
		data.value = 2;
		isLessMBSize(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.LEAST} ${data.limit} ${translations[data.lang].FORM_VALIDATION_MESSAGES.MB}`);
	}
});

test('no error should occur in isLessMBSize', () => {
	try {
		const data = { ...originalData };

		data.limit = 4;
		data.value = 9999;
		isLessMBSize(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}
});