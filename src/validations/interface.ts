import { TAcceptedLanguages } from "../translations";

export interface IParams {
	key?: string,
	value?: string | number,
	customMessage?: null | string,
	lang: TAcceptedLanguages,
	limit?: number
};

export interface IMultipleParams {
	key?: string[],
	value: (string | number)[],
	lang: TAcceptedLanguages,
	customMessage?: null | string,
};