function TimeMachine(web3) {
  let snapshotId

  this.proceedBlock = () => new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: new Date().getTime(),
    }, (err, result) => {
      if (err) return reject(err)
      
      return resolve()
    })
  })

  this.mine = async (numOfBlocks) => {
    let i = 0
    for (i = 0; i < numOfBlocks; i++) {
      await this.proceedBlock()
    }
  }

  this.mineTo = async (height) => {
    const currentHeight = await web3.eth.getBlockNumber()
    if (currentHeight > height) {
      throw new Error(`Expecting height: ${height} is not reachable`)
    }
    return this.mine(height - currentHeight)
  }

  this.increaseTime = (seconds) => new Promise((resolve, reject) => {
    const id = new Date().getTime()
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [seconds],
      id,
    }, (err1) => {
      if (err1) return reject(err1)

      web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id + 1,
      }, (err2, res) => {
        if (err2) return reject(err2)
        return resolve(res)
      })
    })
  })

  this.revert = () => new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_revert',
      id: new Date().getTime(),
      params: [snapshotId],
    }, (err, result) => {
      if (err) return reject(err)

      return resolve(this.snapshot())
    })
  })

  this.snapshot = () => new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_snapshot',
      id: new Date().getTime(),
      params: [],
    }, (err, result) => {
      if (err) return reject(err)

      snapshotId = web3.utils.hexToNumber(result.result)
      return resolve()
    })
  })
}

module.exports = TimeMachine
