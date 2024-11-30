class Node {
    constructor(name) {
        this.stateName = name;
        this.input = null;
        this.pop = null;
        this.push = null;
        this.ifFirstTrue = null;

        this.SecondInput = null;
        this.SecondPop = null;
        this.SecondPush = null;
        this.ifSecondTrue = null;
    }
}

class PDA {
    constructor() {
        this.stack = []
        this.states = {}
    }

    printStatesMap() {
        for (let key in this.states) {
            console.log(`${key}: ${this.states[key]}`);
        }
    }

    printStateInfos() {
        for (let key in this.states) {
            const state = this.states[key]
            console.log("Node Details:");
            console.log("------------->");
            console.log(`State Name: ${state.stateName}`);
            console.log("-------------=");
            console.log(`Input: ${state.input}`);
            console.log(`Pop: ${state.pop}`);
            console.log(`Push: ${state.push}`);
            console.log(`First State If true: ${state.ifFirstTrue}`);
            console.log("-------------=");
            console.log(`Second Input: ${state.SecondInput}`);
            console.log(`Second Pop: ${state.SecondPop}`);
            console.log(`Second Push: ${state.SecondPush}`);
            console.log(`Second State if True: ${state.ifSecondTrue}`);
            console.log("------------->");
            console.log("\n");
        }
    }

    addState(stateName, node) {
        this.states[stateName] = node
    }

    addStateCondition(stateName, input, pop, push, moveTo ,isFirst){
        const Node = this.states[stateName];
        if (isFirst) {
            Node.input = input;
            Node.pop = pop;
            Node.push = push;
            Node.ifFirstTrue = moveTo;
        } else {
            Node.SecondInput = input;
            Node.SecondPop = pop;
            Node.SecondPush = push;
            Node.ifSecondTrue = moveTo;
        }
    }

    checkResult(fail, stringInput) {
        if (this.stack.length === 0 && !fail) {
            console.log(`String = "${stringInput}" Reaches Final State (Accepted)`)
        } else {
            console.log(`String = "${stringInput}" Failed To Reach Final State With Stack Not Empty (REJECTED)`)
        }
        this.reset()
    }

    reset() {
        this.stack = this.stack = []
    }

    validateInput(stringInput) {
        let string =  stringInput.padStart(stringInput.length + 1, ' ').padEnd(stringInput.length + 2, ' ');
        let head = this.states["Q0"]
        let fail = false;

        for (const char of string) {
            if (char === head.input) {
                if (this.stack && head.pop != null ) { 
                    if (!(this.stack[this.stack.length - 1] == head.pop)) {
                        fail = true // if the top of the stack is not same as the pop
                        break;
                    }
                    this.stack.pop();
                }

                if (head.push !== null) {
                    this.stack.push(head.push)
                }
                head = this.states[head.ifFirstTrue];
                

            } else if (char === head.SecondInput){
                if (this.stack && head.SecondPop != null) { 
                    if (!(this.stack[this.stack.length - 1] == head.SecondPop)) {
                        fail = true // if the top of the stack is not same as the pop
                        break;
                    }
                    this.stack.pop();  
                }

                
                if (head.SecondPush !== null) {
                    this.stack.push(head.SecondPush)
                }
                head = this.states[head.ifSecondTrue];
                
            } else {
                fail = true // if char has nowhere to go, it is always going to fail
                break;
            }
            
        };

        this.checkResult(fail, stringInput)
    }
}

// Create PDA instance
const PDAInstance = new PDA();

// Create States
const Q0 = new Node("Q0");
const Q1 = new Node("Q1");
const Q2 = new Node("Q2");
const Q3 = new Node("Q3")

// Add States to PDA
PDAInstance.addState(Q0.stateName, Q0);
PDAInstance.addState(Q1.stateName, Q1);
PDAInstance.addState(Q2.stateName, Q2);
PDAInstance.addState(Q3.stateName, Q3);

// Add State Conditions for Transitions

// Makes Q0 (initial state) where it adds Z0
PDAInstance.addStateCondition("Q0", " ", null, "Z0", "Q1", true);

PDAInstance.addStateCondition("Q1", "0", null, "0", "Q1", true); // Push '0' for input '0'
PDAInstance.addStateCondition("Q1", "1", "0", null, "Q2", false); // Pop '0' for input '1', transition to Q2

PDAInstance.addStateCondition("Q2", "1", "0", null, "Q2", true); // Pop '0' for input '1' in Q2
PDAInstance.addStateCondition("Q2", " ", "Z0", null, "Q3", false); // Go to Q3 if empty

// Make Q3 (final state) where it get rids of Z0 Just incase
PDAInstance.addStateCondition("Q3", " ", "Z0", null, "Q3", true);


// Print the States Map
//PDAInstance.printStateInfos();

// Accepted Test Cases (Balanced strings)
const acceptedTestCases = [
    "0011",           // Should be accepted (balanced)
    "000111",         // Should be accepted (balanced)
    "00001111",       // Should be accepted (balanced)
    "000111",         // Should be accepted (balanced)
    "000000111111",   // Should be accepted (balanced)
    "00000001111111", // Should be accepted (balanced)
    "000000000111111111", // Should be accepted (balanced)
    "00000000001111111111", // Should be accepted (balanced)
    "0000000000011111111111", // Should be accepted (balanced)
    "000000000000111111111111", // Should be accepted (balanced)
    "00000000000001111111111111", // Should be accepted (balanced)
    "0000000000000011111111111111", // Should be accepted (balanced)
    "000000000000000111111111111111", // Should be accepted (balanced)
    "00000000000000001111111111111111", // Should be accepted (balanced)
    "0000000000000000011111111111111111", // Should be accepted (balanced)
    "000000000000000000111111111111111111", // Should be accepted (balanced)
    "00000000000000000001111111111111111111", // Should be accepted (balanced)
    "0000000000000000000011111111111111111111", // Should be accepted (balanced)
    "000000000000000000000111111111111111111111", // Should be accepted (balanced)
    "00000000000000000000001111111111111111111111", // Should be accepted (balanced)
    "0000000000000000000000011111111111111111111111", // Should be accepted (balanced)
    "000000000000000000000000111111111111111111111111", // Should be accepted (balanced)
    "00000000000000000000000001111111111111111111111111", // Should be accepted (balanced)
    "0000000000000000000000000011111111111111111111111111", // Should be accepted (balanced)
    "000000000000000000000000000111111111111111111111111111", // Should be accepted (balanced)
];


// Rejected Test Cases (Unbalanced or invalid)
const rejectedTestCases = [
    "011",            // Not balanced
    "01",             // Not balanced
    "00111",          // More 1's than 0's
    "00011",          // More 1's than 0's
    "000111111",      // Too many 1's
    "000A11",         // Invalid character 'A'
    "000",            // No '1's to balance '0's
    "111",            // No '0's to balance '1's
    "111000",         // Improper order (1's before 0's)
    "000111000111",   // Too many 1's without matching '0's
    "000000111111",   // Too many 1's
    "000000111111111",// More 1's than 0's
    "01A11",          // Invalid character 'A'
    "00011111",       // Too many 1's
    "000111111111",   // Too many 1's
    "010101",         // Not balanced
    "000111111",      // Too many 1's
    "000010111",      // Too many 1's
    "111100000",      // Improper order (1's before 0's)
    "000000",         // No '1's to balance '0's
    "111000000",      // Improper order (1's before 0's)
    "000000111000",   // Too many 1's
    "0000001111",     // Too many 1's
    "011011",         // Not balanced
    "000001111",      // Too many 1's
    "0001111111",     // Too many 1's
];


console.log("Accepted Input")

// Execute accepted test cases
acceptedTestCases.forEach(testCase => {
    PDAInstance.validateInput(testCase);
});

console.log("\n\n\n\n\n REJECTED Input")

// Execute rejected test cases
rejectedTestCases.forEach(testCase => {
    PDAInstance.validateInput(testCase);
});
