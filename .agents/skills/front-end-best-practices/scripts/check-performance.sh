#!/bin/bash
# Checks React components for common performance issues
# Usage: ./check-performance.sh [directory]

DIR=${1:-.}

echo "======================================"
echo "React Performance Check"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

ISSUES_FOUND=0

echo "📊 Analyzing components in: $DIR"
echo ""

# Check for missing React.memo on components
echo "${YELLOW}Checking for components that could benefit from React.memo...${NC}"
COMPONENTS_WITHOUT_MEMO=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -l "^export.*function\|^const.*=.*=>" | xargs grep -L "React.memo\|memo(" | head -5)
if [ -n "$COMPONENTS_WITHOUT_MEMO" ]; then
  echo "${RED}⚠️  Components without React.memo (showing first 5):${NC}"
  echo "$COMPONENTS_WITHOUT_MEMO" | while read -r file; do
    echo "  - $file"
  done
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ All components use React.memo or are class components${NC}"
  echo ""
fi

# Check for inline arrow functions in JSX
echo "${YELLOW}Checking for inline arrow functions in JSX...${NC}"
INLINE_FUNCTIONS=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -n "onClick={(\|onChange={(\|onSubmit={(" | head -10)
if [ -n "$INLINE_FUNCTIONS" ]; then
  echo "${RED}⚠️  Inline arrow functions found (showing first 10):${NC}"
  echo "$INLINE_FUNCTIONS" | while read -r line; do
    echo "  $line"
  done
  echo "${YELLOW}  💡 Consider using useCallback for these handlers${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ No inline arrow functions in event handlers${NC}"
  echo ""
fi

# Check for missing useMemo on expensive computations
echo "${YELLOW}Checking for potentially expensive computations...${NC}"
EXPENSIVE_OPS=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -n "\.map(\|\.filter(\|\.reduce(\|\.sort(" | grep -v "useMemo\|useCallback" | head -10)
if [ -n "$EXPENSIVE_OPS" ]; then
  echo "${YELLOW}⚠️  Array operations outside useMemo (showing first 10):${NC}"
  echo "$EXPENSIVE_OPS" | while read -r line; do
    echo "  $line"
  done
  echo "${YELLOW}  💡 Consider wrapping expensive operations in useMemo${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ Array operations appear to be optimized${NC}"
  echo ""
fi

# Check for index as key
echo "${YELLOW}Checking for index used as key...${NC}"
INDEX_AS_KEY=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -n "key={.*index" | head -10)
if [ -n "$INDEX_AS_KEY" ]; then
  echo "${RED}❌ Index used as key (showing first 10):${NC}"
  echo "$INDEX_AS_KEY" | while read -r line; do
    echo "  $line"
  done
  echo "${RED}  ⚠️  This can cause performance issues and bugs${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ No index used as key${NC}"
  echo ""
fi

# Check for missing key in lists
echo "${YELLOW}Checking for missing keys in lists...${NC}"
MISSING_KEYS=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -n "\.map(" | grep -v "key=" | head -10)
if [ -n "$MISSING_KEYS" ]; then
  echo "${YELLOW}⚠️  Potential missing keys in map (showing first 10):${NC}"
  echo "$MISSING_KEYS" | while read -r line; do
    echo "  $line"
  done
  echo "${YELLOW}  💡 Verify all mapped elements have unique keys${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ All maps appear to have keys${NC}"
  echo ""
fi

# Check for large bundle imports
echo "${YELLOW}Checking for non-optimized imports...${NC}"
LARGE_IMPORTS=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs grep -n "import.*from 'lodash'\|import.*from 'moment'" | head -10)
if [ -n "$LARGE_IMPORTS" ]; then
  echo "${YELLOW}⚠️  Large library imports (showing first 10):${NC}"
  echo "$LARGE_IMPORTS" | while read -r line; do
    echo "  $line"
  done
  echo "${YELLOW}  💡 Use specific imports: import debounce from 'lodash/debounce'${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ No large library imports detected${NC}"
  echo ""
fi

# Check for missing lazy loading
echo "${YELLOW}Checking for code splitting opportunities...${NC}"
ROUTE_COMPONENTS=$(find "$DIR" -name "*.tsx" -o -name "*.jsx" | xargs grep -l "<Route" | xargs grep -L "lazy(\|React.lazy" | head -5)
if [ -n "$ROUTE_COMPONENTS" ]; then
  echo "${YELLOW}⚠️  Route files without lazy loading (showing first 5):${NC}"
  echo "$ROUTE_COMPONENTS" | while read -r file; do
    echo "  - $file"
  done
  echo "${YELLOW}  💡 Consider using React.lazy() for route components${NC}"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  echo ""
else
  echo "${GREEN}✓ Routes appear to use code splitting${NC}"
  echo ""
fi

echo "======================================"
if [ $ISSUES_FOUND -eq 0 ]; then
  echo "${GREEN}✅ No performance issues detected!${NC}"
else
  echo "${YELLOW}⚠️  Found $ISSUES_FOUND potential performance issues${NC}"
  echo "${YELLOW}Review the suggestions above to optimize your React app${NC}"
fi
echo "======================================"
echo ""

exit 0