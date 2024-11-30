class Node {
    constructor(name) {
        this.stateName = name;
        this.input = {}; // Input: State To Traverse
        this.pop = {}; // Input: to pop
        this.push = {}; // Input: to push
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
            console.log(`Input: ${JSON.stringify(state.input)}`);
            console.log(`Pop: ${JSON.stringify(state.pop)}`);
            console.log(`Push: ${JSON.stringify(state.push)}`);
            console.log("------------->");
            console.log("\n");
        }
    }

    addState(stateName, node) {
        this.states[stateName] = node
    }

    addStateCondition(stateName, input, pop, push){
        const Node = this.states[stateName];

        Node.input = input;
        Node.pop = pop;
        Node.push = push;
    }

    addEmptyCharacter(stringInput) {
        return 'e' + stringInput.split('').join(' ') + 'e';
    }

    validateResult(stringInput, autoReject) {
        if (this.stack.length === 0 && !autoReject) {
            console.log(`String = "${stringInput}" Reaches Final State (Accepted)`)
        } else {
            console.log(`String = "${stringInput}" Failed To Reach Final State With Stack Not Empty (REJECTED)`)
        }
    }

    validateInput(stringInput) {
        const string = this.addEmptyCharacter(stringInput);
        let currentState = this.states["Q0"]
        let autoReject = false;
        for (const char of string) {
            

            let toPop = currentState.pop?.[char] ?? null;
            let toPush = currentState.push?.[char] ?? null;
            let stackFront = this.stack[this.stack.length - 1] ?? null;

            // Pop
            if (stackFront !== null && toPop !== null && stackFront === toPop) {
                this.stack.pop();
               
            } else if (stackFront === null && toPop !== null) {
                autoReject = true;
                break;
            } else if (stackFront !== null && toPop !== null && stackFront !== toPop) {
                autoReject = true;
                break;
            }

            // Push
            if (toPush !== null) {
                this.stack.push(toPush);
                
            }

            let traverseLocation = currentState.input?.[char] ?? null;
            
            if (traverseLocation !== null){
                currentState = this.states[traverseLocation]
            }
            
        }

        this.validateResult(stringInput, autoReject);
    }

    
}

function Zero_n_One_n() {
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
        "0": "Q1",
        "1": "Q2",
    },
    // Pop
    {
        "0": null,
        "1": "0"
    },
    // Push
    {
        "0": "0",
        "1": null
    }
);

PDAInstance.addStateCondition(
    "Q2", 
    // To traverse
    {
        "e": "Q3",
        "1": "Q2",
    },
    // Pop
    {
        "e": "Z0",
        "1": "0"
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
}

Zero_n_One_n()

