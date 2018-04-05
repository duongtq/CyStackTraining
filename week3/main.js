/*
 * Get element from html
 */
const $body = document.getElementsByTagName("body")[0];
const $homeArea = document.getElementById('home-area');
const $playArea = document.getElementById('play-area');
const $selectMusic = document.getElementById('select-music');
const $tagText = document.getElementById('tag-text');
const $btnGo = document.getElementById('btnGo');
const $btnBack = document.getElementById('btnBack');
const $imgGIF = document.getElementById('imgGIF');

const apiKey = 'LrZV4IQiJJZsLy3umeCDvlZadMoes6O9';
let audio = new Audio();

/*
 * Append option tag to select tag]
 * @param list - Array song which read from file
 */
function apppendCombobox(list) {
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement('option')
        option.text = list[i].name;
        option.value = list[i].id;
        $selectMusic.appendChild(option);
    }
}

/*
 * Validate input tag
 * Return false if input is empty
 * @param el - input element need to check
 */
function validateWord(el) {
    let str = el.value;
    str = str.replace(/\s/g, '');   /* Remove space from string */
    if (str === "") return false;
    return true;
}

/*
 * Sending a request to GIPHY
 * Return a Promise include a json response
 * @param url - URL request
 */
function requestGIPHY(url) {
    return fetch(url)
        .then(response => {console.log(response); return response.json()})
        .then((jsonResponse) => {
            console.log(jsonResponse);
            return jsonResponse;
        });
}


/*
 * Main Function
 * Read json file & Handler button's events
 */
fetch('./json/album.json')
    .then(response => response.json())
    .then((jsonResponse) => {
        let listSong = jsonResponse.albums;
        apppendCombobox(listSong);
        return listSong;
    })
    .then( (list) => {
        /* Handler event - Click btnGo */
        $btnGo.addEventListener('click', function () {

            if (!validateWord($tagText)) {
                alert('Hãy nhập 1 từ khóa để cho sinh động :))');
                return;
            }

            else {
                $homeArea.style.display = 'none';
                $playArea.style.display = 'block';

                let indexOfCombo = $selectMusic.selectedIndex;
                let urlAudio = list[indexOfCombo].url;

                let tagGIPHY = $tagText.value.replace(/\s/g, '');
                let urlRequestGIPHY = 'https://api.giphy.com/v1/gifs/random?api_key='
                                     + apiKey + '&tag=' + tagGIPHY;

                let requestGIPHYPromise = requestGIPHY(urlRequestGIPHY);
                requestGIPHYPromise.then((jsonResponse) => {
                    let urlImage = jsonResponse.data.image_url;
                    $imgGIF.src = urlImage;
                    $body.style.backgroundImage = 'none';

                    $imgGIF.style.display = 'block';
                    audio.src = urlAudio;
                    audio.play();
                });
            }

        });

        /* Handler event - Click btnBack */
        $btnBack.addEventListener('click', function () {
            audio.pause();
            audio.currentTime = 0;
            $imgGIF.src = '';
            $imgGIF.style.display = 'none';

            $body.style.backgroundImage = "url('./images/home-background.jpg')";
            $tagText.value = "";
            $playArea.style.display = 'none';
            $homeArea.style.display = 'block';

        });
    });
