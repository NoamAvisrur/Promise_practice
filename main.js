
//-------answer1-two separated promises for two separated $get-------------
var p1 = new Promise(function(resolve,reject){
    $.get('fruits.txt', function(data){
         resolve(data);
    });
});

p1.then(function(data){
    return JSON.parse(data);
})
.then(function (arr){
    $.each(arr, function(i, v){
        createElements(v, '.fruits');
    });
});

var p2 = new Promise(function(resolve,reject){
    $.get('vegetables.txt', function(data){
         resolve(data);
    });
});

p2.then(function(data){ 
    return JSON.parse(data);
})
.then(function (arr){
    $.each(arr, function(i, v){
        createElements(v, '.vegetables');
    })
})

function createElements(str, selector) {
	$('<p>', {text: str}).appendTo($(selector));
}
//-------answer2-one chained promise with two separated $get-------------

var P = new Promise(function(resolve,reject){
    $.get('fruits.txt', function(data){
         resolve(data);
    });
});

P.then(function(data){ 
    console.log('1');
    arr = JSON.parse(data);
    return arr;
})
.then(function (arr){
     console.log('2');
    $.each(arr, function(i, v){
        createElements(v, '.fruits2');
    });
})
.then(function(){
    return new Promise(function (resolve, reject) {
        console.log('3');
        $.get('vegetables.txt', function(data){
            resolve(data);
        })
    })    
})
.then(function (data) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('4');
	    resolve(data);
	}, 2500);
    })
})
.then(function (data){
    console.log('5');
    arr = JSON.parse(data);
    $.each(arr, function(i, v){
       createElements(v, '.vegetables2');
    });
})

//--------answer3--one promise all combining two $gets------------------

function getJson(url){
    var promise = new Promise(function (resolve, reject) {
	$.get(url, function(data) {
	    resolve(data);
	});
    });
    return promise;
}

Promise.all([getJson('fruits.txt'), getJson('vegetables.txt')])
.then(function(response){
    arr1 = JSON.parse(response[0]);
    arr2 = JSON.parse(response[1]);
    joinedarr = arr1.concat(arr2);
    return joinedarr;
})
.then (function(arr){
    console.log(arr);
    $.each(arr, function(i, v){
        createElements(v, '.fruitsAndvegs');
    });   
})
