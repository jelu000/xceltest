//XLS TEST

getXls();

let global_json_data  = []

function getXls() {

    url = `fris.xlsx`
    // Fetch the file from the server
    fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            // Convert the fetched data to a binary string
            const data = new Uint8Array(arrayBuffer);
            const binaryData = data.reduce(
                (accumulator, currentValue) =>
                    accumulator + String.fromCharCode(currentValue),
                ""
            );

            // Read the XLSX file using SheetJS
            const workbook = XLSX.read(binaryData, { type: "binary" });

            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the worksheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Do something with the JSON data
            console.log(jsonData);

            global_json_data = jsonData;
            console.log(`produkt 1= ${jsonData[0]["produkt"]}`)
            listProd(jsonData)
        })
        .catch((error) => console.error("Error fetching the XLSX file:", error));
}

function listProd(produkter){

    let tr_string = "";
    
    produkter.forEach(produkt => {
        tr_string += `<p>Produkt: ${produkt["produkt"]}  Pris: ${produkt["pris"]}kr<p>`    
    });

    document.getElementById("produkter").innerHTML=tr_string;
}

function findButtClick(){
    let textinput = document.getElementById("input_text").value //Text input för sökning
    p_element_svar = document.getElementById("svar_text") //p tagg där svaret på sökning ska skrivas ut
    
    //console.log(`text ${typeof(global_json_data[1]["produkt"])}`)

    //Felhantering om inte sökt objekt finns
    try{
        hittat_obj = global_json_data.find((ob) => ob.produkt === textinput);//Söker i arrayen
        p_element_svar.innerHTML = `Sökt produkt: ${hittat_obj.produkt}, Pris: ${hittat_obj.pris}`//skriver svar i p tagg
        //console.log(`sök svar= ${hittat_obj.pris}`)
    }catch(e){
        p_element_svar.innerHTML = `Något gick fel, förmodligen hittade ej objektet!`
    }
}



