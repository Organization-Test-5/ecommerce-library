#!/usr/bin/env node
/**
 * Analyzes React components for best practice violations
 * Usage: node analyze-component.js <component-file>
 */

const fs = require('fs');
const path = require('path');

function analyzeComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  const warnings = [];
  const suggestions = [];

  // Check for class components
  if (content.match(/class\s+\w+\s+extends\s+(React\.)?Component/)) {
    warnings.push('Consider converting class component to functional component with hooks');
  }

  // Check for direct state mutation
  if (content.match(/this\.state\.\w+\s*=/) || content.match(/state\.\w+\s*=/)) {
    issues.push('❌ Direct state mutation detected - use setState or state setter function');
  }

  // Check for index as key
  if (content.match(/key={.*index.*}/)) {
    issues.push('❌ Using index as key - use unique identifier instead');
  }

  // Check for missing useEffect dependencies
  const useEffectMatches = content.matchAll(/useEffect\(\([^)]*\)\s*=>\s*{([^}]+(?:{[^}]*}[^}]*)*)},\s*\[([^\]]*)\]/g);
  for (const match of useEffectMatches) {
    const effectBody = match[1];
    const deps = match[2];
    
    // Simple heuristic: look for variable usage
    const usedVars = effectBody.match(/\b[a-z][a-zA-Z0-9]*\b/g) || [];
    const declaredDeps = deps.split(',').map(d => d.trim()).filter(Boolean);
    
    if (deps.trim() === '' && effectBody.length > 50) {
      warnings.push('Empty dependency array in useEffect - verify this should only run on mount');
    }
  }

  // Check for cleanup in useEffect
  if (content.includes('useEffect') && content.includes('setInterval') && !content.includes('clearInterval')) {
    issues.push('❌ setInterval without clearInterval - add cleanup function');
  }

  if (content.includes('useEffect') && content.includes('setTimeout') && !content.includes('clearTimeout')) {
    warnings.push('setTimeout without clearTimeout - consider adding cleanup if component can unmount');
  }

  if (content.includes('useEffect') && content.includes('addEventListener') && !content.includes('removeEventListener')) {
    issues.push('❌ addEventListener without removeEventListener - add cleanup function');
  }

  // Check for derived state anti-pattern
  if (content.match(/useState\([^)]*props\.[^)]*\)/)) {
    warnings.push('Initializing state from props - ensure this is intentional (usually derived values should be computed)');
  }

  // Check for conditional hooks
  const hookPattern = /\b(useState|useEffect|useCallback|useMemo|useReducer|useRef|useContext)\(/g;
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (hookPattern.test(line) && (line.includes('if (') || line.includes('if(') || line.includes('} else {'))) {
      issues.push(`❌ Line ${idx + 1}: Potential conditional hook call - hooks must be called unconditionally`);
    }
  });

  // Check for unnecessary useMemo/useCallback
  const simpleMemo = content.match(/useMemo\(\(\)\s*=>\s*[^{][^,]+,/g);
  if (simpleMemo && simpleMemo.length > 0) {
    suggestions.push('Some useMemo calls may be premature optimization for simple calculations');
  }

  // Check for missing React.memo on components receiving objects/arrays
  const componentMatch = content.match(/^(export\s+)?(const|function)\s+(\w+)\s*=/m);
  if (componentMatch && !content.includes('React.memo') && !content.includes('memo(')) {
    suggestions.push('Consider wrapping component with React.memo if it receives complex props');
  }

  // Check for inline function definitions in JSX
  if (content.match(/onClick={\([^)]*\)\s*=>/) || content.match(/onChange={\([^)]*\)\s*=>/) || content.match(/onSubmit={\([^)]*\)\s*=>/)) {
    suggestions.push('Inline arrow functions in JSX props - consider useCallback for performance in large lists');
  }

  // Check for proper TypeScript usage
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    if (content.includes(': any')) {
      warnings.push('Using "any" type - consider using proper types for better type safety');
    }
  }

  // Generate report
  console.log('\n' + '='.repeat(60));
  console.log(`Component Analysis: ${path.basename(filePath)}`);
  console.log('='.repeat(60) + '\n');

  if (issues.length === 0 && warnings.length === 0 && suggestions.length === 0) {
    console.log('✅ No issues found! Component follows best practices.\n');
    return;
  }

  if (issues.length > 0) {
    console.log('🔴 ISSUES (must fix):\n');
    issues.forEach(issue => console.log(`  ${issue}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (review recommended):\n');
    warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    console.log('');
  }

  if (suggestions.length > 0) {
    console.log('💡 SUGGESTIONS (consider):\n');
    suggestions.forEach(suggestion => console.log(`  💡 ${suggestion}`));
    console.log('');
  }

  console.log('='.repeat(60) + '\n');
}

if (require.main === module) {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Usage: node analyze-component.js <component-file>');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  analyzeComponent(filePath);
}

module.exports = { analyzeComponent };