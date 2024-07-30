using northwind from '../db/schema';

service northbreeze {

    entity Products   as projection on northwind.Products 
    actions {
       function stockValue() returns Integer
    };
    entity Suppliers  as projection on northwind.Suppliers;
    entity Categories as projection on northwind.Categories;

    entity TotalProducts as select from Products {
        count(ProductID) as count:Integer
    };

    function productInfo(id:Integer) returns String;
    action selectProduct(communityid:String) returns String;

}