const fs = require('fs');
const readline = require('readline');

let saveAddress = (address) => {
    fs.writeFileSync('addressFile.json', JSON.stringify(address));
};

let fetchAddress = () => {
    try {
        let data = fs.readFileSync('addressFile.json');
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
};

function confirmDeletion(address, question) {   
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                  input: process.stdin,
                  output: process.stdout
                });
        
            rl.question(question, (answer) => {
                if (answer === "yes" || answer === "y") {
                    saveAddress(address);
                    resolve("done")
                } else {
                    reject("done");
                }
                  rl.close();
                });
        });    
}

module.exports = {
    saveAddress,
    fetchAddress,
    confirmDeletion
};