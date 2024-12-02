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

    addEmptyCharacter(stringInput, isPalindrome) {
        if (isPalindrome) {
            const middleIndex = Math.floor(stringInput.length / 2);
            return 'e' + stringInput.slice(0, middleIndex) + " " + stringInput.slice(middleIndex) + 'e';
        }
        return 'e' + stringInput + 'e';
    }

    validateResult(stringInput, autoReject) {
        if (this.stack.length === 0 && !autoReject) {
            console.log(`String = "${stringInput}" Reaches Final State (Accepted)`)
        } else {
            console.log(`String = "${stringInput}" Failed To Reach Final State With Stack Not Empty (REJECTED)`)
        }

        this.stack = []
    }

    validatePopper(stackFront, toPop) {
        // If array (if need to pop twice)
        if (Array.isArray(toPop)) {
            for (let item of toPop) {
                if (!this.validatePopper(stackFront, item)) {
                    return false;
                }
            }
            return true;
        }


        // Pop
        if (stackFront !== null && toPop !== null && stackFront === toPop) {
            this.stack.pop();
        } else if (stackFront === null && toPop !== null) {
            return true;
        } else if (stackFront !== null && toPop !== null && stackFront !== toPop) {
            return true;
        }
    }

    validatePusher(toPush) {
        if (Array.isArray(toPush)) {
            // Push each element in the array
            for (let item of toPush) {
                if (item !== null) {
                    this.stack.push(item);
                }
            }
        } else if (toPush !== null) {
            // Push single non-null value
            this.stack.push(toPush);
        }
    }

    validateInput(stringInput, isPalindrome) {
        const string = this.addEmptyCharacter(stringInput, isPalindrome);
        let currentState = this.states["Q0"]
        let autoReject = false;
        for (const char of string)  {
           
            let toPop = currentState.pop?.[char] ?? null;
            let toPush = currentState.push?.[char] ?? null;
            let stackFront = this.stack[this.stack.length - 1] ?? null;
            
            // Pop
            autoReject = this.validatePopper(stackFront, toPop)
            if (autoReject) { break; }

            // Push
            this.validatePusher(toPush)

            let traverseLocation = currentState.input?.[char] ?? null;
            
            if (traverseLocation !== null){    
                currentState = this.states[traverseLocation]
            }
            
        }

        this.validateResult(stringInput, autoReject);
       
    }

    
}

export {Node, PDA}






