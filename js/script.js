var allBibtex = [];
var viewBibtex = [];


app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/papers/:status',{
        templateUrl:"papers.html",
        controller:"papersCtrl"
    })
    .when('/edit/:id',{
        templateUrl:"edit.html",
        controller:"editCtrl"
    })
    .when('/insert',{
        templateUrl:"insert.html",
        controller:"insertCtrl"
    })
    .when('/upBib',{
        templateUrl:"upBib.html",
        controller:"upBibCtrl"
    })
    .when('/view',{
        templateUrl:"view.html",
        controller:"viewCtrl"
    })
    .otherwise({
        redirectTo:"/papers/1"
    })
});

app.controller("papersCtrl",function($scope,bibtexs,$location,$routeParams,$http,$q){
    var selectNumber = [];
    $scope.author = ""
    $scope.title = ""
    $scope.yearStart = ""
    $scope.yearEnd = ""
    $scope.users = ""
    $scope.rating = ""

    $scope.searchBib = function(){
        var formData = new FormData();
        var def = $q.defer();
        var promise = def.promise;

        //console.log(author)
        var title = $scope.title;
        var yearStart = $scope.yearStart;
        var yearEnd = $scope.yearEnd;
        var memo = $scope.Memo;
        var numberBib = $scope.numberBib;

        var keyWords = []
        if($scope.keyWords != null && $scope.keyWords != ""){
            keyWords = $scope.keyWords.split(',');
        }
        var author = []
        if($scope.author != null && $scope.author != ""){
            author = $scope.author.split(',');
        }
        var users = [];
        if($scope.users != null && $scope.users != ""){
            users = $scope.users.split(',');
        }

        var rating = ""
        if($scope.rating == ""){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:1')
        }else if(/^[0-9]+$/.test($scope.rating)){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:2')
        }else{
            var ratingErr = document.createElement('span')
            ratingErr.innerHTML = "Rating必须为数字."
            var appendArea = document.getElementById('toAppend');
            appendArea.style.display = "block"
            appendArea.appendChild(ratingErr)
            console.log('status:3')
            return 0
        }

        var styleAuthor = Number($scope.styleAuthor);
        var styleYear = Number($scope.styleYear);
        var styleRating = Number($scope.styleRating);
        
        var order = {}
        //author year rating
        if(styleAuthor <= styleYear){
            if(styleAuthor <=styleRating){
                if(styleYear <= styleRating){
                    //order = [1,2,3]
                    order = {
                        '1':'author',
                        '2':'year',
                        '3':'rating'
                    }
                }else{
                    //order = [1,3,2]
                    order = {
                        '1':'author',
                        '3':'year',
                        '2':'rating'
                    }
                }
            }else{
                //order = [2,3,1]
                    order = {
                        '2':'author',
                        '3':'year',
                        '1':'rating'
                    }
            }
        }else{ //styleAuthor > styleYear
            if(styleYear <= styleRating){
                if(styleAuthor <= styleRating){
                    //order = [2,1,3]
                    order = {
                        '2':'author',
                        '1':'year',
                        '3':'rating'
                    }
                }else{
                    //order = [3,1,2]
                    order = {
                        '3':'author',
                        '1':'year',
                        '2':'rating'
                    }
                }
            }else{ //styleYear >styleRating
                //order = [3,2,1]
                    order = {
                        '3':'author',
                        '2':'year',
                        '1':'rating'
                    }
            }
        }

        console.log(order)

        formData.append('author',author)
        // console.log(author)
        formData.append("title",title)
        formData.append("keyWords",keyWords)
        formData.append("yearStart",yearStart)
        formData.append("yearEnd",yearEnd)
        formData.append("users",users)
        formData.append("rating",rating)
        formData.append("style",order)
        //console.log(formData.get('author'))
        // console.log(formData.get('title'))

        $http({
            method:"POST",
            url:"http://10.20.216.111/api/search",
            data:{
                "author":author,
                "title":title,
                "keyWords":keyWords,
                "yearStart":yearStart,
                "yearEnd":yearEnd,
                "users":users,
                "rating":rating,
                "memo":memo,
                "order":order,
                "numberBib":numberBib
            },
            headers: { 'Content-Type': undefined}
        })
        // $http.get("http://10.20.216.111:5000/search",{
        //     params:{
        //         'author':author
        //     }
        // })
        .then(function(res){
            def.resolve({
                data:res.data
            });
        },function(err){
            console.log("error");
        });
        
        promise.then(function(data) {
            $scope.items = data.data['data'];
            allBibtex = data.data['data'];
        }, function(error) {
            console.log(error);
        });
    }
    //status为1时更新数据，其他时不更新数据
    if($routeParams.status == 1){
        bibtexs.then(function(res){
            // $scope.items = res.data['data'];
            // allBibtex = res.data['data'];
            console.log(res.data[0])
            // $scope.items = res.data
            var allBib = ""
            for(let index = 0; index < res.data.length; index++){
                console.log(res.data[index]['biborigin'])
                if(res.data[index]['biborigin'] != null){
                    allBib += res.data[index]['biborigin']
                }
            }
            console.log(allBib)
            console.log(splitFile(allBib))
            $scope.items = splitFile(allBib)

            //console.log(res.data)
        },function(err){
            console.log('error');
        })
    }else{
        $scope.items = allBibtex;
    }
    
    $scope.edit = function(id){
        //console.log(id)
        $location.path("/edit/"+id)
    }

    $("#selectAll").click(function(){
        if($(this).attr('checked')){
            $(this).attr('checked',false)
            $(".selectItem").attr({'checked':false})
            $(".selectItem").prop({'checked':false})
        }else{
            $(this).attr('checked',true)
            $(".selectItem").attr({'checked':true})
            $(".selectItem").prop({'checked':true})
        }
    })

    $scope.insert = function(){
        $location.path('/insert')
    }

    $scope.insertBib = function(){
        $location.path('/upBib')
    }

    $scope.next = function(){
        $("input[name='ids']:checked").each(function(){
            selectNumber.push(Number($(this).attr('selectNum')))
        })
        //console.log(selectNumber)
        viewBibtex = []
        for (let index = 0; index < selectNumber.length; index++) {
            viewBibtex.push(allBibtex[selectNumber[index]]);
        }
        $location.path('/view')
    }

    $scope.deleteBibtex = function(id){
        var warning = "您真的要删除吗？";
        if (confirm(warning) == true) {
            console.log("您按了确认！");
            console.log(id)
            $http({
                method:"POST",
                url:"",
                data:{
                    "id":id
                },
                headers:{'context-type':undefined}
            })
            .then(function(){
                $location.path('/papers/1')
            })
        } else {
            console.log("您按了取消！");
        }
    }
})

app.controller("editCtrl",function($scope,$routeParams,$location,$http){
    var b = {};
    for (let index = 0; index < allBibtex.length; index++) {
        if(allBibtex[index]['id']==$routeParams.id){
            b = (allBibtex[index])
        };
    }

    $scope.keyWords = b['keyWords']
    $scope.memo = b['memo'];
    $scope.biborigin = b['biborigin'];
    $scope.modelAlgo = b['modelAlgo'];

    $scope.edit = function(){
        var formData = new FormData()

        var keyWords = String($scope.keyWords).split(',');
        var memo = $scope.memo;
        var biborigin = $scope.biborigin;
        var modelAlgo = String($scope.modelAlgo).split(',');
        var id = b['id'];

        var users = [];
        if($scope.users != null && $scope.users != ""){
            users = $scope.users.split(',');
        }

        var rating = ""
        if($scope.rating == ""){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:1')
        }else if(/^[0-9]+$/.test($scope.rating)){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:2')
        }else{
            var ratingErr = document.createElement('span')
            ratingErr.innerHTML = "Rating必须为数字."
            var appendArea = document.getElementById('toAppend');
            appendArea.style.display = "block"
            appendArea.appendChild(ratingErr)
            console.log('status:3')
            return 0
        }
        
        formData.append("keyWords",keyWords)
        formData.append("memo",memo)
        formData.append("biborigin",biborigin)
        formData.append("modelAlgo",modelAlgo)
        formData.append("users",users)
        formData.append("rating",rating)
        formData.append("id",id)

        $http({
            method:'POST',
            url:"http://10.20.216.111/api/edit",
            // data:{
            //     'keyWords':keyWords,
            //     'memo':memo,
            //     'biborigin':biborigin,
            //     'modelAlgo':modelAlgo,
            //     'id':id
            // },
            data:formData,
            headers: { 'Content-Type': undefined }
            
        })
        .then(function(){
            $location.path('/papers/1')
        },function(err){
            console.log("error")
            console.log(err)
        })
    }

    $scope.back = function(){
        $location.path('/papers/2')
    }
})

app.controller("insertCtrl",function($http,$scope,$location){
    //
    $scope.back = function(){
        $location.path('/papers/2')
    }

    $scope.insertBib = function() {
        var formData = new FormData();

        var keyWords = []
        if($scope.keyWords != null){
            keyWords = $scope.keyWords.split(',');
        }
        var users = []
        if($scope.users != null){
            users = $scope.users.split(',');
        }
        // if($scope.rating != null){
        //     var rating = Number($scope.rating);
        //     formData.append('rating',rating)
        // }else{
        //     //var rating = 0
        // }

        //检测rating是否为数字
        var rating = ""
        if($scope.rating == ""){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:1')
        }else if(/^[0-9]+$/.test($scope.rating)){
            rating = $scope.rating
            $('#toAppend').css('display','none')
            console.log('status:2')
        }else{
            var ratingErr = document.createElement('span')
            ratingErr.innerHTML = "Rating必须为数字."
            var appendArea = document.getElementById('toAppend');
            appendArea.style.display = "block"
            appendArea.appendChild(ratingErr)
            console.log('status:3')
            return 0
        }
        formData.append('rating',rating)

        var modelAlgo = []
        if($scope.modelAlgo != null){
            modelAlgo = $scope.modelAlgo.split(',');
        }
        var biborigin = $scope.biborigin;
        var memo = $scope.memo
        var file = document.getElementById('input-file').files[0];
        
        //console.log(file)
        formData.append('keyWords',keyWords)
        formData.append('users',users)
        formData.append('modelAlgo',modelAlgo)
        formData.append('file',file)
        formData.append('biborigin',biborigin)
        formData.append('memo',memo)

        //$location.path('/papers')
        $http({
            method: "POST",
            url:"http://10.20.216.111/api/uploadPDFAndBib",
            data:formData,
            headers: { 'Content-Type': undefined}
        })
        .then(function(){
            $location.path('/paper/1')
        },function(err){
            var e = document.createElement('p')
            e.innerHTML = "插入失败"
            e.setAttribute('class','text-danger')
            var btn = document.getElementById("btn-insert")
            btn.append(btn)
            console.log('error')
        })
    }

})

app.controller("viewCtrl",function($scope,$location){
    $scope.items = viewBibtex;

    $scope.back = function(){
        console.log("view")
        $location.path('/papers/2')
    }

    $scope.edit = function(id){
        //console.log(id)
        $location.path("/edit/"+id)
    }
})

app.controller('upBibCtrl',function($scope,$http,$location){

    $scope.submit = function(){
        var formData = new FormData()

        var fileString = ""    
        var file = document.getElementById('input-file').files[0]
        const reader = new FileReader()
        reader.readAsText(file, "UTF-8")
        reader.onload = function(e){
          // 读取文件内容
          fileString = e.target.result
          //console.log(fileString)
          var bibtex = fileString.split('@')
          var b = []
          var bibOrigin = {}
          var num = 0;
          for (let index = 0; index < bibtex.length; index++) {
              if(bibtex[index] != ""){
                  bibOrigin["biborigin"] = '@'+bibtex[index]
                  b.push(bibOrigin);
                  bibOrigin = {}
              }
          }
          console.log(b)
          $http({
              method:"POST",
              url:"http://10.20.216.111/api/uploadBibFile",
              data:{
                  "bibFile":b
              },
              headers: { 'Content-Type': undefined }              
          })
          .then(function(){
              $location.path('/papers/1')
          })
        }
    }

    $scope.back = function(){
        $location.path('/papers/2')
    }
})

function showBib(obj){
    var name = $(obj).next();
    var show = name.css('display');
    if(show == 'block'){
        name.css('display',"none");
    }else{
        name.css('display','block')
    }
    //console.log(show)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
   
    element.style.display = 'none';
    document.body.appendChild(element);
   
    element.click();
   
    document.body.removeChild(element);
}
  
function downloadBib(){
    var text = ""
    for (let index = 0; index < viewBibtex.length; index++) {
        text += viewBibtex[index]['biborigin'];
        text += '\n'
    }
    download("mybib.bib",text);
}

// function updata(obj){
//     var id = $(obj).attr('id');
    // for (let index = 0; index < allBibtex.length; index++) {
    //     const element = allBibtex[index];
    //     if(allBibtex[index]['id']==id){
    //         console.log(allBibtex[index]['author'])
    //     };
    // }
// }
