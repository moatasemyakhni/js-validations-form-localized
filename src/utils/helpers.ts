
export function throwCustomMessage(customMessage?: string | null) {
	if (customMessage && customMessage != null) {
		throw customMessage;
	}
}