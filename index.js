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

    const createCards = () => {
        
        const cardTemplate = (elem) => {
            let card = document.createElement('div');
            card.classList.add('card');
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
                                ${elem.species ? elem.species[0].toUpperCase() + elem.species.substring(1) : ''} 
                                ${elem.citizenship ? ', ' + elem.citizenship.toLowerCase() : ''} 
                                ${', ' + elem.gender.toLowerCase()}
                                ${elem.birthDay ? ', ' + elem.birthDay : ''}
                              </span>
                              <div class="live-status card__live-status">
                                <img src=${elem.status === 'alive' ? './img/heart.svg' : './img/death.svg'} alt="status" class="live-status__img">
                                <span class="live-status__text">${elem.status[0].toUpperCase() + elem.status.substring(1)}</span>
                              </div>
                              <div class="card__border"></div>
                              <span class="card__actor-title">Actor</span>
                              <span class="card__actor-name">${elem.actors}</span>
                              <span class="card__movies-title">Movies</span>
                              <ul class="movies-list card__movies-list">

                              </ul>`;
            
            document.querySelector('.content').append(card);

            // elem.movies.forEach((item) => {
            //     let listItem = document.createElement('li');
            //     listItem.classList.add('movies-list__elem');
            //     listItem.textContent = item;
            //     document.querySelector('.movies-list').append(listItem);
            // });
        };

        getJSON()
        .then((request) => {
            console.log(request);
            request.forEach((item) => {
                cardTemplate(item);
            });
            return request;
        })
        .then((request2) => {
        
            request2.forEach((elem, i) => {

                console.log(elem.movies);
                let cardUl = document.querySelectorAll('.movies-list');

                if (elem.movies === undefined) {
                    console.log('empty');
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

});