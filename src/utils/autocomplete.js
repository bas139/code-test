export const setupAutocomplete = (monaco) => {
  const rules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  // ==========================
  // C and C++ Autocomplete
  // ==========================
  monaco.languages.registerCompletionItemProvider('cpp', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
      
      const suggestions = [
        // Keywords & Control Flow
        { label: 'for', kind: 15, insertText: 'for (int i = 0; i < ${1:n}; i++) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'while', kind: 15, insertText: 'while (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'if', kind: 15, insertText: 'if (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'else if', kind: 15, insertText: 'else if (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'else', kind: 15, insertText: 'else {\\n    ${1}\\n}', insertTextRules: rules, range },
        { label: 'switch', kind: 15, insertText: 'switch (${1:var}) {\\n    case ${2:val}:\\n        ${3}\\n        break;\\n    default:\\n        ${4}\\n        break;\\n}', insertTextRules: rules, range },
        { label: 'class', kind: 15, insertText: 'class ${1:Name} {\\npublic:\\n    ${1}() {}\\n};', insertTextRules: rules, range },
        { label: 'struct', kind: 15, insertText: 'struct ${1:Name} {\\n    ${2}\\n};', insertTextRules: rules, range },
        
        // C I/O
        { label: 'printf', kind: 3, insertText: 'printf("${1:%d}\\\\n", ${2:var});', insertTextRules: rules, range },
        { label: 'scanf', kind: 3, insertText: 'scanf("${1:%d}", &${2:var});', insertTextRules: rules, range },
        { label: 'puts', kind: 3, insertText: 'puts("${1:string}");', insertTextRules: rules, range },
        { label: 'gets', kind: 3, insertText: 'gets(${1:str});', insertTextRules: rules, range },
        
        // C++ I/O
        { label: 'cout', kind: 15, insertText: 'cout << ${1:var} << endl;', insertTextRules: rules, range },
        { label: 'cin', kind: 15, insertText: 'cin >> ${1:var};', insertTextRules: rules, range },
        { label: 'endl', kind: 15, insertText: 'endl', insertTextRules: rules, range },
        { label: 'getline', kind: 3, insertText: 'getline(cin, ${1:str});', insertTextRules: rules, range },
        
        // Containers (STL)
        { label: 'vector', kind: 15, insertText: 'vector<${1:int}> ${2:v};', insertTextRules: rules, range },
        { label: 'string', kind: 15, insertText: 'string ${1:str} = "${2}";', insertTextRules: rules, range },
        { label: 'map', kind: 15, insertText: 'map<${1:int}, ${2:string}> ${3:m};', insertTextRules: rules, range },
        { label: 'unordered_map', kind: 15, insertText: 'unordered_map<${1:int}, ${2:int}> ${3:um};', insertTextRules: rules, range },
        { label: 'set', kind: 15, insertText: 'set<${1:int}> ${2:s};', insertTextRules: rules, range },
        { label: 'queue', kind: 15, insertText: 'queue<${1:int}> ${2:q};', insertTextRules: rules, range },
        { label: 'stack', kind: 15, insertText: 'stack<${1:int}> ${2:st};', insertTextRules: rules, range },
        { label: 'priority_queue', kind: 15, insertText: 'priority_queue<${1:int}> ${2:pq};', insertTextRules: rules, range },
        { label: 'pair', kind: 15, insertText: 'pair<${1:int}, ${2:int}> ${3:p};', insertTextRules: rules, range },
        
        // STL Functions & Algorithms
        { label: 'sort', kind: 3, insertText: 'sort(${1:v}.begin(), ${1:v}.end());', insertTextRules: rules, range },
        { label: 'reverse', kind: 3, insertText: 'reverse(${1:v}.begin(), ${1:v}.end());', insertTextRules: rules, range },
        { label: 'min', kind: 3, insertText: 'min(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'max', kind: 3, insertText: 'max(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'abs', kind: 3, insertText: 'abs(${1:x})', insertTextRules: rules, range },
        { label: 'pow', kind: 3, insertText: 'pow(${1:base}, ${2:exp})', insertTextRules: rules, range },
        { label: 'sqrt', kind: 3, insertText: 'sqrt(${1:x})', insertTextRules: rules, range },
        { label: 'ceil', kind: 3, insertText: 'ceil(${1:x})', insertTextRules: rules, range },
        { label: 'floor', kind: 3, insertText: 'floor(${1:x})', insertTextRules: rules, range },
        { label: 'push_back', kind: 3, insertText: 'push_back(${1:val});', insertTextRules: rules, range },
        { label: 'pop_back', kind: 3, insertText: 'pop_back();', insertTextRules: rules, range },
        { label: 'insert', kind: 3, insertText: 'insert(${1:val});', insertTextRules: rules, range },
        { label: 'erase', kind: 3, insertText: 'erase(${1:val});', insertTextRules: rules, range },
        { label: 'size', kind: 3, insertText: 'size()', insertTextRules: rules, range },
        { label: 'empty', kind: 3, insertText: 'empty()', insertTextRules: rules, range },
        { label: 'begin', kind: 3, insertText: 'begin()', insertTextRules: rules, range },
        { label: 'end', kind: 3, insertText: 'end()', insertTextRules: rules, range },
        { label: 'make_pair', kind: 3, insertText: 'make_pair(${1:a}, ${2:b})', insertTextRules: rules, range },

        // Common Includes
        { label: '#include <iostream>', kind: 15, insertText: '#include <iostream>\\n', insertTextRules: rules, range },
        { label: '#include <stdio.h>', kind: 15, insertText: '#include <stdio.h>\\n', insertTextRules: rules, range },
        { label: '#include <vector>', kind: 15, insertText: '#include <vector>\\n', insertTextRules: rules, range },
        { label: '#include <string>', kind: 15, insertText: '#include <string>\\n', insertTextRules: rules, range },
        { label: '#include <algorithm>', kind: 15, insertText: '#include <algorithm>\\n', insertTextRules: rules, range },
        { label: '#include <cmath>', kind: 15, insertText: '#include <cmath>\\n', insertTextRules: rules, range },
        { label: '#include <map>', kind: 15, insertText: '#include <map>\\n', insertTextRules: rules, range },
        { label: '#include <set>', kind: 15, insertText: '#include <set>\\n', insertTextRules: rules, range },
      ];
      return { suggestions };
    }
  });

  // ==========================
  // Python Autocomplete
  // ==========================
  monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
      
      const suggestions = [
        // Keywords & Control Flow
        { label: 'def', kind: 15, insertText: 'def ${1:name}(${2:args}):\\n    ${3:pass}', insertTextRules: rules, range },
        { label: 'for', kind: 15, insertText: 'for ${1:i} in range(${2:n}):\\n    ${3:pass}', insertTextRules: rules, range },
        { label: 'while', kind: 15, insertText: 'while ${1:condition}:\\n    ${2:pass}', insertTextRules: rules, range },
        { label: 'if', kind: 15, insertText: 'if ${1:condition}:\\n    ${2:pass}', insertTextRules: rules, range },
        { label: 'elif', kind: 15, insertText: 'elif ${1:condition}:\\n    ${2:pass}', insertTextRules: rules, range },
        { label: 'else', kind: 15, insertText: 'else:\\n    ${1:pass}', insertTextRules: rules, range },
        { label: 'class', kind: 15, insertText: 'class ${1:Name}:\\n    def __init__(self):\\n        ${2:pass}', insertTextRules: rules, range },
        { label: 'main', kind: 15, insertText: 'if __name__ == "__main__":\\n    ${1:main()}', insertTextRules: rules, range },
        { label: 'import', kind: 15, insertText: 'import ${1:module}', insertTextRules: rules, range },
        { label: 'from', kind: 15, insertText: 'from ${1:module} import ${2:submodule}', insertTextRules: rules, range },

        // Built-in Functions
        { label: 'print', kind: 3, insertText: 'print(${1})', insertTextRules: rules, range },
        { label: 'input', kind: 3, insertText: 'input(${1})', insertTextRules: rules, range },
        { label: 'int', kind: 3, insertText: 'int(${1})', insertTextRules: rules, range },
        { label: 'float', kind: 3, insertText: 'float(${1})', insertTextRules: rules, range },
        { label: 'str', kind: 3, insertText: 'str(${1})', insertTextRules: rules, range },
        { label: 'len', kind: 3, insertText: 'len(${1})', insertTextRules: rules, range },
        { label: 'range', kind: 3, insertText: 'range(${1:start}, ${2:stop})', insertTextRules: rules, range },
        { label: 'enumerate', kind: 3, insertText: 'enumerate(${1:iterable})', insertTextRules: rules, range },
        { label: 'zip', kind: 3, insertText: 'zip(${1:list1}, ${2:list2})', insertTextRules: rules, range },
        { label: 'map', kind: 3, insertText: 'map(${1:func}, ${2:iterable})', insertTextRules: rules, range },
        { label: 'filter', kind: 3, insertText: 'filter(${1:func}, ${2:iterable})', insertTextRules: rules, range },
        { label: 'sum', kind: 3, insertText: 'sum(${1:iterable})', insertTextRules: rules, range },
        { label: 'min', kind: 3, insertText: 'min(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'max', kind: 3, insertText: 'max(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'abs', kind: 3, insertText: 'abs(${1:x})', insertTextRules: rules, range },
        { label: 'round', kind: 3, insertText: 'round(${1:x}, ${2:digits})', insertTextRules: rules, range },
        { label: 'pow', kind: 3, insertText: 'pow(${1:base}, ${2:exp})', insertTextRules: rules, range },
        { label: 'sorted', kind: 3, insertText: 'sorted(${1:iterable})', insertTextRules: rules, range },
        { label: 'reversed', kind: 3, insertText: 'reversed(${1:iterable})', insertTextRules: rules, range },
        
        // Data Structures & Methods
        { label: 'list', kind: 3, insertText: 'list(${1})', insertTextRules: rules, range },
        { label: 'dict', kind: 3, insertText: 'dict(${1})', insertTextRules: rules, range },
        { label: 'set', kind: 3, insertText: 'set(${1})', insertTextRules: rules, range },
        { label: 'tuple', kind: 3, insertText: 'tuple(${1})', insertTextRules: rules, range },
        { label: 'append', kind: 3, insertText: 'append(${1:val})', insertTextRules: rules, range },
        { label: 'extend', kind: 3, insertText: 'extend(${1:iterable})', insertTextRules: rules, range },
        { label: 'pop', kind: 3, insertText: 'pop(${1:index})', insertTextRules: rules, range },
        { label: 'remove', kind: 3, insertText: 'remove(${1:val})', insertTextRules: rules, range },
        { label: 'insert', kind: 3, insertText: 'insert(${1:index}, ${2:val})', insertTextRules: rules, range },
        { label: 'sort', kind: 3, insertText: 'sort()', insertTextRules: rules, range },
        { label: 'keys', kind: 3, insertText: 'keys()', insertTextRules: rules, range },
        { label: 'values', kind: 3, insertText: 'values()', insertTextRules: rules, range },
        { label: 'items', kind: 3, insertText: 'items()', insertTextRules: rules, range },

        // Common Libraries
        { label: 'math.sqrt', kind: 3, insertText: 'math.sqrt(${1:x})', insertTextRules: rules, range },
        { label: 'math.ceil', kind: 3, insertText: 'math.ceil(${1:x})', insertTextRules: rules, range },
        { label: 'math.floor', kind: 3, insertText: 'math.floor(${1:x})', insertTextRules: rules, range },
      ];
      return { suggestions };
    }
  });

  // ==========================
  // Java Autocomplete
  // ==========================
  monaco.languages.registerCompletionItemProvider('java', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
      
      const suggestions = [
        // Keywords & Control Flow
        { label: 'psvm', kind: 15, insertText: 'public static void main(String[] args) {\\n    ${1}\\n}', insertTextRules: rules, documentation: 'Main method', range },
        { label: 'class', kind: 15, insertText: 'public class ${1:Name} {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'for', kind: 15, insertText: 'for (int i = 0; i < ${1:n}; i++) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'while', kind: 15, insertText: 'while (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'if', kind: 15, insertText: 'if (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'else if', kind: 15, insertText: 'else if (${1:condition}) {\\n    ${2}\\n}', insertTextRules: rules, range },
        { label: 'else', kind: 15, insertText: 'else {\\n    ${1}\\n}', insertTextRules: rules, range },
        
        // I/O & Common Classes
        { label: 'sout', kind: 15, insertText: 'System.out.println(${1});', insertTextRules: rules, documentation: 'Print to standard output', range },
        { label: 'souf', kind: 15, insertText: 'System.out.printf("${1:%d}\\\\n", ${2:var});', insertTextRules: rules, range },
        { label: 'Scanner', kind: 15, insertText: 'Scanner ${1:sc} = new Scanner(System.in);', insertTextRules: rules, range },
        { label: 'nextInt', kind: 3, insertText: 'nextInt()', insertTextRules: rules, range },
        { label: 'nextLine', kind: 3, insertText: 'nextLine()', insertTextRules: rules, range },
        { label: 'next', kind: 3, insertText: 'next()', insertTextRules: rules, range },
        { label: 'nextDouble', kind: 3, insertText: 'nextDouble()', insertTextRules: rules, range },
        
        // Math
        { label: 'Math.max', kind: 3, insertText: 'Math.max(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'Math.min', kind: 3, insertText: 'Math.min(${1:a}, ${2:b})', insertTextRules: rules, range },
        { label: 'Math.abs', kind: 3, insertText: 'Math.abs(${1:a})', insertTextRules: rules, range },
        { label: 'Math.pow', kind: 3, insertText: 'Math.pow(${1:base}, ${2:exp})', insertTextRules: rules, range },
        { label: 'Math.sqrt', kind: 3, insertText: 'Math.sqrt(${1:a})', insertTextRules: rules, range },
        
        // String Methods
        { label: 'String', kind: 15, insertText: 'String ${1:str} = "${2}";', insertTextRules: rules, range },
        { label: 'length', kind: 3, insertText: 'length()', insertTextRules: rules, range },
        { label: 'charAt', kind: 3, insertText: 'charAt(${1:index})', insertTextRules: rules, range },
        { label: 'substring', kind: 3, insertText: 'substring(${1:start}, ${2:end})', insertTextRules: rules, range },
        { label: 'indexOf', kind: 3, insertText: 'indexOf("${1:str}")', insertTextRules: rules, range },
        { label: 'equals', kind: 3, insertText: 'equals(${1:str})', insertTextRules: rules, range },
        
        // Collections
        { label: 'ArrayList', kind: 15, insertText: 'ArrayList<${1:Integer}> ${2:list} = new ArrayList<>();', insertTextRules: rules, range },
        { label: 'HashMap', kind: 15, insertText: 'HashMap<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();', insertTextRules: rules, range },
        { label: 'HashSet', kind: 15, insertText: 'HashSet<${1:Integer}> ${2:set} = new HashSet<>();', insertTextRules: rules, range },
        { label: 'add', kind: 3, insertText: 'add(${1:val})', insertTextRules: rules, range },
        { label: 'get', kind: 3, insertText: 'get(${1:index})', insertTextRules: rules, range },
        { label: 'set', kind: 3, insertText: 'set(${1:index}, ${2:val})', insertTextRules: rules, range },
        { label: 'remove', kind: 3, insertText: 'remove(${1:index})', insertTextRules: rules, range },
        { label: 'size', kind: 3, insertText: 'size()', insertTextRules: rules, range },
        { label: 'put', kind: 3, insertText: 'put(${1:key}, ${2:value})', insertTextRules: rules, range },
        { label: 'containsKey', kind: 3, insertText: 'containsKey(${1:key})', insertTextRules: rules, range },
        { label: 'Arrays.sort', kind: 3, insertText: 'Arrays.sort(${1:arr});', insertTextRules: rules, range },
        { label: 'Collections.sort', kind: 3, insertText: 'Collections.sort(${1:list});', insertTextRules: rules, range },
      ];
      return { suggestions };
    }
  });
};
