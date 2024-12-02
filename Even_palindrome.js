import { PDA, Node } from "./PushDownAutomata.js";

// Accepts palindrome string (The true boolean is just a way for my code to recognize that its dealing with palindrome)

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
        "b": "Q1",
        " ": "Q2"
    },
    // Pop
    null,
    // Push
    {
        "a": "a",
        "b": "b"
    }
);

PDAInstance.addStateCondition(
    "Q2", 
    // To traverse
    {
        "e": "Q3",
        "a": "Q2",
        "b": "Q2",
    },
    // Pop
    {
        "e": "Z0",
        "a": "a",
        "b": "b"
    },
    // Push
    null
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
  "aa", "bb", "abba", "bbbb", "baab", "aabbaa", "bbaabb", "bbbbaabbbb", "aaaaabbaaaaa"
];


// Rejected Test Cases (Unbalanced or invalid)
const rejectedTestCases = [
    "aabb", "abab", "baba", "ab", "ba", "aaabbb", "bbbbaaaa", "abababab"
];


    console.log("Accepted Input")

    // Execute accepted test cases
    acceptedTestCases.forEach(testCase => {
        PDAInstance.validateInput(testCase, true);
    });

    console.log("\n\n\n\n\nREJECTED Input")

    // Execute rejected test cases
    rejectedTestCases.forEach(testCase => {
        PDAInstance.validateInput(testCase, true);
    });