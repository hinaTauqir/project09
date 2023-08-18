#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import banner from "node-banner";
let score = 0;
let agan = true;
function wait() {
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            resolve(1);
        }, 3000);
    });
}
async function welcome() {
    console.log(`         ${chalk.yellow(`HELLO`)} `);
    banner("Count Down Timmer", "");
    await wait();
}
let askQuestion = async () => {
    let ans = await inquirer.prompt([
        {
            name: "time",
            type: "input",
            message: "enter the date in this format YY:MM:DD HH:MM:SS\n",
        }
    ]);
    const dateTime = new Date(ans.time);
    if (isNaN(dateTime.getTime())) {
        console.log(chalk.red("plz enter the date and time in YY:MM:DD HH:MM:SS format"));
        return;
    }
    else {
        agan = false;
    }
    const delayTime = setInterval(() => {
        const currentDateTime = new Date();
        const differenceTime = dateTime.getTime() - currentDateTime.getTime();
        if (differenceTime <= 0) {
            clearInterval(delayTime);
            console.log(chalk.green("TIMES UP"));
            return;
        }
        const days = Math.floor(differenceTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((differenceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((differenceTime % (1000 * 60)) / 1000);
        console.log(` ${chalk.blue("Time remaining:")} ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
};
async function steps() {
    await welcome();
    while (agan) {
        await askQuestion();
        await wait();
    }
}
steps();
