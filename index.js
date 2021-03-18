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
});