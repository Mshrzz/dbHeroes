document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // options menu
    const optionsMenu = () => {
        const burgerBtn = document.getElementById('burgerBtn'),
              optionsBlock = document.querySelector('.options'),
              burgerBtnElems = document.querySelectorAll('.burger-elem__elem'),
              optionsMenuElems = document.querySelector('.settings');

        let widthOptionsBlockCounter = 0,
            isMenuOpen = false;
        
        const showFullOptionsBlock = () => {

            const showBlockId = requestAnimationFrame(showFullOptionsBlock);

            document.querySelector('.content').style.filter = 'blur(5px)';

            widthOptionsBlockCounter += 20;

            optionsBlock.style.paddingLeft = '15px';
            optionsBlock.style.alignItems = 'flex-start';

            optionsBlock.style.width = `${70 + widthOptionsBlockCounter}px`;

            burgerBtn.style.cssText = `flex-direction: row; 
                                       align-items: flex-end;
                                       justify-content: flex-start;
                                       margin-top: 0px`;


            burgerBtnElems.forEach( (item, i, arr) => {

                item.style.margin = '0px 2px';
                item.style.width = '20px';

                arr[0].style.height = `${widthOptionsBlockCounter/12}px`;
                arr[1].style.height = `${widthOptionsBlockCounter/9}px`;
                arr[2].style.height = `${widthOptionsBlockCounter/7}px`;
            });

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

        const hideFullOptionsBlock = () => {
            const hideBlockId = requestAnimationFrame(hideFullOptionsBlock);

            document.querySelector('.content').style.filter = 'blur(0px)';

            optionsMenuElems.style.display = 'none';

            burgerBtn.style.cssText = `flex-direction: column;
                                       justify-content: center;
                                       align-items: center;
                                       width: 40px;
                                       height: 60px;
                                       margin-top: 10px;`;
            
            burgerBtnElems.forEach( item => item.style.cssText = `width: 40px; height: 5px; margin-bottom: 5px;` );

            widthOptionsBlockCounter += 30;

            optionsBlock.style.width = `${300 - widthOptionsBlockCounter}px`;

            if (parseFloat(getComputedStyle(optionsBlock).getPropertyValue('width')) <= 70) {
                cancelAnimationFrame(hideBlockId);

                optionsBlock.style.paddingLeft = '0px';
                optionsBlock.style.alignItems = 'center';
                optionsBlock.style.width = '70px';

                widthOptionsBlockCounter = 0;
                isMenuOpen = false;
            }
        };

        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('#burgerBtn') && !isMenuOpen) {
                requestAnimationFrame(showFullOptionsBlock);
            } else if ( (target.closest('#burgerBtn') && isMenuOpen) || ( !target.closest('.options') && isMenuOpen) ) {
                document.querySelector('.burger-menu-title').remove();
                requestAnimationFrame(hideFullOptionsBlock);
            }
        });
    };

    optionsMenu();

    // search
    const search = () => {
        const searchBtn = document.getElementById('searchBtn'),
              searchInput = document.getElementById('searchInput');

        let showSearchCounter = 0;

        const showSearchInput = () => {
            const showInputId = requestAnimationFrame(showSearchInput);

            searchInput.style.display = 'flex';
            showSearchCounter += 40;
            searchInput.style.width = `${showSearchCounter}px`;

            if ( parseFloat(getComputedStyle(searchInput).getPropertyValue('width')) >= 300 ) {
                cancelAnimationFrame(showInputId);
                showSearchCounter = 0;
            }

        };

        const hideSearchInput = () => {
            const hideInputId = requestAnimationFrame(hideSearchInput);

            showSearchCounter += 30;
            searchInput.style.width = `${300 - showSearchCounter}px`;

            if ( parseFloat(getComputedStyle(searchInput).getPropertyValue('width')) <= 10 ) {
                cancelAnimationFrame(hideInputId);
                searchInput.style.display = 'none';
                showSearchCounter = 0;
            }
        };

        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('#searchBtn')) {
                requestAnimationFrame(showSearchInput);
            } else if ( !target.closest('#searchBtn') && !target.closest('#searchInput') ) {
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

            [logoFirst.style.fontWeight, logoSecond.style.fontWeight] = 
            [getComputedStyle(logoSecond).getPropertyValue('font-weight'), 
            getComputedStyle(logoFirst).getPropertyValue('font-weight')];

        });
    };

    logoDecorate();

    // get JSON
    const getJSON = () => {

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

    // Card Template
    const cardTemplate = (elem) => {
        let card = document.createElement('div');
        card.classList.add('card');

        // push info of persons
        let cardInfoList = [elem.species, elem.citizenship, elem.gender, elem.birthDay],
            pushInfoList = [];

        for (let i = 0; i < cardInfoList.length; i++) {
            if (cardInfoList[i] !== undefined) {
                pushInfoList.push(cardInfoList[i][0].toUpperCase() + cardInfoList[i].substring(1));
            }
        }

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
        
        document.querySelector('.content').append(card);
    };

    // createCards
    const createCards = () => {

        getJSON()
        .then((request) => {
            request.forEach((item) => {
                cardTemplate(item);
            });
            return request;
        })
        .then((request2) => {
        
            request2.forEach((elem, i) => {

                let cardUl = document.querySelectorAll('.movies-list');

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
            const movies = response.reduce((acc, item) => acc.concat(item.movies), []),
                  filterMovies = movies.filter((item, i) => (movies.indexOf(item) === i) && item !== undefined);

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

    // filter content
    const filterContent = () => {
        const filmSelect = document.getElementById('filmsSelect'),
              aliveStatus = document.getElementById('aliveStatus'),
              deathStatus = document.getElementById('deathStatus'),
              allStatus = document.getElementById('allStatus'),
              filterBtn = document.querySelector('.filter__button'),
              contentArea = document.querySelector('.content');

        filterBtn.addEventListener('click', () => {
            const selectedFilm = filmSelect.options[filmSelect.options.selectedIndex].textContent,
                  isAliveChecked = aliveStatus.checked,
                  isDeathChecked = deathStatus.checked,
                  isAllStatus = allStatus.checked;

            getJSON()
            .then((response) => {
                if ( selectedFilm === 'None' && ( !isAliveChecked && !isDeathChecked ) ) {

                    contentArea.textContent = '';
                    createCards();

                } else {

                    if ( selectedFilm !== 'None' ) {

                        contentArea.textContent = '';

                        let filterData = [];
    
                        response.forEach((elem) => {
                            if (elem.movies !== undefined) {
                                if ( elem.movies.indexOf(selectedFilm) !== -1 ) {
                                    filterData.push(elem);
                                }
                            }
                        });
    
                        if ( !isAliveChecked && !isDeathChecked ) {
    
                            filterData.forEach((item) => {
                                cardTemplate(item);
                            });
    
                        } else {
    
                            let unselectedStatus = !isAliveChecked ? 'alive' : 'deceased';
    
                            const filterData2 = filterData.filter((item) => item.status !== unselectedStatus);
    
                            filterData2.forEach((item) => {
                                cardTemplate(item);
                            });
    
                        }

                    } else {

                        contentArea.textContent = '';

                        if ( isAllStatus ) {
                            createCards();
                        }

                        let filterData = [];

                        let unselectedStatus = !isAliveChecked ? 'alive' : 'deceased';

                        response.forEach((elem) => {
                            if (elem.movies !== undefined) {

                                if ( elem.status !== unselectedStatus ) {
                                    filterData.push(elem);
                                }
                            }
                        });

                        filterData.forEach((item) => {
                            cardTemplate(item);
                        });

                    }

                }

                return response;
            })
            .then((response2) => {
        
                response2.forEach((elem, i) => {
    
                    let cardUl = document.querySelectorAll('.movies-list');
    
                    if (elem.movies === undefined) {
                        
                        if (cardUl[i] !== undefined) {
                            cardUl[i].textContent = 'No movies with this character have been found';
                        }

                    } else {
    
                        for (let movie of elem.movies) {
    
                            let listItem = document.createElement('li');
                            listItem.classList.add('movies-list__elem');
                            listItem.textContent = movie;

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

    // Search content
    const searchContent = () => {

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

                  getJSON()
                  .then((response) => {

                    let filterNames = [];

                    response.forEach((elem) => {

                        if ( elem.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1 ) {
                            filterNames.push(elem);
                        }
                    });

                    return filterNames;

                  })
                  .then((response2) => {
                    contentArea.textContent = '';
                    response2.forEach(item => cardTemplate(item));
                    return response2;
                  })
                  .then((response3) => {
                    
                    response3.forEach((elem, i) => {

                        let cardUl = document.querySelectorAll('.movies-list');
        
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

        searchInput.addEventListener('input', debounce(callInput, 600));
    };

    searchContent();

    // Change theme
    const changeTheme = () => {
        const themeBtn = document.getElementById('themeType'),
              lightBtn = document.getElementById('lightTheme'),
              darkBtn = document.getElementById('darkTheme'),
              rootElem = document.querySelector(':root'),
              setLightColors = () => {
                rootElem.style.setProperty('--color-background', '#E2E1E1');
                rootElem.style.setProperty('--color-primary', '#6E3FAA');
                rootElem.style.setProperty('--color-text', '#FFFFFF');
                rootElem.style.setProperty('--color-hide-text', '#575757');
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

                document.querySelectorAll('.live-status__img').forEach((element) => {
                    let newsrc = element.src.replace(/(.svg)/, '_light.svg');
                    element.src = newsrc;
                });

                setLightColors();

            } else if (event.target.closest('#darkTheme')) {
                
                lightBtn.style.display = 'flex';
                darkBtn.style.display = 'none';


                document.querySelectorAll('.live-status__img').forEach((element) => {
                    let newsrc = element.src.replace(/(_light.svg)/, '.svg');
                    element.src = newsrc;
                });

                setDarkColors();
            }

        });
    };

    changeTheme();

});