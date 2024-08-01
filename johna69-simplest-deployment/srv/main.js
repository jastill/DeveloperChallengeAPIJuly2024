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

        // https://community.sap.com/t5/application-development-discussions/task-11-using-implicit-parameters-with-a-bound-function-july-developer/m-p/13778302/emcs_t/S2h8ZW1haWx8dG9waWNfc3Vic2NyaXB0aW9ufExaOVFBMFRQNUEzVTZKfDEzNzc4MzAyfFNVQlNDUklQVElPTlN8aEs
        this.on('stockValue', async (req) => {
            const [...values] = req.params


//Convert the  array into an o with key and value pairs                        // https://stackoverflow.com/questions/4215737/how-to-convert-an-array-into-an-object
            const params = values.reduce(function(result, item) {
                var key = Object.keys(item)[0]; //first property: a, b, c
                result[key] = item[key];
                return result;
              }, {});
            log.info('Values:',values)
            log.info('Params:',params)

            const product = await SELECT.one.from(Products).columns('UnitsInStock','UnitPrice').where({ProductID: params.ProductID});
            log.info('Product:',product)

            return product.UnitsInStock * product.UnitPrice
        })

        return super.init()
    }    
}

module.exports = northbreeze