const program = require('commander');
const { prompt } = require('inquirer') 
const { addEntry } = require('./functions.cjs')


//commands are run through terminal using node commands.cjs <command> 

//I'm using a .cjs (common JS) because it helps to bypass the requirement of conforming to ES6 which may conflict with older packages

//called with --version or --description. --help will also list all commands
program
    .version('1.0.0')
    .description('Client Management System')


//If we want to add an entry with this the command would be:
//  "node cli/commands.cjs addOne blue honda"
program
    .command('addOne <carColor> <brand>')
    .alias('a')
    .description('Add an entry')
    .action(async (carColor, carBrand) => {
        const inputData = { carColor: carColor,
                            carBrand: carBrand
                            };
        await addEntry(inputData);});

//Making it possible to define and ask questions here, we can use { prompt } from inquirer. 
const questions = [
        {
            type: 'input',
            name: 'carColor',
            message: 'Enter a color'
        },
        {
            type: 'input',
            name: 'carBrand',
            message: 'Enter a car brand'
        }
    ]
    
    
    //So this is run using "node cli/commands.cjs add" and will ask the questions and send the answers. Note the questions are wrapped inside an array
    //so we can just send the full thing
    program
        .command('add')
        .alias('a')
        .description('Add an entry')
        .action(() => {
            prompt(questions).then(answers => addEntry(answers))
        });

        //this is also a valid way to create a command where the function and command are on the same page 
    program
        .command('newcommand')
        .alias('a')
        .description('Add an entry')
        .action(async (props) => {
            try {
                //function stuff here
            } catch (error) {
                console.error(error)
            }
        });


//Remeber the task is to seed a database. So we need to create a command that will accept a file, which is ./data/seed.json
//So the above commands are just taking props. You'll need to enter a file path as an input/answer. It's the function that will handle the filepath and what to do with it.

program.parse(process.argv); //this thing basically parses all the program commands above. Think of each <input> after the .command as an array item. 
//Here's chatGPT to explain what I can't:  
  
// process.argv: This is an array that contains the command-line arguments provided when the Node.js process was started. The first element (process.argv[0]) is the path to the Node.js executable, the second element (process.argv[1]) is the path to the script file being executed, and the subsequent elements are the command-line arguments.

// program.parse(argv): This is a method provided by the commander library. program is an instance of the Command class created with const program = require('commander'). The parse method takes an array of command-line arguments (argv) and processes them based on the configuration set up using commander.