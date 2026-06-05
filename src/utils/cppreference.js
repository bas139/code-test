// Automatically generated from CppReference data

export const cppReferenceSuggestions = [
  {
    label: "std::vector",
    kind: "Class", // mapped later in setup
    insertText: "std::vector<${1:int}> ${2:v};",
    documentation:
      "A sequence container representing an array that can change in size. [cppreference: std::vector]",
  },
  {
    label: "std::map",
    kind: "Class", // mapped later in setup
    insertText: "std::map<${1:key_type}, ${2:value_type}> ${3:m};",
    documentation:
      "A sorted associative container that contains key-value pairs with unique keys. [cppreference: std::map]",
  },
  {
    label: "std::unordered_map",
    kind: "Class", // mapped later in setup
    insertText: "std::unordered_map<${1:key_type}, ${2:value_type}> ${3:m};",
    documentation:
      "An associative container that contains key-value pairs with unique keys. Search, insertion, and removal have average constant-time complexity. [cppreference: std::unordered_map]",
  },
  {
    label: "std::set",
    kind: "Class", // mapped later in setup
    insertText: "std::set<${1:type}> ${2:s};",
    documentation:
      "A sorted associative container that contains a sorted set of unique objects of type Key. [cppreference: std::set]",
  },
  {
    label: "std::string",
    kind: "Class", // mapped later in setup
    insertText: "std::string ${1:s};",
    documentation: "A string class. [cppreference: std::basic_string]",
  },
  {
    label: "std::queue",
    kind: "Class", // mapped later in setup
    insertText: "std::queue<${1:type}> ${2:q};",
    documentation:
      "A container adaptor that provides FIFO (first-in first-out) data structure. [cppreference: std::queue]",
  },
  {
    label: "std::stack",
    kind: "Class", // mapped later in setup
    insertText: "std::stack<${1:type}> ${2:s};",
    documentation:
      "A container adaptor that provides LIFO (last-in first-out) data structure. [cppreference: std::stack]",
  },
  {
    label: "std::deque",
    kind: "Class", // mapped later in setup
    insertText: "std::deque<${1:type}> ${2:d};",
    documentation: "Double-ended queue. [cppreference: std::deque]",
  },
  {
    label: "std::pair",
    kind: "Class", // mapped later in setup
    insertText: "std::pair<${1:T1}, ${2:T2}> ${3:p};",
    documentation:
      "A class template that provides a way to store two heterogeneous objects as a single unit. [cppreference: std::pair]",
  },
  {
    label: "std::tuple",
    kind: "Class", // mapped later in setup
    insertText: "std::tuple<${1:T1}, ${2:T2}> ${3:t};",
    documentation:
      "A fixed-size collection of heterogeneous values. [cppreference: std::tuple]",
  },
  {
    label: "std::sort",
    kind: "Function", // mapped later in setup
    insertText: "std::sort(${1:v.begin()}, ${2:v.end()});",
    documentation:
      "Sorts the elements in the range [first, last) in non-descending order. [cppreference: std::sort]",
  },
  {
    label: "std::find",
    kind: "Function", // mapped later in setup
    insertText: "std::find(${1:v.begin()}, ${2:v.end()}, ${3:value});",
    documentation:
      "Returns an iterator to the first element in the range [first, last) that satisfies specific criteria. [cppreference: std::find]",
  },
  {
    label: "std::reverse",
    kind: "Function", // mapped later in setup
    insertText: "std::reverse(${1:v.begin()}, ${2:v.end()});",
    documentation:
      "Reverses the order of the elements in the range [first, last). [cppreference: std::reverse]",
  },
  {
    label: "std::accumulate",
    kind: "Function", // mapped later in setup
    insertText: "std::accumulate(${1:v.begin()}, ${2:v.end()}, ${3:0});",
    documentation:
      "Computes the sum of the given value init and the elements in the range [first, last). [cppreference: std::accumulate]",
  },
  {
    label: "std::max",
    kind: "Function", // mapped later in setup
    insertText: "std::max(${1:a}, ${2:b});",
    documentation:
      "Returns the greater of the given values. [cppreference: std::max]",
  },
  {
    label: "std::min",
    kind: "Function", // mapped later in setup
    insertText: "std::min(${1:a}, ${2:b});",
    documentation:
      "Returns the smaller of the given values. [cppreference: std::min]",
  },
  {
    label: "std::max_element",
    kind: "Function", // mapped later in setup
    insertText: "std::max_element(${1:v.begin()}, ${2:v.end()});",
    documentation:
      "Finds the greatest element in the range [first, last). [cppreference: std::max_element]",
  },
  {
    label: "std::min_element",
    kind: "Function", // mapped later in setup
    insertText: "std::min_element(${1:v.begin()}, ${2:v.end()});",
    documentation:
      "Finds the smallest element in the range [first, last). [cppreference: std::min_element]",
  },
  {
    label: "std::next_permutation",
    kind: "Function", // mapped later in setup
    insertText: "std::next_permutation(${1:v.begin()}, ${2:v.end()});",
    documentation:
      "Transforms the range [first, last) into the next permutation from the set of all permutations that are lexicographically ordered. [cppreference: std::next_permutation]",
  },
  {
    label: "std::binary_search",
    kind: "Function", // mapped later in setup
    insertText: "std::binary_search(${1:v.begin()}, ${2:v.end()}, ${3:value});",
    documentation:
      "Checks if an element equivalent to value appears within the range [first, last). [cppreference: std::binary_search]",
  },
  {
    label: "std::lower_bound",
    kind: "Function", // mapped later in setup
    insertText: "std::lower_bound(${1:v.begin()}, ${2:v.end()}, ${3:value});",
    documentation:
      "Returns an iterator pointing to the first element that does not compare less than value. [cppreference: std::lower_bound]",
  },
  {
    label: "std::upper_bound",
    kind: "Function", // mapped later in setup
    insertText: "std::upper_bound(${1:v.begin()}, ${2:v.end()}, ${3:value});",
    documentation:
      "Returns an iterator pointing to the first element that is greater than value. [cppreference: std::upper_bound]",
  },
  {
    label: "std::count",
    kind: "Function", // mapped later in setup
    insertText: "std::count(${1:v.begin()}, ${2:v.end()}, ${3:value});",
    documentation:
      "Returns the number of elements in the range [first, last) satisfying specific criteria. [cppreference: std::count]",
  },
  {
    label: "std::cout",
    kind: "Keyword", // mapped later in setup
    insertText: "std::cout << ${1:value} << std::endl;",
    documentation:
      "Global object of type ostream that controls output to a stream buffer of implementation-defined type, associated with the standard C output stream stdout. [cppreference: std::cout]",
  },
  {
    label: "std::cin",
    kind: "Keyword", // mapped later in setup
    insertText: "std::cin >> ${1:value};",
    documentation:
      "Global object of type istream that controls input from a stream buffer of implementation-defined type, associated with the standard C input stream stdin. [cppreference: std::cin]",
  },
  {
    label: "std::endl",
    kind: "Keyword", // mapped later in setup
    insertText: "std::endl",
    documentation:
      "Inserts a newline character into the output sequence os and flushes it. [cppreference: std::endl]",
  },
  {
    label: "std::abs",
    kind: "Function", // mapped later in setup
    insertText: "std::abs(${1:x});",
    documentation:
      "Computes the absolute value of an integer number. [cppreference: std::abs]",
  },
  {
    label: "std::pow",
    kind: "Function", // mapped later in setup
    insertText: "std::pow(${1:base}, ${2:exp});",
    documentation:
      "Computes the value of base raised to the power exp. [cppreference: std::pow]",
  },
  {
    label: "std::sqrt",
    kind: "Function", // mapped later in setup
    insertText: "std::sqrt(${1:x});",
    documentation: "Computes the square root of arg. [cppreference: std::sqrt]",
  },
  {
    label: "std::make_unique",
    kind: "Function", // mapped later in setup
    insertText: "std::make_unique<${1:type}>(${2:args});",
    documentation:
      "Constructs an object of type T and wraps it in a std::unique_ptr. [cppreference: std::make_unique]",
  },
  {
    label: "std::make_shared",
    kind: "Function", // mapped later in setup
    insertText: "std::make_shared<${1:type}>(${2:args});",
    documentation:
      "Constructs an object of type T and wraps it in a std::shared_ptr. [cppreference: std::make_shared]",
  },
  {
    label: "std::unique_ptr",
    kind: "Class", // mapped later in setup
    insertText: "std::unique_ptr<${1:type}> ${2:ptr};",
    documentation:
      "A smart pointer that owns and manages another object through a pointer and disposes of that object when the unique_ptr goes out of scope. [cppreference: std::unique_ptr]",
  },
  {
    label: "std::shared_ptr",
    kind: "Class", // mapped later in setup
    insertText: "std::shared_ptr<${1:type}> ${2:ptr};",
    documentation:
      "A smart pointer that retains shared ownership of an object through a pointer. [cppreference: std::shared_ptr]",
  },
];
