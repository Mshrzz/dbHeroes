document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Option menu animation and events
    const optionsMenu = () => {
        const burgerBtn = document.getElementById('burgerBtn'),
              optionsBlock = document.querySelector('.options'),
              burgerBtnElems = document.querySelectorAll('.burger-elem__elem'),
              optionsMenuElems = document.querySelector('.settings');
        
        // Set animation counter and label
        let widthOptionsBlockCounter = 0,
            isMenuOpen = false;
        // Animation for show options block
        const showFullOptionsBlock = () => {
            const showBlockId = requestAnimationFrame(showFullOptionsBlock);
            // Set blur at background
            document.querySelector('.content').style.filter = 'blur(5px)';

            widthOptionsBlockCounter += 20;
            
            // Need for smooth animation
            optionsBlock.style.paddingLeft = '15px';
            optionsBlock.style.alignItems = 'flex-start';
            
            optionsBlock.style.width = `${70 + widthOptionsBlockCounter}px`;
            // Also need for smooth animation
            burgerBtn.style.cssText = `flex-direction: row; 
                                       align-items: flex-end;
                                       justify-content: flex-start;
                                       margin-top: 0px`;

            // Animation for burger-menu button
            burgerBtnElems.forEach( (item, i, arr) => {

                item.style.margin = '0px 2px';
                item.style.width = '20px';

                arr[0].style.height = `${widthOptionsBlockCounter/12}px`;
                arr[1].style.height = `${widthOptionsBlockCounter/9}px`;
                arr[2].style.height = `${widthOptionsBlockCounter/7}px`;
            });
            // If calculated value of option block width more than 300px, than stop animation and reset counter with some properties
            if (parseFloat(getComputedStyle(optionsBlock).getPropertyValue('width')) >= 300) {
                cancelAnimationFrame(showBlockId);

                burgerBtn.style.width = '180px';

                const burgerText = document.createElement('span');
                burgerText.textContent = 'Properties';
                burgerText.style.marginLeft = '15px';
                burgerText.style.fontSize = '26px';
                burgerText.classList.add('burger-menu-title');
                burgerBtn.insertAdjacentElement('beforeend', burgerText);

                optionsMenuElems.style.display = 'flex';

                widthOptionsBlockCounter = 0;
                isMenuOpen = true;
            }

        };
        // Animation for hide option block
        const hideFullOptionsBlock = () => {
            const hideBlockId = requestAnimationFrame(hideFullOptionsBlock);
            // Delete blur on background
            document.querySelector('.content').style.filter = 'blur(0px)';
            // Hide menu elemets on options block
            optionsMenuElems.style.display = 'none';
            // Reset burger-menu button styles
            burgerBtn.style.cssText = `flex-direction: column;
                                       justify-content: center;
                                       align-items: center;
                                       width: 40px;
                                       height: 60px;
                                       margin-top: 10px;`;
            // Reset bureger-menu button animation
            burgerBtnElems.forEach( item => item.style.cssText = `width: 40px; height: 5px; margin-bottom: 5px;` );

            widthOptionsBlockCounter += 30;

            optionsBlock.style.width = `${300 - widthOptionsBlockCounter}px`;
            // If calculated style of optionn block less than 70px (initial value), than stop it and reset some properties
            if (parseFloat(getComputedStyle(optionsBlock).getPropertyValue('width')) <= 70) {
                cancelAnimationFrame(hideBlockId);

                optionsBlock.style.paddingLeft = '0px';
                optionsBlock.style.alignItems = 'center';
                optionsBlock.style.width = '70px';

                widthOptionsBlockCounter = 0;
                isMenuOpen = false;
            }
        };
        // Event listeners
        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('#burgerBtn') && !isMenuOpen) {
                requestAnimationFrame(showFullOptionsBlock);
            } else if ( (target.closest('#burgerBtn') && isMenuOpen) || ( !target.closest('.options') && isMenuOpen) ) {
                // Delete burger-menu button title and hide all block
                document.querySelector('.burger-menu-title').remove();
                requestAnimationFrame(hideFullOptionsBlock);
            }
        });
    };

    optionsMenu();

    // Search animation and events
    const search = () => {
        const searchBtn = document.getElementById('searchBtn'),
              searchInput = document.getElementById('searchInput');
        
        // Counter for animation
        let showSearchCounter = 0;

        // Animation for show search input
        const showSearchInput = () => {
            const showInputId = requestAnimationFrame(showSearchInput);

            searchInput.style.display = 'flex';
            showSearchCounter += 40;
            searchInput.style.width = `${showSearchCounter}px`;
            // If calculated value of input width more than 300px, than cancel animation and reset counter
            if ( parseFloat(getComputedStyle(searchInput).getPropertyValue('width')) >= 300 ) {
                cancelAnimationFrame(showInputId);
                showSearchCounter = 0;
            }
        };
        // Animation for hide search input
        const hideSearchInput = () => {
            const hideInputId = requestAnimationFrame(hideSearchInput);

            showSearchCounter += 30;
            searchInput.style.width = `${300 - showSearchCounter}px`;
            // If calculated value of input width less than 10px, than cancel animation and reset counter and hide search input
            if ( parseFloat(getComputedStyle(searchInput).getPropertyValue('width')) <= 10 ) {
                cancelAnimationFrame(hideInputId);
                searchInput.style.display = 'none';
                showSearchCounter = 0;
            }
        };
        // Event listeners
        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('#searchBtn')) {
                requestAnimationFrame(showSearchInput);
            } else if ( !target.closest('#searchBtn') && !target.closest('#searchInput') ) {
                // If event target not matches with search button, hide it and reset it value
                searchInput.value = '';
                requestAnimationFrame(hideSearchInput);
            }
        });
    };

    search();

    // logo decoration
    const logoDecorate = () => {
        const logo = document.getElementById('logo'),
              logoFirst = document.getElementById('logoFirst'),
              logoSecond = document.getElementById('logoSecond');

        logo.addEventListener('mouseover', () => {
            // Swap fontWeight value among two parts of logotype
            [logoFirst.style.fontWeight, logoSecond.style.fontWeight] = 
            [getComputedStyle(logoSecond).getPropertyValue('font-weight'), 
            getComputedStyle(logoFirst).getPropertyValue('font-weight')];
        });
    };

    logoDecorate();

    // Get JSON data from DB and parse it
    const getJSON = () => {
        // Return promise with AJAX request
        return new Promise( (resolve, reject) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
    
                if (request.status === 200 ) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.status);
                }
            });
    
            request.open('GET', './db/dbHeroes.json');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();
        } );
    };

    getJSON();

    // Generate card template
    const cardTemplate = (elem) => {
        const card = document.createElement('div');
        card.classList.add('card');

        // This array and cycle need for element with classname card__more-info 

        // Create array, who contain some parameters of any iterable element
        const cardInfoList = [elem.species, elem.citizenship, elem.gender, elem.birthDay],
              pushInfoList = [];
        // Converting format and push converted items into new array
        for (let i = 0; i < cardInfoList.length; i++) {
            if (cardInfoList[i] !== undefined) {
                pushInfoList.push(cardInfoList[i][0].toUpperCase() + cardInfoList[i].substring(1));
            }
        }
        // HTML template for card
        card.innerHTML = `<div class="heading card__heading">
                            <div class="heading__img">
                                <img src="./db/${elem.photo}" alt="Hero photo">
                            </div>
                            <div class="title heading__title">
                                <span class="title__name">${elem.name}</span>
                                <div class="real-name title__real-name">
                                    <span class="real-name__name">${elem.realName ? elem.realName : elem.name}</span>
                                </div>
                            </div>
                          </div>
                          <span class="card__more-info">
                            ${pushInfoList.join(', ')}
                          </span>
                          <div class="live-status card__live-status">
                            <img src="./img/${elem.status}.svg" alt="status" class="live-status__img">
                            <span class="live-status__text">
                                ${elem.status[0].toUpperCase() + elem.status.substring(1)}
                                ${elem.status === 'deceased' && elem.deathDay? ', ' + elem.deathDay : ''}
                            </span>
                          </div>
                          <div class="card__border"></div>
                          <span class="card__actor-title">Actor</span>
                          <span class="card__actor-name">${elem.actors}</span>
                          <span class="card__movies-title">Movies</span>
                          <ul class="movies-list card__movies-list">

                          </ul>`;
        // Push template to content block
        document.querySelector('.content').append(card);
    };

    // Create cards and push it into page
    const createCards = () => {
        // Get data from DB
        getJSON()
        .then((request) => {
            // Generate cards and push it into the page
            request.forEach(item => cardTemplate(item));
            return request;
        })
        .then((request) => {
            // Generate movies list and push it into the every card
            request.forEach((elem, i) => {
                // Select generated ul list in every card
                const cardUl = document.querySelectorAll('.movies-list');
                // If movies cannot be found, warning user about it
                if (elem.movies === undefined) {
                    cardUl[i].textContent = 'No movies with this character have been found';
                // If movies was found, genetate li elements with movies and push it to card
                } else {
                    for (let movie of elem.movies) {
                        let listItem = document.createElement('li');
                        listItem.classList.add('movies-list__elem');
                        listItem.textContent = movie;
                        cardUl[i].append(listItem);
                    }
                }
            });
        })
        .catch((reject) => {
            console.warn(reject);
        });
    };

    createCards();

    // Add filter movies
    const addfilterMovies = () => {
        const filmSelect = document.getElementById('filmsSelect');
        getJSON()
        .then((response) => {
            // Create array with non-repeat and non-undefined movies
            const movies = response.reduce((acc, item) => acc.concat(item.movies), []),
                  filterMovies = movies.filter((item, i) => (movies.indexOf(item) === i) && item !== undefined);
            // Push this array elements into the option tag and push it to select
            filterMovies.forEach((item) => {
                const movieOpt = document.createElement('option');
                movieOpt.textContent = item;
                filmSelect.append(movieOpt); 
            });

        })
        .catch((reject) => {
            console.warn(reject);
        });

    };

    addfilterMovies();

    // Reset button
    const resetButton = () => {
        const resetBtn = document.querySelector('.reset__button'),
              contentArea = document.querySelector('.content');
        
        resetBtn.addEventListener('click', () => {
            const filmSelect = document.getElementById('filmsSelect'),
                  aliveStatus = document.getElementById('aliveStatus'),
                  deathStatus = document.getElementById('deathStatus');

            filmSelect.options[0].selected = true;

            aliveStatus.checked = false;
            deathStatus.checked = false;

            contentArea.textContent = '';
            createCards();
        });
    };

    resetButton();

    // filter content
    const filterContent = () => {

        const filmSelect = document.getElementById('filmsSelect'),
              aliveStatus = document.getElementById('aliveStatus'),
              deathStatus = document.getElementById('deathStatus'),
              filterBtn = document.querySelector('.filter__button'),
              contentArea = document.querySelector('.content');

        filterBtn.addEventListener('click', () => {

            const selectedFilm = filmSelect.options[filmSelect.options.selectedIndex].textContent,
                  isAliveChecked = aliveStatus.checked,
                  isDeathChecked = deathStatus.checked;
            // Get data from DB
            getJSON()
            .then((response) => {
                
                // If some filter enable - render new collection
                if ( !(selectedFilm === 'None' && ( !isAliveChecked && !isDeathChecked )) ) {
                    
                    // If some film has been selected
                    if ( selectedFilm !== 'None' ) {
                        // Delete cards
                        contentArea.textContent = '';

                        const filterData = [];
                        // Push into filter array elements, which lists have needable movie
                        response.forEach(elem => (elem.movies !== undefined) && (elem.movies.indexOf(selectedFilm) !== -1) ? filterData.push(elem) : false);
                        
                        // All radio buttons not selected?
                        if ( !isAliveChecked && !isDeathChecked ) {
                            // Push elements into the page
                            filterData.forEach(item => cardTemplate(item) );
    
                        } else {
                            // For simplicity, i don't consider another statuses due to their small quantity
                            const unselectedStatus = !isAliveChecked ? 'alive' : 'deceased';

                            const filterByStatus = filterData.filter(item => item.status !== unselectedStatus);
                            // Push it into the page
                            filterByStatus.forEach(item => cardTemplate(item));
                        }
                    // If no film has been selected
                    } else {
                        // Delete cards
                        contentArea.textContent = '';

                        const filterData = [],
                              unselectedStatus = !isAliveChecked ? 'alive' : 'deceased';

                        response.forEach(elem => elem.status !== unselectedStatus ? filterData.push(elem) : false);
                        filterData.forEach(item => cardTemplate(item));
                    }
                }
                return response;
            })
            .then((response) => {
        
                response.forEach((elem, i) => {
                    
                    const cardUl = document.querySelectorAll('.movies-list');
    
                    if ( (elem.movies === undefined) && (cardUl[i] !== undefined) ) {
                        // If movies not founded, warn about it
                        cardUl[i].textContent = 'No movies with this character have been found';
                    // If element have films
                    } else {
                        for (let movie of elem.movies) {
                            // Generate li element with film name and push it to the ul list
                            const listItem = document.createElement('li');
                            listItem.classList.add('movies-list__elem');
                            listItem.textContent = movie;
                            // Ignore void items
                            if ( cardUl[i] === undefined ) {
                                continue;
                            }
                            cardUl[i].append(listItem);
                        }
                    }
                });
            })
            .catch((reject) => {
                console.warn(reject);
            });
        });
    };

    filterContent();

    // Searching for cards names
    const searchContent = () => {

        // Debounce function
        function debounce(f, t) {
            return function (args) {
              let previousCall = this.lastCall;
              this.lastCall = Date.now();
              if (previousCall && ((this.lastCall - previousCall) <= t)) {
                clearTimeout(this.lastCallTimer);
              }
              this.lastCallTimer = setTimeout(() => f(args), t);
            }
        }

        const searchInput = document.getElementById('searchInput'),
              contentArea = document.querySelector('.content'),
              callInput = () => {
                  // Get data for searching
                  getJSON()
                  .then((response) => {
                    // Push names, who have substring from input into array and return it
                    const filterNames = [];
                    response.forEach((elem) => elem.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1 ? filterNames.push(elem) : false);
                    return filterNames;
                  })
                  .then((response) => {
                    // Delete cards and generate card templates for elements from array
                    contentArea.textContent = '';
                    response.forEach(item => cardTemplate(item));
                    return response;
                  })
                  .then((response) => {                    
                    response.forEach((elem, i) => {
                        const cardUl = document.querySelectorAll('.movies-list');
                        if (elem.movies === undefined) {
                            cardUl[i].textContent = 'No movies with this character have been found';
                        } else {
                            for (let movie of elem.movies) {
                                let listItem = document.createElement('li');
                                listItem.classList.add('movies-list__elem');
                                listItem.textContent = movie;
                                cardUl[i].append(listItem);
                            }
                        }
                    });                
                  })
                  .catch((reject) => console.warn(reject));
              };
        // Call callInput function on input event with debounce
        searchInput.addEventListener('input', debounce(callInput, 600));
    };

    searchContent();

    // Change theme
    const changeTheme = () => {
        // In CSS file all colors are variable, declarated in :root
        // When we're change this variables, we change color scheme
        const themeBtn = document.getElementById('themeType'),
              lightBtn = document.getElementById('lightTheme'),
              darkBtn = document.getElementById('darkTheme'),
              rootElem = document.querySelector(':root'),
              setLightColors = () => {
                rootElem.style.setProperty('--color-background', '#E2E1E1');
                rootElem.style.setProperty('--color-primary', '#6E3FAA');
                rootElem.style.setProperty('--color-text', '#FFFFFF');
                rootElem.style.setProperty('--color-hide-text', '#444047');
                rootElem.style.setProperty('--color-border-block', '#C8B7CE');
              },
              setDarkColors = () => {
                rootElem.style.setProperty('--color-background', '#323652');
                rootElem.style.setProperty('--color-primary', '#454A74');
                rootElem.style.setProperty('--color-text', '#fff');
                rootElem.style.setProperty('--color-hide-text', '#929292');
                rootElem.style.setProperty('--color-border-block', '#323761');
              };

        themeBtn.addEventListener('click', (event) => {
            if (event.target.closest('#lightTheme')) {
                lightBtn.style.display = 'none';
                darkBtn.style.display = 'flex';
                // Change icon set from dark to light
                document.querySelectorAll('.live-status__img').forEach(element => element.src = element.src.replace(/(.svg)/, '_light.svg'));
                setLightColors();
            } else if (event.target.closest('#darkTheme')) {
                lightBtn.style.display = 'flex';
                darkBtn.style.display = 'none';
                // Change icon set from light to dark
                document.querySelectorAll('.live-status__img').forEach(element => element.src = element.src.replace(/(_light.svg)/, '.svg'));
                setDarkColors();
            }
        });
    };

    changeTheme();

});