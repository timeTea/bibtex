

app.service("bibtexs",function($q,$http){
    var def = $q.defer();
    var promise = def.promise;
    $http({
        method:'GET',
        // url:'http://10.20.216.111/api/search',
        url:'json/test.json'
        // data:{
        //     "author":[],
        //     "title":"",
        //     "keyWords":[],
        //     "yearStart":"",
        //     "yearEnd":"",
        //     "users":[],
        //     "rating":null,
        //     "memo":"",
        //     "order":{
        //         '1':'author',
        //         '2':'year',
        //         '3':'rating'
        //     },
        //     "numberBib":10
        // }
        //url:"http://10.20.216.200:5000/query"
    })
    .then(function(res){
        //console.log(res)
        def.resolve({
            data:res.data
        });
    },function(err){
        console.log(err);
    })
    return promise;
})