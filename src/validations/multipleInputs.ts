import translations from "../translations";
import { throwCustomMessage } from "../utils/helpers";
import { IMultipleParams } from "./interface"

export const shouldBeEqual = (params: IMultipleParams) => {
	const { key, value, lang, customMessage } = params;
	let allEqual = true;
	for (let i = 0; i < value.length - 1; i++) {
		if (value[i] !== value[i + 1]) {
			allEqual = false;
			break;
		}
	}

	if (!allEqual) {
		throwCustomMessage(customMessage);
		let message = translations[lang].FORM_VALIDATION_MESSAGES.MULTI_EQUAL;
		if (key && key.length > 0) {
			message = `${translations[lang].FORM_VALIDATION_MESSAGES.EQUAL}`;
			if (key.length === 2) {
				message = `${key[0]} ${message} ${key[1]}`;
			} else {
				message = key.join(', ') + translations[lang].FORM_VALIDATION_MESSAGES.MULTI_EQUAL_WITH_KEY;
			}
		}
		throw message;
	}
}

export const shouldBeNotEqual = (params: IMultipleParams) => {
	const { key, value, lang, customMessage } = params;
	let allEqual = false;
	for (let i = 0; i < value.length - 1; i++) {
		if (value[i] === value[i + 1]) {
			allEqual = true;
			break;
		}
	}

	if (allEqual) {
		throwCustomMessage(customMessage);
		let message = translations[lang].FORM_VALIDATION_MESSAGES.NOT_MULTI_EQUAL;

		if (key && key.length > 0) {
			message = `${translations[lang].FORM_VALIDATION_MESSAGES.NO_EQUAL}`;
			if (key.length === 2) {
				message = `${key[0]} ${message} ${key[1]}`;
			} else {
				message = key.join(', ') + translations[lang].FORM_VALIDATION_MESSAGES.NOT_MULTI_EQUAL_WITH_KEY;
			}
		}
		throw message;
	}
}