let burger = document.querySelector('.burger')
let right_section = document.querySelector('.right_section')
let idbur = document.getElementById('burger');
idbur.addEventListener('click', function () {
    right_section.classList.toggle('showBTN')
    burger.classList.toggle('active')
    right_section.classList.toggle('active')
    idbur.classList.toggle('active')

})

burger.addEventListener('click', function (event) {

    right_section.classList.toggle('active')
    burger.classList.toggle('active')
    right_section.classList.toggle('showBTN')
    idbur.classList.toggle('active')

})



// let search = document.getElementById('searchh')
// let form_group = document.querySelectorAll('.form-group')

// for (const key in form_group) {
//     if (form_group.hasOwnProperty(key)) {
//         const element = form_group[key];
//         console.log(element)
//         element.addEventListener('click', function (event) {
//             let radioBTN = document.querySelectorAll('.radio_btn')

//             for (const keyb in radioBTN) {
//                 if (radioBTN.hasOwnProperty(keyb)) {
//                     const element = radioBTN[keyb];

//                     if (element.classList.contains('activeRadio')) {
//                         element.classList.toggle('activeRadio')
//                         if (element.classList.contains('srch')) {
//                             search.classList.toggle('show')
//                             console.log("a")

//                         }
//                         if (element.classList.contains('ctrgs')) {
//                             console.log("b")
//                             categories.classList.toggle('show')
//                         }

//                     }
//                     if (key == keyb) {
//                         element.classList.toggle('activeRadio')
//                         if (key == 1) {
//                             console.log("1")
//                             // categories.style.display = "block"
//                             console.log(categories)
//                             categories.classList.toggle('show')

//                         } else if (key == 2) {
//                             console.log(search)
//                             // search.classList.toggle('show')
//                             search.classList.toggle('show')
//                         }
//                     }

//                 }
//             }
//         })
//     }
// }

// let main_category = document.querySelectorAll('main_category')
// console.log(main_category)

// FOR categories active clas


// let main_categories = document.get('main_category')
// console.log(main_category)
// for (const key in main_categories) {
//     if (main_categories.hasOwnProperty(key)) {
//         const element = main_categories[key];
//         console.log("a32")
//     }
// }

// let radioBTN = document.querySelector('.radio_btn')
// form_group.addEventListener('click', function (event) {
//     console.log('form-group');
//     radioBTN.classList.toggle('activeRadio')
// })

// new


let optionsRadioList = document.getElementsByName('options-radio');
let categories = document.getElementsByName('category__radio');
let inputSearch = document.querySelector('.options__search--input');
let submitBtn = document.querySelector('.submit-btn');
let favcontainer = document.querySelector('.ourFavJokes');
let heart = document.querySelector('.heart');
let newJokes = document.querySelector('.newJokes');

const urlLink = {
    linkRandom: 'https://api.chucknorris.io/jokes/random',
    linkCategoriesList: 'https://api.chucknorris.io/jokes/categories',
    linkCategory: 'https://api.chucknorris.io/jokes/random?category=',
    linkSearch: 'https://api.chucknorris.io/jokes/search?query=',
};



function getChoise() {
    let url;
    if (optionsRadioList[0].checked) {
        url = urlLink.linkRandom;
    } else if (optionsRadioList[1].checked) {
        for (let i = 0; i < categories.length; i++) {
            const element = categories[i];
            if (categories[i].checked) {
                url = urlLink.linkCategory + element.value;
            }
        }
    } else {
        let input = inputSearch.value.trim();
        if (input == "") {
            alert("write smth and get some random joek")
            url = urlLink.linkRandom;

        } else {
            url = urlLink.linkSearch + input;
        }
    }
    return url;
}

function getRandomInt(max, min = 1) {
    return Math.floor(Math.random() * (max - min)) + min;
}

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    url = getChoise();
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            console.log(data)
            if (data.total > 1) {
                let randomInt = getRandomInt(data.total)
                StoreTempInLocalStorage(data.result[randomInt]);
                let tempJokes = getTempJokes();
                if (tempJokes.length > 0) {
                    favcontainer.firstChild.remove();
                }
                createJoke(data.result[randomInt].url, data.result[randomInt].id, data.result[randomInt].value, data.result[randomInt].hours, data.result[randomInt].categories, 'joke', favcontainer);
            } else if (data.total == 0) {
                alert("no jokes for this words")
            } else {

                StoreTempInLocalStorage(data);
                let tempJokes = getTempJokes();
                if (tempJokes.length > 0) {
                    favcontainer.firstChild.remove();
                }

                createJoke(data.url, data.id, data.value, data.hours, data.categories, 'joke', favcontainer);

            }
        });

})


function StoreTempInLocalStorage(joke) {
    let jokes;
    if (localStorage.getItem('jokes') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokes'))
    }
    jokes.push(joke)
    localStorage.setItem('jokes', JSON.stringify(jokes))

}

function getTempJokes() {
    let jokes;
    if (localStorage.getItem('jokes') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokes'))
    }
    return jokes;
}

function StorePernamentInLocalStorage(joke) {
    let result;
    let jokes;
    if (localStorage.getItem('jokesPerm') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokesPerm'))
    }
    jokes.push(joke)
    if (jokes.length > 1) {
        for (let i = 0; i < jokes.length; i++) {

            for (let j = 0; j < jokes.length; j++) {
                if (i != j && jokes[i].id == jokes[j].id) {

                    return false;

                } else {

                    localStorage.setItem('jokesPerm', JSON.stringify(jokes))
                    return true;
                }

            }
        }
    } else {
        localStorage.setItem('jokesPerm', JSON.stringify(jokes))
        return true;
    }
    // if (!(joke in jokes)) {
    //     console.log("1")
    //     localStorage.setItem('jokesPerm', JSON.stringify(jokes))
    // } else {
    //     console.log("2")
    // }
}

function getPernamentJokes() {
    let jokes;
    if (localStorage.getItem('jokesPerm') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokesPerm'))
    }
    return jokes;
}

document.addEventListener('click', function (target) {
    addToFav(target);
})

function addToFav(target) {
    if (target.target.classList.contains('heart') && !target.target.classList.contains('active')) {

        target.target.classList.toggle('active');
        let tempJokes = getTempJokes();
        let lastJoke = tempJokes.slice(-1)[0]
        let stored = StorePernamentInLocalStorage(lastJoke);
        // getsave
        if (stored) {
            createJoke(lastJoke.url, lastJoke.id, lastJoke.value, lastJoke.hours, lastJoke.categories, 'joke', newJokes)
            // target.parentElement.remove();
        }
    }
    // else if ((target.target.className == 'heart active')) {
    //     console.log("HERERE")
    //     target.target.classList.toggle('active');
    //     // target.target.parentElement.parentElement.remove();
    // }
}

document.addEventListener('click', function (target) {
    deletefromFav(target);
})

function deletefromFav(target) {
    target.stopPropagation();
    e = target.target;
    if (e.classList.contains('active') && e.parentElement.parentElement.parentElement.className == 'newJokes') {
        e.classList.toggle('active')
        permJokes = getFavFromLocal();
        let id = e.parentElement.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;

        permJokes.forEach(function (element, index) {
            if (String(element.id) == id) {
                permJokes.splice(index, 1);
            }
        });
        localStorage.setItem('jokesPerm', JSON.stringify(permJokes));

        e.parentElement.parentElement.remove();

    }
}

function createJoke(url, id, text, hours, categories, name, container) {
    console.log(categories)
    if (categories.hasOwnProperty('length') && categories.length == 0) {
        categories = "default"
    }
    if (hours === undefined) {
        hours = getRandomInt(3266, 3260)
    }
    const div = document.createElement('div');
    div.className = name;
    // const header = document.createElement('header');
    // const divHead = document.createElement('div')
    // divHead.className = 'heart';
    // header.appendChild(divHead);
    if (container == favcontainer) {
        div.innerHTML = `
        <header>
            <div class="heart"></div>
        </header>
        <div class="body-info">
            <div class="msg"></div>
            <div class="body-info__main">
                <div class="ids">
                <span>ID:</span>
                <a href="${url}">${id}</a>
                </div>
                <div class="text">${text}
                </div>
            </div>
        </div>
        <div class="footer-info">
            <div class="last_update">Last update: ${hours} hours ago</div>
            <div class="category_api">${categories}</div>
        </div>`;
    } else {
        div.innerHTML = `
        <header>
            <div class="heart active"></div>
        </header>
        <div class="body-info">
            <div class="msg"></div>
            <div class="body-info__main">
                <div class="ids">
                <span>ID:</span>
                <a href="${url}">${id}</a>
                </div>
                <div class="text">${text}
                </div>
            </div>
        </div>
        <div class="footer-info">
            <div class="last_update">Last update: ${hours} hours ago
           </div>
            <div class="category_api">${categories}</div>
        </div>`;
    }


    container.appendChild(div);

}

document.addEventListener('DOMContentLoaded', showFromLocal)

function getFavFromLocal() {
    let jokes;
    if (localStorage.getItem('jokesPerm') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokesPerm'))
    }
    jokes = JSON.parse(localStorage.getItem('jokesPerm'))
    return jokes;

}

function showFromLocal() {
    jokes = JSON.parse(localStorage.getItem('jokesPerm'))
    if (jokes !== null) {
        jokes.forEach(function (element) {
            createJoke(element.url, element.id, element.value, element.hours, element.categories, 'joke', newJokes)
        });
    }
}