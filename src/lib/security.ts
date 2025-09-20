// Security utilities for input validation and data sanitization

export const SECURITY_LIMITS = {
  MAX_TASK_TEXT_LENGTH: 1000,
  MAX_TASK_COUNT: 500,
  MAX_SEARCH_LENGTH: 100,
} as const;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validate task text input
export const validateTaskText = (text: string): ValidationResult => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: "Task description cannot be empty" };
  }
  
  if (text.length > SECURITY_LIMITS.MAX_TASK_TEXT_LENGTH) {
    return { 
      isValid: false, 
      error: `Task description must be less than ${SECURITY_LIMITS.MAX_TASK_TEXT_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
};

// Validate task count
export const validateTaskCount = (currentCount: number): ValidationResult => {
  if (currentCount >= SECURITY_LIMITS.MAX_TASK_COUNT) {
    return { 
      isValid: false, 
      error: `Maximum number of tasks (${SECURITY_LIMITS.MAX_TASK_COUNT}) reached` 
    };
  }
  
  return { isValid: true };
};

// Validate search query
export const validateSearchQuery = (query: string): ValidationResult => {
  if (query.length > SECURITY_LIMITS.MAX_SEARCH_LENGTH) {
    return { 
      isValid: false, 
      error: `Search query must be less than ${SECURITY_LIMITS.MAX_SEARCH_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
};

// Sanitize text input (basic XSS prevention)
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Validate task data structure
export const validateTaskData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  const requiredFields = ['id', 'text', 'completed', 'priority', 'createdAt'];
  const validPriorities = ['low', 'medium', 'high'];
  
  return requiredFields.every(field => field in data) &&
         typeof data.id === 'string' &&
         typeof data.text === 'string' &&
         typeof data.completed === 'boolean' &&
         validPriorities.includes(data.priority) &&
         (data.createdAt instanceof Date || typeof data.createdAt === 'string');
};

// Safe localStorage operations with error handling
export const safeLocalStorageSet = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save data to localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

export const safeLocalStorageGet = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item);
    return parsed ?? defaultValue;
  } catch (error) {
    console.error(`Failed to load data from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return defaultValue;
  }
};

// User-friendly error messages
export const getSecurityErrorMessage = (error: string): string => {
  // Map technical errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'QuotaExceededError': 'Storage limit reached. Please clear some completed tasks.',
    'SecurityError': 'Unable to access local storage. Please check your browser settings.',
    'SyntaxError': 'Data corruption detected. Your tasks will be reset for security.',
  };
  
  return errorMap[error] || 'An unexpected error occurred. Please try again.';
};