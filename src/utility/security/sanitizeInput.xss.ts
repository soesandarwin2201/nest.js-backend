import xss from 'xss';

export function sanitizeInput(userInput: string): string {
	// Sanitize the user input using the xss library
	return xss(userInput);
}
// const sanitizedInput = sanitizeInput(userInput);
