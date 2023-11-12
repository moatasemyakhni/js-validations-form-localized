# js-validations-form-localized v1.0.0

Validation function for inputs in **JS**; its libraries and frameworks.

This package provides a validator function that can be used to perform validation checks on form inputs. It includes a set of rules that can be used to ensure that the values entered in the form meet the required criteria, such as being of a certain length or format. The function can be easily customized to fit the specific needs of your project, and it comes with translations for various languages such as English, French and Arabic...

# TOC
* [Installation](#installation)
* [Usage](#usage)
* [Interfaces](#interfaces)
* [Messages](#default-messages)

# Installation

```
yarn add js-validations-form-localized
```

### or

```
npm install js-validations-form-localized
```

# Usage

```js
import { validate } from 'js-validations-form-localized';

const handleSubmitForm = async () => {
	try {
		const data = [
			{
				rules: ['email', 'min: 32', 'max:255'],
				value: emailInput,
				// overrides all rules default messages
				customMessages: "Email is wrong",
			},
			{
				rules: ['required', 'min: 6', 'max:32'],
				value: phoneInput,
				prefix: 'phone',
				// overrides rules[0] ('required') and rules[2] ('max:32') default messages 
				// while leaving rules[1] (min:6) with its default message
				customMessages: ['custom msg 1', null, 'custom message2']
			},
			{
				rules: ['equal'],
				value: [password, confirmPassword],
				prefix: ['password', 'confirm password'],
			}
		];
		validate(data, 'en');

		// continue with valid data
	} catch (e) {
		// handle error message
		console.log(e);
		alert(e.message);
	}
}
```

## Parameters

| parameter | required | Default value | interface |
| :---: | :---: | :---: | :----: |
| data | YES | undefined | [IValidations[]](#validations)
| lang | NO | 'en' | [TAcceptedLanguages](#accepted-languages)


# Interfaces

### Validations

```js
interface IValidations {
	rules: 'required' | 'email' | 'equal' | 'notEqual' | `min:<number>` | `max:<number>` | `maxMB:<number>` | `minMB:<number>`,
	prefix?: string | string[],
	customMessages?: string | null | string[],
	value: (string | number) | (string | number)[]
}
```
### Accepted languages

```js
type TAcceptedLanguages = 'ar' | 'en' | 'fr'
```

# Default Messages


| rule | en | fr | ar |
| --- | --- | --- | ---- |
| required | ${prefix} is required | ${prefix} مطلوب | ${prefix} est requis
| email | wrong email format | mauvais format d'email | بريد إلكتروني غير صحيح |
| max:3 (value is string) | ${prefix} should be at most 3 chars | ${prefix} devrait être au maximum 3 caractères | ${prefix} يجب أن يكون اقل من 3 احرف |
| max:100 (value is number) | ${prefix} should be at most 100 | ${prefix} devrait être au maximum 100 | ${prefix} يجب أن يكون اقل من 100 |
| min:3 (value is string) | ${prefix} should be at least 3 chars | ${prefix} devrait être au moins 3 caractères | ${prefix} يجب ان يكون اكثر من 3 احرف |
| min:3 (value is number) | ${prefix} should be at least 3 | ${prefix} devrait être au moins 3 | ${prefix} يجب ان يكون اكثر من 3 |
| maxMB:100 | ${prefix} should be at most 100 mb | ${prefix} devrait être au maximum 100 mo | ${prefix} يجب أن يكون اقل من 100 ميغابايت |
| minMB:3 | ${prefix} should be at least 3 mb | ${prefix} devrait être au moins 3 mo | ${prefix} يجب ان يكون اكثر من 3 ميغابايت |
| equal (no prefix given) | All of them should match | Ils devraient tous correspondre | يجب أن تتطابق جميعها |
| equal (2 prefix given) | ${prefix[0]} should match with ${prefix[1]} | ${prefix[0]} devrait correspondre avec ${prefix[1]} | ${prefix[0]} يجب أن تتطابق مع ${prefix[1]} |
| equal (multiple prefixes given) | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... should match | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... devrait correspondre | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... يجب أن تتطابق |
| notEqual (no prefix given) | They should not be equal | Ils ne devraient pas être égaux | لا ينبغي أن يكونوا متساوين |
| notEqual (2 prefix given) | ${prefix[0]} should not match with ${prefix[1]} | ${prefix[0]} ne doit pas correspondre avec ${prefix[1]} | ${prefix[0]} لا ينبغي أن تتطابق مع ${prefix[1]} |
| notEqual (multiple prefixes given) | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... should not be equal | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... ne devrait pas être égal | ${prefix[0]}, ${prefix[1]}, ${prefix[2]}, ... لا ينبغي أن تكون متساوية |

## Keywords

[**js**](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - [**ts**](https://www.typescriptlang.org/) - [**react**](https://react.dev/) - [**react-native**](https://reactnative.dev/) - [**vue**](https://vuejs.org/) - [**angular**](https://angular.io/) - **localized** - **validation**