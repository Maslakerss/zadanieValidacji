const form = document.getElementById("form")
const input = document.querySelectorAll("input")
const submit = document.querySelector("input[type=submit]")
const select = document.querySelector("select")

const output = document.getElementById("output")


const markin = document.getElementById('markin')
const markout = document.getElementById('markout')



let AllValuesChecked = false
let WrongValues = []
let Values = []


input.forEach(child => {
    Values.push(child.value)
});

Values.pop()
Values.push(select.value)


document.onload = () => {
    validate()
}


input.forEach(child => {
    child.addEventListener("change", () => {
        updateValues();
        
        validate();
    })
})


document.onsubmit = (event) => {
    event.preventDefault();
}


submit.addEventListener("click", () => {
    updateValues();

    validate(true);
})



function updateValues() {
    Values = [];

    input.forEach(child => {
        Values.push(child.value);
    });

    Values.pop();
    Values.push(select.value);
}


function startAnim() {
    markin.setAttribute('scrollamount', "15")


    markout.setAttribute('scrollamount', "15")
    markout.style.height = "1000px";
}



function validate(submit=false) {
    AllValuesChecked = (Values.length == 13)
    WrongValues = []

    Values.forEach( (element, index) => {  
        if (element == undefined || element == null || element == "") {
            if (!(index == 2 || index == 6 || index == 11)) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }
        }

        if (index == 2 && AllValuesChecked) {
            if (element != "") {
                age = parseInt(element)

                if (age) {
                    if ( !(age < 150 && age >= 0)) {
                        AllValuesChecked = false

                        WrongValues.push(input[index].name)
                    }
                }
            }
        }

        if (index == 4 && AllValuesChecked) {
            const controlSum = [1,3, 7, 9, 1, 3, 7, 9, 1, 3]
            let peselList = element.split('')
            

            if (!peselList || peselList.length != 11) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }

            let year = peselList[0] + peselList[1]
            let month = peselList[2] + peselList[3]
            let day = peselList[4] + peselList[5]


            let date = new Date(month + "/" + day + "/" + year)

            if((date.getMonth() + 1) != parseInt(month) || !date) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }

            
            sum = 0
            controlSum.forEach((wage, index) => {
                sum += wage * parseInt(peselList[index])
            })


            if ( 10 - parseInt(sum[sum.length-1]) == parseInt(peselList[peselList.length - 1]))  {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }
            
        }

        if (index == 5 && AllValuesChecked) {
            if (element.length != 9) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }
        }

        if (index == 9 && AllValuesChecked) {
            wages = [1,3]
            sum = 0

            if (element.length != 13) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }

            for(let i = 0; i < 12; i++) {
                sum += wages[(i % 2)] * parseInt(element[i])
            }

            if ((sum % 10) == 0 ||  10 - (sum % 10) != element[12] ) {
                AllValuesChecked = false

                WrongValues.push(input[index].name)
            }
        }
    });

    
    output.innerHTML = WrongValues

    if(AllValuesChecked && submit) {
        alert("Wszystkie Dane zostały przeslane")

        startAnim()
    }


    console.log(AllValuesChecked)
    console.log(Values)
}

