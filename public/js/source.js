$(document).ready(()=>{

    $('#search1').click((e)=>{
        e.preventDefault();
        let Namely = $('#search').val();
        console.log(Namely)
        $.ajax({
            url: `http://localhost:3000/Bucketlists/?Name=${Namely}`,
            method: 'GET',
        }).done((e)=>{            
        $('#tbody').empty();
        for(let i = 0; i < e.length; i++){
            $('#tbody').append(
                `<tr class="clickable-row">
                    <td>${i+1}</td>
                    <td>${e[i].Name}</td>
                    <td>${e[i].Date_Created}</td>
                    <td>${e[i].Date_Modified}</td>
                    <td>${e[i].Created_By}</td>
                    <td><button type="" class="btn btn-success btn-view" id="${e[i].id}">View&Edit</button></td>  
                    <td><button type="" class="btn btn-danger btn-delete" id="${e[i].id}">Delete</button></td>   
                </tr>`
            )
            }
        })
    })

    $.fn.onload = function(){
        $('#tbody').empty();
        $.ajax({
            url: 'http://localhost:3000/Bucketlists',
            method: 'GET',
            }).done((e)=>{
            for(let i = 0; i < e.length; i++){
            $('#tbody').append(
                `<tr class="clickable-row">
                    <td>${i+1}</td>
                    <td>${e[i].Name}</td>
                    <td>${e[i].Date_Created}</td>
                    <td>${e[i].Date_Modified}</td>
                    <td>${e[i].Created_By}</td>
                    <td><button type="" class="btn btn-success btn-view" id="${e[i].id}">View&Edit</button></td>  
                    <td><button type="" class="btn btn-danger btn-delete" id="${e[i].id}">Delete</button></td>   
                </tr>`
            )
            }

            $('.btn-view').on('click',(e)=>{
                y = e.target.id;
                $.ajax({
                    url: `http://localhost:3000/Bucketlists/${y}`,
                    method: 'GET',
                    }).done((e)=>{
                            $('#Name2').val(`${e.Name}`)
                            $('#Date_Created2').val(`${e.Date_Created}`)
                            $('#Date_Modified2').val(`${e.Date_Modified}`)
                            $('#Created_By2').val(`${e.Created_By}`)
                    })
                $(window).scrollTop(0)
                $('.table').fadeTo('fast', 0.4)
                $('.form2').css('visibility',"visible");
            })
    
            $('.btn-delete').on('click',(e)=>{
                x = e.target.id;
                $(window).scrollTop(0)
                $('.table').fadeTo('fast', 0.4)
                $('.form3').css('visibility',"visible");
            })
        })
    }
    
    $('#tbody').onload()

    $('#close').on('click',(e)=>{
        $('.form1').css('visibility',"hidden");
        $('.table').fadeTo('fast', 1)
    })
    
    $('#close2').on('click',(e)=>{
        $('.form2').css('visibility',"hidden");
        $('.table').fadeTo('fast', 1)
    })

    $('#close3').on('click',(e)=>{
        $('.form4').css("visibility","hidden");
        e.preventDefault()
    })

    $('#close4').on('click',(e)=>{
        $('.form5').css("visibility","hidden");
        $('.table').fadeTo('fast', 1)
        e.preventDefault()
    })

    $('#signuplogin').on('click',(e)=>{
        $('.form4').css("visibility","visible");
        e.preventDefault()
    })

    $('#signup').on('click',(e)=>{
        $('.form5').css("visibility","visible");
        $('.form4').css("visibility","hidden");
        e.preventDefault()
    })

    $('#login').on('click',(e)=>{
        $('.form4').css("visibility","visible");
        $('.form5').css("visibility","hidden");
        e.preventDefault()
    })

    $('#create').on('click',(e)=>{
        e.preventDefault()
        $('.table').fadeTo('fast', 0.4)
        $('.form1').css('visibility',"visible");
    })

    $('#createaccount').on('click',(e)=>{
        e.preventDefault()
        $('.table').fadeTo('fast', 0.4)
        $('.form5').css('visibility',"visible");
    })

    
    $('#save').click((e)=>{
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        e.preventDefault();
        var Name = $('#Name').val();
        var Date_Created = `${day + "/" + month + "/" + year}`;
        var Date_Modified = "nil";
        var Created_By = $('#Created_By').val();

        if(Name.length <= 2){
            $('#outputform1').html("Name is too short")
            return
        }else{$.ajax({
                url: 'http://localhost:3000/Bucketlists',
                method: 'POST',
                data:{
                    Name, Date_Created, Date_Modified, Created_By,
                }
            }).done((e)=>{
                $('.form1').css("visibility","hidden")
                $('#tbody').reload()
                $('.table').fadeTo('fast', 1)
            })
        }
        })
        

    $('#save2').click((e)=>{
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        e.preventDefault();
        let Name = $('#Name2').val();
        let Date_Created = $('#Date_Created2').val();
        let Date_Modified = `${day + "/" + month + "/" + year}`;
        let Created_By = $('#Created_By2').val();
        $.ajax({
            url: `http://localhost:3000/Bucketlists/${y}`,
            method: 'put',
            data:{
                Name, Date_Created, Date_Modified, Created_By,
            }
        }).done((e)=>{
            $('.form2').css("visibility","hidden")
            $('.table').fadeTo('fast', 1)
            $('#tbody').reload()
        })
    })

    $('#yes').click((e)=>{
            e.preventDefault();
            let id = x;
            $('.form3').css("visibility","hidden")
            $.ajax({
                url: `http://localhost:3000/Bucketlists/${id}`,
                method: 'delete',
            }).done((e)=>{
            $('.tbody').reload() 
            $('.table').fadeTo('fast', 1)
        })   
    })

    $('#no').click((e)=>{
        $('.form3').css("visibility","hidden")
        $(".table").fadeTo('fast', 1)
    })

    $('#ok').click((e)=>{
        $('.form6').css("visibility","hidden");
        e.preventDefault()
    })
    
    $('#homebtn').click((e)=>{
        window.location.replace('http://localhost:3000/');
    })

    $('#log-in').click((e)=>{
        var userName = $('#username').val();
        var passWord = $('#password').val();
        $.ajax({
            url: 'http://localhost:3000/Auth/',
            method: 'GET',
        }).done((e)=>{
            for(let q = 0; q < e.length; q++){
                if(e[q].username == userName && e[q].password == passWord){
                    localStorage.setItem("Username", userName)
                }
            }if (window.localStorage.getItem("Username") != ""){
                window.location.replace('http://localhost:3000/dataPage.html');
            }else{
                $('.form4').css("visibility","none")
                $('.form5').css("visibility","none")
                $('.form6').css("visibility","visible")
            }
        })
    })

    $('#sign-up').click((e)=>{
        e.preventDefault();
        var username = $('#username2').val();
        var firstname = $('#firstname2').val();
        var lastname = $('#lastname2').val();
        var password = $('#password2').val();
        var password2 = $('#password3').val();
        var age = $('#age2').val();

        $.ajax({
            url: 'http://localhost:3000/Admin',
            method: 'GET',
            }).done((e)=>{
            for(let q = 0; q < e.length; q++){
                if(e[q].username == username){
                    $('#output').html("Username already exists")
                    return
                }else if(username.length <= 3){
                    $('#output').html("Username is too short")
                    return
                }else if(firstname.length <= 2){
                    $('#output').html("Firstname is too short")
                    return
                }else if(lastname.length <= 2){
                    $('#output').html("Lastname is too short")
                    return
                }else if(password.length < 8){
                    $('#output').html("passwords are too short")
                    return
                }else if(password2 != password){
                    $('#output').html("passwords dont match")
                    return
                }else if(parseInt(age) < 18 || age.length < 1){
                    $('#output').html("you are under 18 years")
                    return
                }
            } $.ajax({
                url: 'http://localhost:3000/Admin',
                method: 'POST',
                data:{
                    username, firstname, lastname, password, age
                }
            }).done((e)=>{
                alert("successsful")
                $('.form5').css("visibility","hidden")
                $('.table').fadeTo('fast', 1)
            })
        })

    })

    $('#logoutbtn').click((e)=>{
        localStorage.setItem("Username", "")
        window.location.replace('http://localhost:3000/')
    })
    
    $('#continueDataPage').click((e)=>{
        window.location.replace('http://localhost:3000/dataPage.html')
    })


})

function slider(){
    let p = $('#img1').attr('src');
    if(p == "./images/tiger.jpg"){
        $('#img1').attr('src',"./images/croc.jpg");
    }else if(p == "./images/croc.jpg"){
        $('#img1').attr('src',"./images/zebra.jpg");
    }else{
        $('#img1').attr('src',"./images/tiger.jpg");
    }
}

window.setInterval(slider, 5000)