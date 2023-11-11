import translations from "../translations";
import { throwCustomMessage } from "../utils/helpers";
import { IParams } from "./interface";


export const isEmpty = (params: IParams) => {
	const { key, value, customMessage, lang } = params;
	if (!value || value === 'select') {
		throwCustomMessage(customMessage);
		throw `${key} ${translations[lang].FORM_VALIDATION_MESSAGES.IS_REQUIRED}`;
	}
}

export const isPassedMaxMBSize = (params: IParams) => {
	const { key, value, customMessage, lang, limit } = params;
	if (typeof value === 'number' && limit) {
		if (value > limit) {
			throwCustomMessage(customMessage);
			throw `${key} ${translations[lang].FORM_VALIDATION_MESSAGES.MOST} ${limit} ${translations[lang].FORM_VALIDATION_MESSAGES.MB}`;
		}
	}
}

export const isLessMBSize = (params: IParams) => {
	const { key, value, customMessage, lang, limit } = params;
	if (typeof value === 'number' && limit) {
		if (value < limit) {
			throwCustomMessage(customMessage);
			throw `${key} ${translations[lang].FORM_VALIDATION_MESSAGES.LEAST} ${limit} ${translations[lang].FORM_VALIDATION_MESSAGES.MB}`;
		}
	}
}

export const isPassedMaxLength = (params: IParams) => {
	const { key, value, customMessage, lang, limit } = params;
	const val = typeof value === 'string' ? value.length : value;
	if (val && limit) {
		if (val > limit) {
			throwCustomMessage(customMessage);
			throw `${key} ${translations[lang].FORM_VALIDATION_MESSAGES.MOST} ${limit} ${typeof value !== 'number' ? translations[lang].FORM_VALIDATION_MESSAGES.CHARS : ''}`;
		}
	}
}

export const isLessThanMinLength = (params: IParams) => {
	const { key, value, customMessage, lang, limit } = params;
	const val = typeof value === 'string' ? value.length : value;
	if (val && limit) {
		if (val < limit) {
			throwCustomMessage(customMessage);
			throw `${key} ${translations[lang].FORM_VALIDATION_MESSAGES.LEAST} ${limit} ${typeof value !== 'number' ? translations[lang].FORM_VALIDATION_MESSAGES.CHARS : ''}`;
		}
	}
}

export const isValidEmail = (params: IParams) => {
	const { value, customMessage, lang } = params;
	const regex = /^(\w([\.-]?\w)*)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (value && typeof value === 'string' && !regex.test(value)) {
		throwCustomMessage(customMessage);
		throw translations[lang].FORM_VALIDATION_MESSAGES.EMAIL_FORMAT;
	}
}

