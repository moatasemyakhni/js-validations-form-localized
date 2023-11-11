import { IMultipleParams, IParams } from "./validations/interface";

type MinRule = `min:${number}`;
type MaxRule = `max:${number}`;


export type TRules = 'bail' | 'required' | 'email' | 'equal' | 'notEqual' | MinRule | MaxRule | `maxMB:${number}` | `minMB:${number}`;


export type TRulesKeys = 'bail' | 'required' | 'email' | 'equal' | 'notEqual' | 'min' | 'max' | 'maxMB' | 'minMB';

export type TKey = string;

export type TValue = string | number;

export type TCustomMessages = string | null;

// export type IValidations = {
// 	rules: TRules[],
// 	// keys?: TKey | TKey[],
// 	// values?: TValue | TValue[],
// 	// customMessages?: TCustomMessages[] | TCustomMessages,
// } & IParams & IMultipleParams;

export type IValidations = {
	rules: TRules[],
	prefix: IParams['key'] | IMultipleParams['key'],
	customMessage?: IParams['customMessage'],
	value: IParams['value'] | IMultipleParams['value']
}