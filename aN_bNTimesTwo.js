import { PDA, Node } from "./PushDownAutomata.js";

// Accepts any string where "a" followed by "b" and "b" is twice as many as "a"

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
        "a": "Q1",
        "b": "Q2",
    },
    // Pop
    {
        "a": null,
        "b": "a"
    },
    // Push
    {
        "a": ["a", "a"],
        "b": null
    }
);

PDAInstance.addStateCondition(
    "Q2", 
    // To traverse
    {
        "e": "Q3",
        "b": "Q2",
        "a": "Q1"
    },
    // Pop
    {
        "e": "Z0",
        "b": "a"
    },
    // Push
    {
        "a": ["a", "a"],
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
    "abb",           // 1 "a", 2 "b"
    "aabbbb",        // 2 "a", 4 "b"
    "aaabbbbbb",     // 3 "a", 6 "b"
    "aaaabbbbbbbb",  // 4 "a", 8 "b"
    "aaaaabbbbbbbbbb", // 5 "a", 10 "b"
    "aaaaaabbbbbbbbbbbb", // 6 "a", 12 "b"
    "aaaaaaabbbbbbbbbbbbbb", // 7 "a", 14 "b"
    "aaaaaaaabbbbbbbbbbbbbbbb", // 8 "a", 16 "b"
    "aaaaaaaaabbbbbbbbbbbbbbbbbb", // 9 "a", 18 "b"
    "aaaaaaaaaabbbbbbbbbbbbbbbbbbbb", // 10 "a", 20 "b"
    "aaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbb", // 11 "a", 22 "b"
    "aaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbb", // 12 "a", 24 "b"
    "aaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbb", // 13 "a", 26 "b"
    "aaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 14 "a", 28 "b"
    "aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 15 "a", 30 "b"
    "aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 16 "a", 32 "b"
    "aaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 17 "a", 34 "b"
    "aaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 18 "a", 36 "b"
    "aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 19 "a", 38 "b"
    "aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", // 20 "a", 40 "b"
    "abbabb",
    "aabbbbaabbbbaabbbbaabbbb",
    "aaabbbbbbaaabbbbbbaaabbbbbb"
];


// Rejected Test Cases (Unbalanced or invalid)
const rejectedTestCases = [
    "ab",           // 1 "a", 1 "b" (rule rejected)
    "aabb",         // 2 "a", 2 "b" (rule rejected)
    "aaabbb",       // 3 "a", 3 "b" (rule rejected)
    "aaaabbbbb",    // 4 "a", 5 "b" (rule rejected)
    "aabbb",        // 2 "a", 3 "b" (rule rejected)
    "abbbbb",       // 1 "a", 5 "b" (rule rejected)
    "aaaaabbbbbbb", // 5 "a", 7 "b" (rule rejected)
    "aaabbbb",      // 3 "a", 4 "b" (rule rejected)
    "bbbbbb",       // 0 "a", 6 "b" (rule rejected)
    "aaaa",         // 4 "a", 0 "b" (rule rejected)
    "ababab",       // Alternating "a" and "b" with equal count
    "aabbabb"       // Random order, does not fit the rule
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