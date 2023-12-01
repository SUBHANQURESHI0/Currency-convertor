import inquirer from "inquirer";
import chalk from "chalk";
let apiLink = "https://v6.exchangerate-api.com/v6/788650cf79a3f65ade37516a/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries,
});
let userMoney = await inquirer.prompt({
    type: "number",
    name: "Money",
    message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting to",
    choices: countries,
});
let cnv = `https://v6.exchangerate-api.com/v6/788650cf79a3f65ade37516a/pair/
${firstCountry.name}/${secondCountry.name}`;
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.Money * conversionRate;
console.log(`Your amount ${chalk.bold.green(userMoney.Money)} in 
${chalk.bold.green(firstCountry.name)} is converted to ${chalk.bold.green(convertedRate)} ${chalk.bold.green(secondCountry.name)}`);
