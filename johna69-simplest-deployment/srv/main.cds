using northwind from '../db/schema';

service northbreeze {

    entity Products   as projection on northwind.Products;
    entity Suppliers  as projection on northwind.Suppliers;
    entity Categories as projection on northwind.Categories;

    function productInfo(id:Integer) returns String;
    action selectProduct(communityid:String) returns String;

}