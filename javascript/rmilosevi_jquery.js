
$(document).ready(function () {

    naslov = $(document).find("title").text();
    switch (naslov)
    {
        case "Multimedija":
            loadMultimedija();
            break;
        case "Popis":
            loadPopis();
            break;
        case "Registracija":
            loadRegistracija();
            break;
        default:
            alert("greska");
            break;
    }
});

function loadMultimedija()
{
    console.log(document.cookie);
    var rijeci = new Array();
    var uspjeh;

    $("#trazi").click(function (event)
    {
        if ($(".podaci").hide().filter(":contains('" + $("input[name='pretraga']").val() + "')").show().length > 0)
        {
            $("#porukaUspjeha").hide();
        } else
        {
            $("#porukaUspjeha").show();
        }
    });

    $.getJSON("json/search.json",
            function (data)
            {
                $.each(data, function (key, val)
                {
                    rijeci.push(val);
                });
            });

    $('#pretraga').autocomplete({
        source: rijeci
    });
}

function loadPopis()
{
    
    console.log(document.cookie);
    obrisiKolacic();
    console.log(document.cookie);
    var tablica = $('#tablica').DataTable();
    $.ajax({
        url: "https://barka.foi.hr/WebDiP/2021/materijali/zadace/dz3/userNameSurname.php?all",
        type: "GET",
        datatype: "xml",
        success: function (xmldata) {
            $("user", xmldata).each(function () {
                var username = $(this).find("username").text();
                var neuspPrijava = $(this).find("failed_login").text();
                var blokiranDo = $(this).find("blocked_until").text();
                var id = $(this).attr("id");
                var tip = $(this).attr("tip");
                var status = $(this).attr("status");
                var ime = $(this).find("name").text();
                var prezime = $(this).find("surname").text();
                var password = $(this).find("password").text();
                var email = $(this).find("email").text();
                var slika = $(this).find("image").text();
                var kod = $(this).find("code").text();

                if (neuspPrijava.length == 0)
                {
                    neuspPrijava = "Podatak ne postoji!";
                }
                if (blokiranDo.length == 0)
                {
                    blokiranDo = "Podatak ne postoji!";
                }
                /*
                 if (id == document.cookie.split(';')[0].split('=')[1])
                 {
                 username=document.cookie.split(';')[1].split('=')[1];
                 tip=document.cookie.split(';')[2].split('=')[1];
                 status=document.cookie.split(';')[3].split('=')[1];
                 }
                 * */


                id = "<a href='obrasci/registracija.html' onclick=postaviKolacic('" + id + "')>" + id + "</a>";
                blokiranDo = "<a href=# id='" + $(this).attr("id") + "' onclick=posaljiZahtjev('" + $(this).attr("id") + "','" + username + "','" + prezime + "')>" + blokiranDo + "</a>";

                tablica.row.add([id, username, tip, status, neuspPrijava, blokiranDo]).draw();

            });
        }
    });
}

function postaviKolacic(ident)
{

    $.ajax({
        url: "https://barka.foi.hr/WebDiP/2021/materijali/zadace/dz3/userNameSurname.php?all",
        type: "GET",
        datatype: "xml",
        success: function (xmldata) {
            $("user", xmldata).each(function () {
                var id = $(this).attr("id");
                var username = $(this).find("username").text();
                var neuspPrijava = $(this).find("failed_login").text();
                var blokiranDo = $(this).find("blocked_until").text();
                var tip = $(this).attr("tip");
                var status = $(this).attr("status");
                var ime = $(this).find("name").text();
                var prezime = $(this).find("surname").text();
                var password = $(this).find("password").text();
                var email = $(this).find("email").text();
                var slika = $(this).find("image").text();
                var kod = $(this).find("code").text();

                if (neuspPrijava.length == 0)
                {
                    neuspPrijava = null;
                }
                if (blokiranDo.length == 0)
                {
                    blokiranDo = null;
                }
                if (kod.length == 0)
                {
                    kod = null;
                }

                if (ident == id)
                {
                    document.cookie = "id=" + ident;
                    document.cookie = "username=" + username;
                    document.cookie = "tip=" + tip;
                    document.cookie = "status=" + status;
                    document.cookie = "neuspPrijava=" + neuspPrijava;
                    document.cookie = "blokiranDo=" + blokiranDo;
                    document.cookie = "ime=" + ime;
                    document.cookie = "prezime=" + prezime;
                    document.cookie = "password=" + password;
                    document.cookie = "email=" + email;
                    document.cookie = "slika=" + slika;
                    document.cookie = "kod=" + kod;
                }
            });
        }
    });
}

function obrisiKolacic()
{
    document.cookie = "id=; expires=00/00/0000";
    document.cookie = "username=; expires=00/00/0000";
    document.cookie = "tip=; expires=00/00/0000";
    document.cookie = "status=; expires=00/00/0000";
    document.cookie = "neuspPrijava=; expires=00/00/0000";
    document.cookie = "blokiranDo=; expires=00/00/0000";
    document.cookie = "ime=; expires=00/00/0000";
    document.cookie = "prezime=; expires=00/00/0000";
    document.cookie = "password=; expires=00/00/0000";
    document.cookie = "email=; expires=00/00/0000";
    document.cookie = "slika=; expires=00/00/0000";
    document.cookie = "kod=; expires=00/00/0000";
}

function posaljiZahtjev(id, username, surname)
{
    $.ajax({
        url: "https://barka.foi.hr/WebDiP/2021/materijali/zadace/dz3/userNameSurname.php",
        data: "username=" + username + "&surname=" + surname,
        dataType: "xml",
        success: function (data) {
            $(data).find("users").each(function () {
                var code = $(this).find("code").text();
                var found = $(this).find("found").text();
                var dateTime = $(this).find('dateTime').text();
                var poljePrvo = dateTime.split(' ');
                var poljeDatum = poljePrvo[0].split('-');
                var poljeSati = poljePrvo[1].split(':');
                if (found != 0 || code == "")
                {
                    var okvirUnos = prompt("Unesite X dana!");
                    let godina = poljeDatum[0];
                    let mjesec = poljeDatum[1];
                    let dan = poljeDatum[2];
                    if (dan + okvirUnos > 31)
                    {
                        dan = okvirUnos - (31 - dan);
                        mjesec++;
                        if (mjesec = 13)
                        {
                            mjesec = 1;
                            godina++;
                        }
                    }
                    let sat = poljeSati[0];
                    let minuta = poljeSati[1];
                    let sekunda = poljeSati[2];
                    var datum = new Date(godina, mjesec, dan, sat, minuta, sekunda);
                    postaviKolacic(id);
                    document.cookie = "dateTime="+datum;
                    
                }
                $("#" + id).html(datum);
            });
        }
    });
}

function provjeriPodatke(ime, email)
{
    $.ajax({
            type: "GET",
            url: "../json/users.json",
            dataType: "json",
            success: function(data){
                for(let i = 0; i<data.length; i++){
                    if(data[i]['email'] == email && data[i]['username'] == ime)
                    {
                        if($("#lozinka2").val() != data[i]['password'])
                        {
                            $("#ime-i-prezime").attr("disabled", "disabled");
                            $("#email").attr("disabled", "disabled");
                            $("#korime").attr("disabled", "disabled");
                            $("#lozinka1").attr("disabled", "disabled");
                        }
                        else 
                        {
                            $("#ime-i-prezime").removeAttr("disabled");
                            $("#email").removeAttr("disabled");
                            $("#korime").removeAttr("disabled");
                            $("#lozinka1").removeAttr("disabled");
                        }
                    }
                }
            }
        });
}


function loadRegistracija()
{
    console.log(document.cookie);
    var kolacic = document.cookie;
    var polje = kolacic.split(';');
    console.log(polje[19]);
    if((polje[19]!="" && polje[19]!="username=; expires=00/00/0000") && (polje[24]!="" && polje[24]!="ime=; expires=00/00/0000") && (polje[25]!="" && polje[25]!="prezime=; expires=00/00/0000") && (polje[26]!="" && polje[26]!="password=; expires=00/00/0000") && (polje[27]!="" && polje[27]!="email=; expires=00/00/0000"))
    {
        $("#ime-i-prezime").val(polje[24].split('=')[1] + " " + polje[25].split('=')[1]).attr("disabled", "disabled");
        $("#email").val(polje[27].split('=')[1]).attr("disabled", "disabled");
        $("#korime").val(polje[19].split('=')[1]).attr("disabled", "disabled");
        $("#lozinka1").val(polje[26].split('=')[1]).attr("disabled", "disabled");
    }
    $("#lozinka2").on("input", function(){
        provjeriPodatke(polje[19].split('=')[1], polje[27].split('=')[1]);
    });
    
    $(".gumb").click(function(event){
       $.ajax({
            url: "https://barka.foi.hr/WebDiP/2021/materijali/zadace/dz3/userNameSurname.php",
            data: "username=" + polje[19].split('=')[1] + "&surname=" + polje[25].split('=')[1],
            dataType: "xml",
            success : function(data) {
                $(data).find('users').each(function (){
                    let found = $(this).find('found').text();
                    let status = $(this).find('status').text();
                    let code = $(this).find('code').text();
                    let dateTime = Date.parse($(this).find('dateTime').text());
                    if($(this).find('found').text() == 0){
                       
                        document.cookie = 'name=' + polje[7].split('=')[1];
                        document.cookie = 'surname=' + polje[8].split('=')[1];
                        document.cookie = 'password=' + polje[9].split('=')[1];
                        document.cookie = 'email=' + polje[10].split('=')[1];
                        document.cookie = 'it_type=3';
                        document.cookie = 'id_status=-1';
                        document.cookie = 'code=null';
                        
                    }
                    else {
                        postaviKolacic($(this).find(polje[18].split('=')[1]).text());
                    }  
                });
            }
        });
        
        if($("#lozinka1").val()!=$("#lozinka2").val())
        {
            $("#lozinka1").css("border", "2px solid red");
            $("#lozinka2").css("border", "2px solid red");
        }
        else
        {
            $("#lozinka1").css("border", "1px solid black");
            $("#lozinka2").css("border", "1px solid black");
        }
        if($("#ime-i-prezime").val()=="")
        {
            $("#ime-i-prezime").css("border", "2px solid red");
        }
        else
        {
            $("#ime-i-prezime").css("border", "1px solid black");
        }
        
    });
}
