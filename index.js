const inquirer = require("inquirer");
const fs = require("fs")

/* importing staff */
const Employee = require("./myTeam/employee");
const Intern = require("./myTeam/intern");
const Engineer = require("./myTeam/engineer");
const Manager = require("./myTeam/manager");

let managerHTML = " ";
let teamMemberHTML = " ";
let teamMembers = [];

/* manager questions */
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What's your name?",
    },
    {
        type: "input",
        name: "employeeId",
        message: "What's your employee id?",
    },
    {
        type: "input",
        name: "email",
        message: "What's your email address?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What's your office number?",
    },
];

/* employee questions */
const employeeQuestions = [
    {
        type: "list",
        name: "role",
        message: "What type of employee are you adding?",
        choices: ["intern", "engineer"],
    },
    ...managerQuestions.slice(0,3),
    {
        type: "input",
        name: "github",
        message: "What is your username for Github?",
    },
    {
        type: "input",
        name: "school",
        message: "What school did you attend?",
    },
];

/* adding a team member */

const addTeamMember = [
    {
        type: "confirm",
        name: "addTeamMember",
        message: "Would you like to add an intern or an engineer?",
    },
];

/* functions */
/* adding team member */
function addTeamMemberType() {
    inquirer
    .prompt(employeeQuestions)
    .then((teamMemberAnswers) => {
        console.log(teamMembers)

        if (teamMemberAnswers.role === "intern") {
            const intern = new Intern (teamMemberAnswers.name, teamMemberAnswers.employeeId, teamMemberAnswers.email, teamMemberAnswers.github)
            teamMembers.push(intern)
            console.log(teamMembers)
        } else {
            const engineer = new Engineer(teamMemberAnswers.name, teamMemberAnswers.employeeId, teamMemberAnswers.email, teamMemberAnswers.github)
            teamMembers.push(engineer)
            console.log(teamMembers)
        }

    console.log("Add team member type prompt")
    promptAddTeamMember()
    })
    .catch((error) => console.log(error));
}

/* add TM prompt */
function promptAddTeamMember() {
    inquirer
    .prompt(addTeamMember)
    .then ((confirmedAnswer) => {
        if (confirmedAnswer.addTeamMember) {
            addTeamMemberType()
        } else {
            console.log(teamMembers)
            generateTeamMemberHTML();
            fs.writeFile("index.html", teamMemberHTML, (err) =>
            err ? console.log(err): console.log("Created manager only")
            );
        }
    })
    .catch((err) => console.log(err));
}

function generateTeamMemberHTML(teamMembers) {
    let managerHTML = " ";
    let teamMemberHTML = " ";

    for (const member of teamMembers) {
        if(member.role === "Manager") {
            managerHTML += `
            <div class="card manager" style="width: 20rem shadow p-3;">
                <div class="card-header">
                    ${member.name}
                    <p>${member.role}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${member.email}" target="_blank">${member.email}</a></li>
                    <li class="list-group-item">Office #: ${member.officeNumber}</li>
                </ul>
            </div> `;
        } else {
            teamMemberHTML += `
            <div class="card manager" style="width: 20rem shadow p-3;">
                <div class="card-header">
                    ${member.name}
                    <p>${member.role}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${member.email}" target="_blank">${member.email}</a></li>
                    ${
                        member.role === 'Engineer'
                          ? `<li class="list-group-item">Github: <a href="https://github.com/${member.github}" target="_blank">${member.github}</a></li>`
                          : member.role === 'Intern'
                          ? `<li class="list-group-item">School: ${member.school}</li>`
                          : ''
                      }
                </ul>
            </div> `;
        }
    }

    const htmlPageContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Team Profile Gen </title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
    <link rel="stylesheet" href="./Assets/CSS/style.css"/>
</head>
<body>
    <header class="p-5 mb-4 header profileHeader"> 
        <div class="container shadow p-3"> 
            <h1 class="display-4> Team Profiles </h1>
        </div>
    </header>
    <main class="employeeInfo">
        ${managerHTML}
        ${teamMemberHTML}
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous"></script>

</body>
</html>
`;

return htmlPageContent;
}

function promptQuestions() {
    inquirer
    .prompt(managerQuestions)
    .then((managerQuestions) => {
        managerAnswer = managerAnswers;
        let manager = new Manager(managerAnswer.name, managerAnswer.employeeId, managerAnswer.email, managerAnswer.officeNumber)
        console.log(manager)
        teamMembers.push(manager)
        promptAddTeamMember()
    })
    .catch((err) => {
    if(err.isTtyError) {
        console.log(error)
    } else {
        console/log(error)
    }
})
}

promptQuestions()