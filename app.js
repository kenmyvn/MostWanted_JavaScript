/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            alert("Please try again.");
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            mainMenu(person, people);
            break;
        case "family":
            let personFamily = findPersonFamily(person[0], people);
            alert(displayPeople(personFamily));
            mainMenu(person, people);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person[0], people);
            alert(displayPeople(personDescendants));
            mainMenu(person, people);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
            break;
        case "test":

            break;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    alert(personInfo).join("\n");
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function displayPeople(people){
    return people.map(function(person){
        return person.firstName+ " " + person.lastName;
    }).join("\n");
}

function findPersonSpouse(person, people) {
    let foundSpouse = people.filter(function (spouse) {
        if (person.currentSpouse == spouse.id) {
            return true;
        }
    });
    return foundSpouse;
}

function findPersonParents(person, people) {
    let foundPersonParents = people.filter(function (parent) {
        if ((person.parents).includes(parent.id)) {
            return true;
        }
    });
    return foundPersonParents;
}

function findPersonSiblings(person, people) {
    let foundPersonSiblings = people.filter(function (sibling) {
        for (let i = 0; i < (sibling.parents).length; i++) {
            if(person == sibling) {
                return false;
            };
            if(person.parents.includes(sibling.parents[i]) ) {
                return true;
            };
        };
    });
    return foundPersonSiblings[0];
}

function findPersonFamily(person, people) {
  let foundPersonFamily = [];
  let spouse = findPersonSpouse(person, people);
  let parents = findPersonParents(person, people);
  let siblings = findPersonSiblings(person, people);

  if (spouse != null) {
      for(let i = 0; i < spouse.length; i ++){
          foundPersonFamily.push(spouse[i]);
      }
  }

  if (parents != null) {
      for(let i = 0; i < parents.length; i ++){
          foundPersonFamily.push(parents[i]);
      }
  }

  if (siblings != null) {
      for(let i = 0; i <siblings.length; i ++){
          foundPersonFamily.push(siblings[i]);
      }
  }

  return foundPersonFamily;
}

function findDescendant(person, people) {
    let foundDescendant = people.filter(function (descendant) {
        for(let i = 0; i < descendant.parents.length; i ++)
            if(descendant.parents[i] == person.id ) {
                return true;
        }
    });
    return foundDescendant
}

function findPersonDescendants(person, people) {
    let descendants = findDescendant(person, people);
    for(let i = 0; i < descendants.length; i++) {
        descendants = descendants.concat(findPersonDescendants(descendants[i], people));
    }
    return descendants;
}

function searchByGender(people) {
    let inputGender = prompt("What is the person's gender?").toLowerCase();
    while (inputGender !== 'male' && inputGender !== 'female') {
        alert("Please try again.");
        inputGender = prompt("What is the person's gender?").toLowerCase();
    }
    let foundGender = people.filter(function (gender) {
        if(gender.gender === inputGender) {
            return true;  
        }
    });
    return foundGender;
}

function searchByDOB(people) {
    let inputDOB = prompt("What is the person's date of birth? Enter as --/--/----");
    let foundDOB = people.filter(function (dob) {
        if(dob.dob === inputDOB) {
            return true;
        }
    });
    return foundDOB
}

function searchByHeight(people) {
    let inputHeight = prompt("What is the person's height?");
    let foundHeight = people.filter(function (height) {
        if(height.height === inputHeight) {
            return true;
        }
    });
    return foundHeight
}

function searchByWeight(people) {
    let inputWeight = prompt("What is the person's weight?");
    let foundWeight = people.filter(function (weight) {
        if (weight.weight === inputWeight) {
            return true;
        }
    });
    return foundWeight
}

function searchByEyeColor(people) {
    let inputEyeColor = prompt("What is the person's eye color?");
    let foundEyeColor = people.filter(function (eyeColor) {
        if (eyeColor.eyeColor === inputEyeColor) {
            return true;
        }
    });
    return foundEyeColor
}

function searchByOccupation(people) {
    let inputOccupation = prompt("What is the person's occupation?");
    let foundOccupation = people.filter(function (occupation) {
        if (occupation.occupation === inputOccupation) {
            return true;
        }
    });
    return foundOccupation
    
}

function searchByTraits(people) {
    let searchChoice = promptFor("What do you already know? Their 'gender', 'date of birth', 'height', 'weight', 'eye color', or 'occupation'?", chars).toLowerCase();
    let foundPerson;
    let filtered;
    switch(searchChoice) {
        case "gender":
            filtered = searchByGender(people);
            alert(displayPeople(filtered));
            break;
        case "date of birth":
            filtered = searchByDOB(people);
            alert(displayPeople(filtered));
            break;
        case "height":
            filtered = searchByHeight(people);
            alert(displayPeople(filtered));
            break;
        case "weight":
            filtered = searchByWeight(people);
            alert(displayPeople(filtered));
            break;
        case "eye color":
            filtered = searchByEyeColor(people);
            alert(displayPeople(filtered));
            break;
        case "occupation":
            filtered = searchByOccupation(people);
            alert(displayPeople(filtered));
            break;
        default:
            alert("Please try again.");
            return searchByTraits(people);
    }   
        searchChoice = prompt("Is there something else you already know? Please input 'yes' or 'no'.");
        while (searchChoice !== 'yes' && searchChoice !== 'no') {
            alert("Please try again.");
            searchChoice = prompt("Is there something else you already know? Please input 'yes' or 'no'.");
        }
        if(searchChoice === "yes"){
            searchByTraits(filtered, people);
        }
        if(searchChoice === "no" && filtered.length === 1) {
            foundPerson = filtered[0];
            mainMenu(foundPerson, people);
        }
        if (searchChoice === "no" && filtered.length > 1 ) {
            alert("Your search resulted in \n\n" + displayPeople(filtered) +"\n\n Happy searching.");
            app(people);
        }
}