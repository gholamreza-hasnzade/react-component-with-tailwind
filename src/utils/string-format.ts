/**
 * String format function with numbered placeholders
 * Example: format('first: {0}; second: {1}', 'hello', 'word')
 * Result: 'first: hello; second: word'
 */
export function format(template: string, ...args: unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index) => {
    const argIndex = parseInt(index, 10);
    return args[argIndex] !== undefined ? String(args[argIndex]) : match;
  });
}

/**
 * String format function with named placeholders
 * Example: formatNamed('Hello {name}, you are {age} years old', { name: 'John', age: 30 })
 * Result: 'Hello John, you are 30 years old'
 */
export function formatNamed(template: string, params: Record<string, unknown>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
}

/**
 * Advanced format function supporting both numbered and named placeholders
 */
export function formatAdvanced(template: string, ...args: unknown[]): string {
  return template.replace(/\{(\d+|\w+)\}/g, (match, key) => {
    // Check if it's a numbered placeholder
    if (/^\d+$/.test(key)) {
      const index = parseInt(key, 10);
      return args[index] !== undefined ? String(args[index]) : match;
    }
    
    // Check if last argument is an object for named placeholders
    if (args.length > 0 && typeof args[args.length - 1] === 'object' && args[args.length - 1] !== null) {
      const params = args[args.length - 1] as Record<string, unknown>;
      return params[key] !== undefined ? String(params[key]) : match;
    }
    
    return match;
  });
}
