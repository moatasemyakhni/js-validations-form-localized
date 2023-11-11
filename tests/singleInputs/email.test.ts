import translations from "../../src/translations";
import { IParams } from "../../src/validations/interface";
import { isValidEmail } from "../../src/validations/singleInput";

const originalData: IParams = {
	lang: 'ar',
	customMessage: "HELLO WORLD",
	value: 'test and testing',
};

test('custom error in email format', () => {
	const data = { ...originalData };
	try {
		isValidEmail(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(data.customMessage);
	}
});

test('default error in email format', () => {
	const data = { ...originalData };
	data.customMessage = null;
	try {
		isValidEmail(data);
		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toEqual(translations[data.lang].FORM_VALIDATION_MESSAGES.EMAIL_FORMAT);
	}
});


test('email format is correct', () => {
	const data = { ...originalData };

	try {
		data.value = 'test@gmail.com';
		isValidEmail(data);
		data.value = 'test@hotmail.com'
		isValidEmail(data);
		data.value = 'test@company.io';
		isValidEmail(data)
	} catch (error) {
		expect(false).toBeTruthy();
	}
});
