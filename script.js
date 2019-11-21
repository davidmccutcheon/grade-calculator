function currentOnClick() {
    var errorMessage = "";
    var finalWeight = document.getElementById("finalExamWeight").value;
    var completeWeightStrings = new Array(document.getElementById("hwWt").value, document.getElementById("cwWt").value, document.getElementById("ttWt").value, document.getElementById("ptWt").value, document.getElementById("pjWt").value);

    errorMessage += weightsWorkError(completeWeightStrings, finalWeight);

    finalWeight = parseInt(finalWeight);
    finalWeight *= 0.01;

    var completeGradeStrings = new Array(document.getElementById("hwGrd").value, document.getElementById("cwGrd").value, document.getElementById("ttGrd").value, document.getElementById("ptGrd").value, document.getElementById("pjGrd").value);

    if (notNegative(parseInt(completeGradeStrings)) == false || notNegative(parseInt(completeGradeStrings)) == false) {
        errorMessage += "Please enter non-negative data only. ";
    }

    if (lowEnough(parseInt(completeGradeStrings)) == false) {
        errorMessage += "Make sure the grades you have entered are not too high. ";
    }

    if (errorMessage.length == 0) {
        document.getElementById("currentGrade").innerHTML = (calculateCurrentGrade(completeGradeStrings, completeWeightStrings, finalWeight));
    }
    document.getElementById("errorMessage").innerHTML = errorMessage;
}


function necessaryOnClick() {
    var desiredGrade = parseInt(document.getElementById("desiredGrade").value);

    var finalWeight = (parseInt(document.getElementById("finalExamWeight").value) * 0.01);

    var completeGradeStrings = new Array(document.getElementById("hwGrd").value, document.getElementById("cwGrd").value, document.getElementById("ttGrd").value, document.getElementById("ptGrd").value, document.getElementById("pjGrd").value);
    var completeWeightStrings = new Array(document.getElementById("hwWt").value, document.getElementById("cwWt").value, document.getElementById("ttWt").value, document.getElementById("ptWt").value, document.getElementById("pjWt").value);
    var currentGrade = calculateCurrentGrade(completeGradeStrings, completeWeightStrings, finalWeight);

    if (currentGrade.length == 0) {
        document.getElementById("necessaryGrade").innerHTML = "Sorry, you must calculate your current grade first."
    } else {
        document.getElementById("necessaryGrade").innerHTML = ((calcNecsGrd(desiredGrade, finalWeight, currentGrade)).toFixed(2) + "%");
    }
}

function weightsWorkError(wtArray, finalWt) {
    var message = "";

    if (finalWt.length == 0) {
        message += "Please include the weight of the final exam! ";
    }

    finalWt = parseInt(finalWt);

    arrise(wtArray);

    var a = 100;
    a = (a - finalWt);
    var b = 0;

    for (var i = 0; i < wtArray.length; i++) {
        b += wtArray[i];
    }

    if (a !== b) {
        message += "Your weight percentages do not add to one hundred. Please try again. "
    }

    return message;
}

function calculateCurrentGrade(gArrayOfStrings, wArrayOfStrings, finalWeight) {
    //returns a string
    var totalPercent = 0;

    arrise(wArrayOfStrings);
    convertPercents(wArrayOfStrings);

    for (var i = 0; i < gArrayOfStrings.length; i++) {
        totalPercent += categoryPercent(gArrayOfStrings[i], wArrayOfStrings[i]);
    }

    totalPercent = currentForNow(totalPercent, finalWeight);
    totalPercent = totalPercent.toFixed(2);

    return totalPercent + "%";
}

function currentForNow(grade, finalWeight) {
    var currentWt = 1 - finalWeight;
    return (grade / currentWt);
}

function categoryPercent(string, catWeight) {
    var stringArray = string.split(", ");
    var catArray = arrise(stringArray);
    var count = 0;

    for (var i  = 0; i < catArray.length; i++) {
        count += catArray[i];
    }

    var average = count / catArray.length;
    return (average * catWeight);
}

function arrise(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = parseInt(array[i]);
    }
    return array;
}

function calcNecsGrd(desiredGrade, finalWeight, currentGrade) {
    var lowestPoss = 0;
    currentGrade = parseInt(currentGrade);
    while (((lowestPoss * finalWeight) + currentGrade) < desiredGrade) {
        lowestPoss += 0.01;
    }
    return lowestPoss;
}

function lowEnough(array) {
    var confirmation = true;
    for (var i = 0; i < array.length; i++) {
        if (array[i] > 150) {
            confirmation = false;
        }
    }
    return confirmation;
}

function notNegative(array) {
    var confirmation = true;
    for (var i = 0; i < array.length; i++) {
        if (array[i] < 0) {
            confirmation = false;
        }
    }
    return confirmation;
}

function convertPercents(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] *= 0.01;
    }
    return array;
}