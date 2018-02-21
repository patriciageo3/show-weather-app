// FETCH WEATHER FOR GIVEN ADDRESS
// command-line interface app
// JAN 2018

// VALID COMMANDS:
/* 
app.js -a "po" - add a new address, fetch weather with it ("on the fly" address fetching);
app.js default -s "p" - add a default address/ replace already existing default address;
app.js default -l - list the saved default address;
app.js default -r - remove default address;
app.js default - run app with default address (same as: "app.js -a" or "app.js default -a");
app.js -a - run app with default address;
app.js default -a - run app with default address;
 */

const yargs = require('yargs');
const caw = require('./assets/coordinatesAndWeather.js');
const addIns = require('./assets/addIns.js');

const argv = yargs
    .options(
        {
            address: {
                alias: "a",
                describe: "Address to fetch the weather for...",
                string: true,
            }
        }
    )
    .conflicts({'address': ['set', 'list', 'remove', 'l', 'r', 's']}) 
    .command('default', "Implement a default address for the weather fetch.", {
        set: {
            describe: "Set/ save your default address/ code for the weather fetch.",
            alias: "s",
            requiresArg: true,
            global: true

        },
        list: {
            describe: "List the current default address. Any values for this flag will be ignored. Address will be printed anyway.",
            alias: "l",
            boolean: true,
            global: true,
            coerce: (v) => v || undefined
        },
        remove: {
            describe: "Remove the current default address. Any values for this flag will be ignored. Use 'set' to replace current address with a new one, else, no default address will be available.",
            alias: "r",
            boolean: true,
            global: true, 
            coerce: (v) => v || undefined
        }
    })
    .conflicts({'set': ['list', 'remove', 'l', 'r']})
    .conflicts({'s': ['list', 'remove', 'l', 'r']}) 
    .conflicts({'list': ['remove', 'r']})
    .help()
    .alias('help', 'h')
    .argv;

let command = argv._[0];

let addressExists = addIns.fetchAddress();
let commandDefault = (command === "default" && (!argv.list && !argv.remove && !argv.set && !argv.address)) || ((argv.address === "") && (argv._.length === 0)) || (command === "default" && (argv.address === ""));  
let listCheck = command === "default" && argv.list && argv.set === undefined;
let removeCheck = command === "default" && argv.remove && argv.set === undefined;
let setCheck = command === "default" && argv.set;
let spotOnAddressCheck = argv.address && (argv._.length === 0) && argv.address !== "default" ;

if (addressExists) {
    if (commandDefault) { 
        caw.fetchCoordinatesAndWeather(addressExists);
    } else if (listCheck) { 
        console.log(`Your default address is: ${addressExists}`); 
    } else if (removeCheck) { 
        let warning = "Are you sure you want to delete your default address? This action cannot be undone. Type yes or y to confirm.";
        addIns.confirmDeletion("", warning).then(() => console.log("Default address deleted succesfully.")).catch( () => console.log(console.log(`No changes were made. Default address is still "${addressExists}". If you want to delete the default address, you need to confirm the process first.`)));
    } else if (setCheck) { 
        let warning = `You already have a saved address: "${addressExists}". Are you sure you want to replace it? Type yes or y to confirm.`;
        (argv.set === addressExists) ? console.log(`Your default address and the new address you are trying to enter are the same. To fetch weather with default address, use one of the commands: 
        * node app.js default
        * node app.js -a/ --address
        * node app.js default -a/ --address. `) : addIns.confirmDeletion(argv.set, warning).then( () => 
                    console.log(`New default address has been added: "${argv.set}"`)).catch( () => console.log(`No changes were made. Default address is still "${addressExists}". If you want to replace default address, you need to confirm the process first.`));   
    } else if (spotOnAddressCheck) { 
        console.log("Address taken on the spot!");
        caw.fetchCoordinatesAndWeather(argv.address);
    } else {
        console.log("ERR1: Ooops, something went wrong! Please try again. Please access --help for more information on valid commands!")
    }
    
} else { 
    if (setCheck) { 
        addIns.saveAddress(argv.set);
        console.log(`Address: "${argv.set}" has been saved as default. To fetch weather with default address, use one of the commands: 
        * node app.js default
        * node app.js -a/ --address
        * node app.js default -a/ --address.`);
    } else if (listCheck) { 
        console.log("No default address is set at the moment. Please use --help for more information.");
    } else if (removeCheck) { 
        console.log("No default address to be removed at the moment. Please use --help for more information.");
    } else if (spotOnAddressCheck) { 
         caw.fetchCoordinatesAndWeather(argv.address);    
    } else {
        console.log("ERR2: Ooops, something went wrong! Please try again. Please access --help for more information on valid commands!");
    }
}



