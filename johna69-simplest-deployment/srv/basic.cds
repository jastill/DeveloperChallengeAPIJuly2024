using my.bookshop as my from '../db/data-model';

service basic @(path:'/basic') {
 function ping ( ) returns String;
 function hello (to:String) returns String;
}

