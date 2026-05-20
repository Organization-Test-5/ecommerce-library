#!/usr/bin/env node
/**
 * Generates a custom React hook template with best practices
 * Usage: node generate-custom-hook.js <hook-name> [options]
 */

const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function generateHook(hookName, options = {}) {
  const { typescript = true, withFetch = false, withLocalStorage = false } = options;
  const ext = typescript ? 'ts' : 'js';
  const hookFileName = `use${toPascalCase(hookName)}.${ext}`;
  
  let template = '';

  if (typescript) {
    template += `import { useState, useEffect } from 'react';\n\n`;
  } else {
    template += `import { useState, useEffect } from 'react';\n\n`;
  }

  if (withFetch) {
    if (typescript) {
      template += `interface Use${toPascalCase(hookName)}Result<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

`;
      template += `export function use${toPascalCase(hookName)}<T = any>(url: string): Use${toPascalCase(hookName)}Result<T> {
`;
    } else {
      template += `export function use${toPascalCase(hookName)}(url) {
`;
    }
    
    template += `  const [data, setData] = useState(null);
`;
    template += `  const [loading, setLoading] = useState(true);
`;
    template += `  const [error, setError] = useState(null);
`;
    template += `  const [refetchIndex, setRefetchIndex] = useState(0);
\n`;
    
    template += `  useEffect(() => {
`;
    template += `    let cancelled = false;
\n`;
    template += `    async function fetchData() {
`;
    template += `      try {
`;
    template += `        setLoading(true);
`;
    template += `        setError(null);
`;
    template += `        const response = await fetch(url);
`;
    template += `        if (!response.ok) throw new Error('Failed to fetch');
`;
    template += `        const result = await response.json();
`;
    template += `        if (!cancelled) {
`;
    template += `          setData(result);
`;
    template += `        }
`;
    template += `      } catch (err) {
`;
    template += `        if (!cancelled) {
`;
    template += `          setError(err${typescript ? ' as Error' : ''});
`;
    template += `        }
`;
    template += `      } finally {
`;
    template += `        if (!cancelled) {
`;
    template += `          setLoading(false);
`;
    template += `        }
`;
    template += `      }
`;
    template += `    }
\n`;
    template += `    fetchData();
\n`;
    template += `    return () => {
`;
    template += `      cancelled = true;
`;
    template += `    };
`;
    template += `  }, [url, refetchIndex]);
\n`;
    template += `  const refetch = () => setRefetchIndex(prev => prev + 1);
\n`;
    template += `  return { data, loading, error, refetch };
`;
    template += `}
`;
  } else if (withLocalStorage) {
    if (typescript) {
      template += `export function use${toPascalCase(hookName)}<T>(key: string, initialValue: T): [T, (value: T) => void] {
`;
    } else {
      template += `export function use${toPascalCase(hookName)}(key, initialValue) {
`;
    }
    
    template += `  const [storedValue, setStoredValue] = useState(() => {
`;
    template += `    try {
`;
    template += `      const item = window.localStorage.getItem(key);
`;
    template += `      return item ? JSON.parse(item) : initialValue;
`;
    template += `    } catch (error) {
`;
    template += `      console.error('Error reading from localStorage:', error);
`;
    template += `      return initialValue;
`;
    template += `    }
`;
    template += `  });
\n`;
    
    template += `  const setValue = (value${typescript ? ': T' : ''}) => {
`;
    template += `    try {
`;
    template += `      setStoredValue(value);
`;
    template += `      window.localStorage.setItem(key, JSON.stringify(value));
`;
    template += `    } catch (error) {
`;
    template += `      console.error('Error writing to localStorage:', error);
`;
    template += `    }
`;
    template += `  };
\n`;
    template += `  return [storedValue, setValue];
`;
    template += `}
`;
  } else {
    // Basic hook template
    if (typescript) {
      template += `export function use${toPascalCase(hookName)}() {
`;
    } else {
      template += `export function use${toPascalCase(hookName)}() {
`;
    }
    
    template += `  const [state, setState] = useState(null);
\n`;
    template += `  useEffect(() => {
`;
    template += `    // Your effect logic here
`;
    template += `    
`;
    template += `    return () => {
`;
    template += `      // Cleanup logic here
`;
    template += `    };
`;
    template += `  }, []);
\n`;
    template += `  return { state };
`;
    template += `}
`;
  }

  // Add test file
  const testTemplate = typescript
    ? `import { renderHook, waitFor } from '@testing-library/react';
import { use${toPascalCase(hookName)} } from './use${toPascalCase(hookName)}';

describe('use${toPascalCase(hookName)}', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => use${toPascalCase(hookName)}(${withFetch ? "'/api/test'" : withLocalStorage ? "'test-key', 'initial'" : ''}));
    expect(result.current).toBeDefined();
  });

  // Add more tests here
});
`
    : `import { renderHook } from '@testing-library/react';
import { use${toPascalCase(hookName)} } from './use${toPascalCase(hookName)}';

describe('use${toPascalCase(hookName)}', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => use${toPascalCase(hookName)}(${withFetch ? "'/api/test'" : withLocalStorage ? "'test-key', 'initial'" : ''}));
    expect(result.current).toBeDefined();
  });
});
`;

  return {
    hookFile: { name: hookFileName, content: template },
    testFile: { name: `use${toPascalCase(hookName)}.test.${ext}`, content: testTemplate }
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node generate-custom-hook.js <hook-name> [options]');
    console.log('\nOptions:');
    console.log('  --js              Generate JavaScript instead of TypeScript');
    console.log('  --fetch           Generate data fetching hook template');
    console.log('  --local-storage   Generate localStorage hook template');
    console.log('\nExamples:');
    console.log('  node generate-custom-hook.js user-data --fetch');
    console.log('  node generate-custom-hook.js theme --local-storage');
    console.log('  node generate-custom-hook.js window-size --js');
    process.exit(0);
  }

  const hookName = args[0];
  const options = {
    typescript: !args.includes('--js'),
    withFetch: args.includes('--fetch'),
    withLocalStorage: args.includes('--local-storage')
  };

  const { hookFile, testFile } = generateHook(hookName, options);

  // Write files
  fs.writeFileSync(hookFile.name, hookFile.content);
  fs.writeFileSync(testFile.name, testFile.content);

  console.log('\n✅ Custom hook generated successfully!\n');
  console.log(`📄 ${hookFile.name}`);
  console.log(`📄 ${testFile.name}`);
  console.log('\n💡 Next steps:');
  console.log('  1. Implement your custom logic');
  console.log('  2. Add comprehensive tests');
  console.log('  3. Document usage with JSDoc/TSDoc');
  console.log('');
}

module.exports = { generateHook };