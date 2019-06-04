# sol-time-machine
Block manager for Solidity tests

## Install
```bash
npm install --save-dev sol-time-machine
```

## Usage
```js
const TimeMachine = require('sol-time-machine')
const timeMachine = new TimeMachine(global.web3)
```

### snapshot/revert
```js
// test.js
contract('Example', (accounts) => {
  beforeEach(async () => {
    await timeMachine.snapshot()
  })
  
  afterEach(async () => {
    await timeMachine.revert()
  })

  // Your tests here...
})
```

### mine
```js
// advance 10 blocks
await timeMachine.mine(10)
```

### mineTo
```js
// advance to block number 10
await timeMachine.mineTo(10)
```

### increaseTime
```js
// advances 1 block and sets the time to current time + 1000 seconds
await timeMachine.increaseTime(1000)
```
