import { PDA, Node } from "./PushDownAutomata.js";

// Accepts any string where it has balance number of "(" and ")"

// Create PDA instance
const PDAInstance = new PDA();

const Q0 = new Node("Q0");
const Q1 = new Node("Q1");
const Q2 = new Node("Q2");
const Q3 = new Node("Q3");

// Add States to PDA
PDAInstance.addState(Q0.stateName, Q0);
PDAInstance.addState(Q1.stateName, Q1);
PDAInstance.addState(Q2.stateName, Q2);
PDAInstance.addState(Q3.stateName, Q3);


PDAInstance.addStateCondition("Q0", {"e": "Q1"}, null, {"e": "Z0"});


PDAInstance.addStateCondition(
    "Q1", 
    // To traverse
    {
        "(": "Q1",
        ")": "Q2",
    },
    // Pop
    {
        "(": null,
        ")": "("
    },
    // Push
    {
        "(": "(",
        ")": null
    }
);

PDAInstance.addStateCondition(
    "Q2", 
    // To traverse
    {
        "e": "Q3",
        ")": "Q2",
        "(": "Q1"
    },
    // Pop
    {
        "e": "Z0",
        ")": "(",
        "(": null
    },
    // Push
    {
        "(": "("
    }
);

PDAInstance.addStateCondition(
    "Q3", 
    // To traverse
    {
        "e": "Q3",
    },
    // Pop
    {
        "e": "Z0",
    },
    // Push
    null
);

const acceptedTestCases = [
"()",          // Length 2
"(())",        // Length 4
"()()",        // Length 4
"(()())",      // Length 6
"(())()",      // Length 6
"()()()",      // Length 6
"(()(()))",    // Length 8
"(())(())",    // Length 8
"()(()())",    // Length 8
"(())()()",    // Length 8
"()(()()())",  // Length 10
"(((())))",    // Length 8
"(()())()",    // Length 8
"()((()))",    // Length 8
"((())())",    // Length 8
"(()(()))()",  // Length 10
"((()()()))",  // Length 10
"(()(()())())",// Length 12
"(((()))())",  // Length 10
"(((()(()))))" // Length 12
];


// Rejected Test Cases (Unbalanced or invalid)
const rejectedTestCases = [
    "(",           // Length 1 (missing closing parenthesis)
    ")",           // Length 1 (missing opening parenthesis)
    "())",         // Length 3 (extra closing parenthesis)
    "(()",         // Length 3 (missing closing parenthesis)
    "(()))",       // Length 5 (extra closing parenthesis)
    "(()()(",      // Length 6 (missing closing parenthesis)
    "(()(()))(",   // Length 8 (missing closing parenthesis)
    "())(())",     // Length 6 (misplaced parentheses)
    "((())",       // Length 5 (missing closing parenthesis)
    "())(()",      // Length 6 (misplaced parentheses)
    "(((())())",   // Length 8 (missing closing parenthesis)
    "(()())(()",   // Length 8 (misplaced parentheses)
    "()(()))",     // Length 7 (extra closing parenthesis)
    "())",         // Length 3 (extra closing parenthesis)
    "(()())())",   // Length 8 (extra closing parenthesis)
    "((())())(",   // Length 8 (missing closing parenthesis)
    "(((()()())",  // Length 9 (missing closing parenthesis)
    "(()(()())",   // Length 8 (missing closing parenthesis)
    "((((()))))",  // Length 10 (misplaced parentheses, extra closing one)
    "((())())(",   // Length 8 (missing closing parenthesis)
    "(((((()))))", // Length 12 (misplaced parentheses, extra closing one)
];


console.log("Accepted Input")

// Execute accepted test cases
acceptedTestCases.forEach(testCase => {
    PDAInstance.validateInput(testCase, false);
});

console.log("\n\n\n\n\n REJECTED Input")

// Execute rejected test cases
rejectedTestCases.forEach(testCase => {
    PDAInstance.validateInput(testCase, false);
});