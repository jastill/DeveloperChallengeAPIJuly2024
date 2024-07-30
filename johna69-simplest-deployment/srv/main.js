const cds = require('@sap/cds')
const log = cds.log('johna69')

class northbreeze extends cds.ApplicationService {
    init() {
        const { Products } = cds.entities('northwind')

        log.info('Service is initializing')
        this.on('productInfo', async req => {
            log.info('ID:',req.data.id)

            const product = await SELECT.one.from(Products).columns('ProductName','Supplier.CompanyName').where({ProductID: req.data.id});
            log.info('Product:',product)
            return product.ProductName + ' by ' + product.Supplier_CompanyName
         })

        return super.init()
    }    
}

module.exports = northbreeze