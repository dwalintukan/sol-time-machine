# sol-time-machine
Block manager for Solidity tests

## Install
```bash
npm install sol-time-machine
```

## Usage
```js
// test.js
const TimeMachine = require('sol-time-machine')

contract('Example', (accounts) => {
  const timeMachine = new TimeMachine(global.web3)

  beforeEach(async () => {
    await timeMachine.snapshot
  })
  
  afterEach(async () => {
    await timeMachine.revert
  })

  // Your tests here...
```
