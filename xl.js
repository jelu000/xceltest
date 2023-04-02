getXls();




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
            console.log(`produkt 1= ${jsonData[0]["produkt"]}`)
            listProd(jsonData)
        })
        .catch((error) => console.error("Error fetching the XLSX file:", error));
}

function listProd(produkter){
  
    //console.log(`längd= ${vald_dag_bokningar.length}`)

    let tr_string = "";
    
    produkter.forEach(produkt => {
        tr_string += `<p>Produkt: ${produkt["produkt"]}  Pris: ${produkt["pris"]}kr<p>`    
    });

    document.getElementById("produkter").innerHTML=tr_string;
}



