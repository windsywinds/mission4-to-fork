const program = require('commander');
const { prompt } = require('inquirer') 
const { addEntry } = require('./functions.cjs')



program
    .version('1.0.0')
    .description('Client Management System')



program
    .command('addOne <carColor> <brand>')
    .alias('a')
    .description('Add an entry')
    .action(async (carColor, carBrand) => {
        const inputData = { carColor: carColor,
                            carBrand: carBrand
                            };
        await addEntry(inputData);});


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

    program
        .command('add')
        .alias('a')
        .description('Add an entry')
        .action(() => {
            prompt(questions).then(answers => addEntry(answers))
        });

program.parse(process.argv); 