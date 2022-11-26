let letters = document.querySelectorAll(".Caseta");
let info_bar = document.querySelector(".Loading");
let cuvantHeader = document.querySelector("Header");

async function int()
{
    let cuvant_actual='';
    const lungimetotala=5;
    let lungime=0;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day") ;
    const resp = await res.json();
    const cuvant_chemat = resp.word.toUpperCase();
    const cuvant_crapat_real=cuvant_chemat.split("");
    let vizibil=true;
    let end=false;
    Incarcare(vizibil);

    console.log(cuvant_chemat);

    function adaugalitera(cheie)
    {
        if(cuvant_actual.length < lungimetotala)
        {
            cuvant_actual= cuvant_actual + cheie;
        }else 
        {
            cuvant_actual= cuvant_actual.substring(0,cuvant_actual.length-1) + cheie;
        }

        letters[lungimetotala*lungime + cuvant_actual.length -1].innerText =cheie;
    }
    
    async function commit(cheia)
    {

        //Verificare cuvant daca exista

        const map=makeMap(cuvant_chemat);
        let counter=0;

        const res = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({ word: cuvant_actual }),
        });
        const object = await res.json();
        const validWord = object.validWord;

        
        if (!validWord && cuvant_actual.length === lungimetotala) {
            markInvalidWord();
            return;
        }

        if( cuvant_actual.length === lungimetotala )//verifica cuvant
        {
            let cuvant_crapat = cuvant_actual.split("");
            for(let i = 0; i<lungimetotala; i++)
            {
                if(cuvant_crapat[i] === cuvant_crapat_real[i])
                {
                    letters[lungimetotala*lungime + i].classList.add("correct");
                    map[cuvant_crapat[i]]--;
                    counter++;
                }else 
                if(cuvant_crapat_real.includes(cuvant_crapat[i]) && map[cuvant_crapat[i]]>0)
                {
                    letters[lungimetotala*lungime + i].classList.add("close");

                }else 
                {
                    letters[lungimetotala*lungime + i].classList.add("inccorect");
                }
            }
           // console.log(map);
            lungime++;
            cuvant_actual='';
        }
        //Comparare cu cuvantul meu de baza

        //Vede daca exista o litera corecta sau apropiata

        //Daca ai castigat sau nu
        if(counter === 5)
        {
            alert("Ai castigat un joc de oameni Prosti");
            end=true;
            cuvantHeader.classList.add("winner");
            return;
        }
        
        if(lungime === lungimetotala + 1)
        {
            alert('Esti un noob, cuvantul era ' + cuvant_chemat);
            end=true;
            return;
        }
    }

    function sterge(cheie)
    {
        cuvant_actual= cuvant_actual.substring(0,cuvant_actual.length-1);
        letters[lungimetotala*lungime + cuvant_actual.length].innerText="";

    }

    document.addEventListener("keydown", function cheie(event)
    {
        const keia= event.key;
        
        if(end)
        {
            return;
        }
        if(keia === 'Enter')
        {
            commit(keia);
        }
        if(keia === 'Backspace')
        {
            sterge(keia);
        }
        if(isLetter(keia))
        {
            adaugalitera(keia.toUpperCase());
        }
        

    })

    function isLetter(letter) 
    {
        return /^[a-zA-Z]$/.test(letter);
    }

     function Incarcare(louding)
    {
        info_bar.classList.toggle("hidden", louding);
    }

     function makeMap(array)
    {
        const obj={};
        for(let i=0;i< array.length;i++)
        {
            if(obj[array[i]])
            obj[array[i]]++;
            else
            obj[array[i]]=1;
        }

        return obj;
    }

    function markInvalidWord()
    {
        for (let i = 0; i < lungimetotala; i++) {
          letters[lungimetotala * lungime + i].classList.remove("invalid");
    
          setTimeout(
            () => letters[lungimetotala * lungime + i].classList.add("invalid"),
            10
          );
        }
    }
}

int();