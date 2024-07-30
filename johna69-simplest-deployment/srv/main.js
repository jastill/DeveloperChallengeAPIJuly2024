const cds = require('@sap/cds')
const log = cds.log('johna69')

class northbreeze extends cds.ApplicationService {
    init() {
        const { Products } = cds.entities('northwind')

        log.info('Service is initializing')
        this.on('selectProduct', async req => {
            log.info('ID:',req.data.communityid)

            const productCount = await SELECT.one.from(Products).columns('count(*) as count')

            log.info('Product:',productCount.count)

            const communityid = req.data.communityid
            const sum = [...communityid].map(b => b.toLowerCase().charCodeAt()).reduce( (a,b) => a + b )
            const value = (sum % productCount.count) +1

            const productName = await SELECT.one.from(Products).columns('ProductName').where({ProductID: value})

            return productName.ProductName
         })

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