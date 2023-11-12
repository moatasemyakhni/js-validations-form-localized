import { IValidations, TRules, TRulesKeys } from "./interface";
import { TAcceptedLanguages } from "./translations";
import { IParams } from "./validations/interface";
import { shouldBeEqual } from "./validations/multipleInputs";
import {
	isEmpty,
	isLessMBSize,
	isLessThanMinLength,
	isPassedMaxLength,
	isPassedMaxMBSize,
	isValidEmail
} from "./validations/singleInput";


export const validate = (
	validations: IValidations[],
	lang: TAcceptedLanguages = 'en'
) => {
	try {

		validations.map((validation, _) => {

			const { rules, prefix: key, value, customMessages } = validation;
			// no error check up
			if (rules.length === 0) return;

			let customMessage: IParams['customMessage'] = null;

			if (typeof customMessages === 'string') {
				// all rules have on common custom Message
				customMessage = customMessages;
			}

			rules.map((rule, i) => {
				if (Array.isArray(customMessages)) {
					if (customMessages[i]) {
						customMessage = customMessages[i];
					}
				}

				let switchKey: TRulesKeys;
				let limit: number | undefined;

				if (rule.includes(':')) {
					const ruleArr = rule.split(':');
					switchKey = ruleArr[0] as TRulesKeys;
					limit = Number(ruleArr[1]);
				} else {
					switchKey = rule as TRulesKeys;
					limit = undefined;
				}

				if (!Array.isArray(key) && !Array.isArray(value)) {
					switch (switchKey) {
						case 'required':
							isEmpty({ key, customMessage, lang, limit, value });
							break;

						case 'email':
							isValidEmail({ key, lang, customMessage, limit, value })
							break;

						case 'min':
							isLessThanMinLength({ key, value, limit, customMessage, lang });
							break;

						case 'max':
							isPassedMaxLength({ key, value, limit, customMessage, lang });
							break;

						case 'minMB':
							isLessMBSize({ key, value, limit, customMessage, lang });
							break;

						case 'maxMB':
							isPassedMaxMBSize({ key, value, limit, customMessage, lang });
							break;

						default:
							break;
					}

				}

				if ((Array.isArray(key) || key === undefined) && Array.isArray(value)) {
					switch (switchKey) {
						case 'equal':
							shouldBeEqual({ key, value, customMessage, lang });
							break;

						case 'notEqual':
							shouldBeEqual({ key, value, customMessage, lang });
							break;

						default:
							break;
					}
				}

			});
		});
	} catch (error: any) {
		throw Error(error);
	}
}