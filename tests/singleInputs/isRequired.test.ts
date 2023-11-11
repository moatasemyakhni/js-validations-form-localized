import translations from "../../src/translations";
import { IParams } from "../../src/validations/interface"
import { isEmpty } from "../../src/validations/singleInput"

const originalData: IParams = {
	lang: 'en',
	value: '',
	key: 'Hello World',
	customMessage: 'Error Message'
};

test('error custom message of isRequired', () => {
	const data = { ...originalData };
	try {
		isEmpty(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(data.customMessage);
	}
});


test('error default message where value is select', () => {
	const data = { ...originalData };
	data.value = 'select';
	try {
		data.customMessage = null;
		isEmpty(data);

		expect(false).toBeTruthy();
	} catch (error) {
		expect(error).toStrictEqual(`${data.key} ${translations[data.lang].FORM_VALIDATION_MESSAGES.IS_REQUIRED}`);
	}
});

test('that error will not occur if there is a value', () => {
	const data = { ...originalData };
	try {
		data.value = "Hello world";
		isEmpty(data);
		data.value = 123;
		isEmpty(data);
	} catch (error) {
		expect(false).toBeTruthy();
	}

});