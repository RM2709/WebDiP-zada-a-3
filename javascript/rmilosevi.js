var vodoravno
var odabirKategorije;
var unosDatoteke;
var unosDatumVrijeme;
var unosTekst;
var slanjeForme;

var greskaDatumVrijeme;
var greskaFormatDatoteke;
var greskaVelicinaDatoteke;
var greskaDuzinaTeksta;
var greskaNedozvoljeniZnakoviTekst;

window.addEventListener("load", ucitajStranicu);

function ucitajStranicu()
{
    greskaDatumVrijeme = true;
    greskaFormatDatoteke = true;
    greskaVelicinaDatoteke = true;
    greskaDuzinaTeksta = true;
    greskaNedozvoljeniZnakoviTekst = true;
    vodoravno = true;
    odabirKategorije = document.getElementById("kategorija");
    odabirKategorije.addEventListener("change", promjenaOdabiraKategorije);

    unosDatoteke = document.getElementById("naziv");
    unosDatoteke.addEventListener("change", provjeriDatoteku);

    unosDatumVrijeme = document.getElementById("datum-vrijeme");
    unosDatumVrijeme.addEventListener("keydown", provjeriDatumVrijeme);
    unosDatumVrijeme.addEventListener("keyup", provjeriDatumVrijeme);

    unosTekst = document.getElementById("opis");
    unosTekst.addEventListener("focus", provjeraTeksta);
    unosTekst.addEventListener("blur", provjeraTeksta);

    console.log(greskaDatumVrijeme);
    console.log(greskaFormatDatoteke);
    console.log(greskaVelicinaDatoteke);
    console.log(greskaDuzinaTeksta);
    console.log(greskaNedozvoljeniZnakoviTekst);

    slanjeForme = document.getElementById("obrazac-sadrzaj");
    slanjeForme.addEventListener("submit", function (event) {
        var posalji = true;
        var poruka = "";
        var brojac = 1;
        if (greskaDatumVrijeme == true)
        {
            posalji = false;
            poruka += brojac + ". greška: Format datuma i/ili vremena neispravan.\n";
            brojac++;
        }
        if (greskaFormatDatoteke == true)
        {
            posalji = false;
            poruka += brojac + ". greška: Format datoteke je neispravan. Prihvaćaju se samo formati .pdf, .png, .jpg, .mp3 i .mp4.\n";
            brojac++;
        }
        if (greskaVelicinaDatoteke == true)
        {
            posalji = false;
            poruka += brojac + ". greška: Datoteka je pre velika. 1MB je maksimalna veličina.\n";
            brojac++;
        }
        if (greskaNedozvoljeniZnakoviTekst == true)
        {
            posalji = false;
            poruka += brojac + ". greška: U tekstu postoje nedozvoljeni znakovi.\n";
            brojac++;
        }
        if (greskaDuzinaTeksta == true)
        {
            posalji = false;
            poruka += brojac + ". greška: Tekst nije dovoljno dugačak (100 znakova).\n";
            brojac++;
        }
        
        if(posalji==true)
        {
            poruka += "Obrazac točno ispunjen."
        }

        alert(poruka);

        if (posalji == false)
        {
            event.preventDefault();
        }
        
        if (greskaDatumVrijeme == true)
        {
            document.getElementById("labelDatum").innerHTML = "*Datum i vrijeme unosa: ";
            document.getElementById("labelDatum").style.color = "red";
        }
        else
        {
            document.getElementById("labelDatum").innerHTML = "Datum i vrijeme unosa: ";
            document.getElementById("labelDatum").style.color = "#FBFAF6";
        }
        if (greskaFormatDatoteke == true || greskaVelicinaDatoteke == true)
        {
            document.getElementById("labelNaziv").innerHTML = "*Naziv: ";
            document.getElementById("labelNaziv").style.color = "red";
        }
        else
        {
            document.getElementById("labelNaziv").innerHTML = "Naziv: ";
            document.getElementById("labelNaziv").style.color = "#FBFAF6";
        }
        if (greskaNedozvoljeniZnakoviTekst == true || greskaDuzinaTeksta == true)
        {
            document.getElementById("labelOpis").innerHTML = "*Opis: ";
            document.getElementById("labelOpis").style.color = "red";
        }
        else
        {
            document.getElementById("labelOpis").innerHTML = "Opis: ";
            document.getElementById("labelOpis").style.color = "#FBFAF6";
        }


    });

    promijeniRedoslijedPrikaza();
    pokreniTimer();
}

var timer = "";
var minute = 0;
var sekunde = 0;
setInterval(pokreniTimer, 1000);
function pokreniTimer()
{
    if (minute == 10)
    {
        minute = 0;
        sekunde = 0;
        resetirajObrazac();
        timer = "00:00";
    } else if (minute < 10 && sekunde < 10)
    {
        timer = "0" + minute + ":" + "0" + sekunde;
    } else if (minute < 10 && sekunde >= 10 && sekunde < 60)
    {
        timer = "0" + minute + ":" + sekunde;
    } else if (minute < 9 && sekunde == 60)
    {
        minute++;
        sekunde = 0;
        timer = "0" + minute + ":" + "0" + sekunde;
    } else if (minute == 9 && sekunde == 60)
    {
        minute++;
        sekunde = 0;
        timer = "10:00";
    }

    document.getElementById("timer").innerHTML = timer;
    sekunde++;
}

function resetirajObrazac()
{
    document.getElementById("obrazac-sadrzaj").reset();
}

function promjenaOdabiraKategorije()
{
    if (odabirKategorije.value == "Ogar" || odabirKategorije.value == "Životinja")
    {
        vodoravno = true;
        promijeniRedoslijedPrikaza();
    } else if (odabirKategorije.value == "Čovjek" || odabirKategorije.value == "Magično biće") {
        vodoravno = false;
        promijeniRedoslijedPrikaza();
    }
}

function promijeniRedoslijedPrikaza()
{
    if (vodoravno == true)
    {
        document.getElementById("status").innerHTML = "Vodoravno";
    } else {
        document.getElementById("status").innerHTML = "Uspravno";
    }
}

function provjeriDatoteku()
{
    greskaFormatDatoteke = false;
    greskaVelicinaDatoteke = false;
    var datoteka = document.getElementById("naziv");
    var format = datoteka.value.substring(datoteka.value.length - 3);
    if (format != "pdf" && format != "png" && format != "jpg" && format != "mp3" && format != "mp4")
    {
        greskaFormatDatoteke = true;
    }
    if (datoteka.files[0].size > (1024 * 1024))
    {
        greskaVelicinaDatoteke = true;
    }
}

function provjeriDatumVrijeme()
{
    greskaDatumVrijeme = false;
    var datumVrijeme = document.getElementById("datum-vrijeme").value;
    var dozvoljeneZnamenke = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (dozvoljeneZnamenke.includes(datumVrijeme[0], 4) == true || dozvoljeneZnamenke.includes(datumVrijeme[0]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[0]) == false || dozvoljeneZnamenke.includes(datumVrijeme[4]) == false || dozvoljeneZnamenke.includes(datumVrijeme[6]) == false || dozvoljeneZnamenke.includes(datumVrijeme[7]) == false || dozvoljeneZnamenke.includes(datumVrijeme[8]) == false || dozvoljeneZnamenke.includes(datumVrijeme[9]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[3], 2) == true || dozvoljeneZnamenke.includes(datumVrijeme[3]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[12], 3) == true || dozvoljeneZnamenke.includes(datumVrijeme[12]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[15], 6) == true || dozvoljeneZnamenke.includes(datumVrijeme[15]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[18], 6) == true || dozvoljeneZnamenke.includes(datumVrijeme[18]) == false)
    {
        greskaDatumVrijeme = true;
    }
    if (dozvoljeneZnamenke.includes(datumVrijeme[13]) == false || dozvoljeneZnamenke.includes(datumVrijeme[16]) == false || dozvoljeneZnamenke.includes(datumVrijeme[19]) == false)
    {
        console.log("aa");
        greskaDatumVrijeme = true;
    }
    if (datumVrijeme[2] != '.' || datumVrijeme[5] != '.' || datumVrijeme[10] != '.' || datumVrijeme[14] != ':' || datumVrijeme[17] != ':')
    {
        console.log("a");
        greskaDatumVrijeme = true;
    }
}

function provjeraTeksta()
{
    greskaDuzinaTeksta = false;
    greskaNedozvoljeniZnakoviTekst = false;
    var tekst = document.getElementById("opis").value;

    var nedozvoljeniZnakovi = ['"', "'", "<", ">"];

    if (tekst.length < 100)
    {
        greskaDuzinaTeksta = true;
    }

    for (var i in tekst)
    {
        if (nedozvoljeniZnakovi.includes(tekst[i]))
        {
            greskaNedozvoljeniZnakoviTekst = true;
        }
        if (tekst[i] == "." && tekst[i - 1] == ".")
        {
            greskaNedozvoljeniZnakoviTekst = true;
        }
    }
}



