const cds = require('@sap/cds')
const log = cds.log('johna69')

class plain extends cds.ApplicationService {
    async init() {
        log.info('Service is initializing')
        this.on('highestValue', req => {
            log.info('Value:',req.data)
            return Math.max(...req.data)
         })
        this.on('theAnswer', req => {return "42"})

        return super.init()
    }    
}

module.exports = plain