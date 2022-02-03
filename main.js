const userCardTemplate = document.querySelector('[user-card-template]');
const userCardContainer = document.querySelector('[user-card-container]');
const listCard = document.querySelector('[list-card]');
const list = document.getElementById('list');
let staffed = [];

fetch('https://gist.githubusercontent.com/drewtrobinson/2bcae79d252cf96807aab4880f4044ec/raw/e7a502bfdd222930887728de6ea9eed4080b036d/people.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(people => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector('[user-card-header');
            card.addEventListener('click', e => {
                const hideClass = card.classList.contains('selected');
                card.classList.toggle('selected', !hideClass);
                if (!hideClass){
                    staffed.push(card);
                    const newCard = listCard.content.cloneNode(true).children[0];
                    newCard.setAttribute('id', card.querySelector('[user-card-header]').textContent);
                    const newHeader = newCard.querySelector('[list-header]');
                    newHeader.setAttribute('class', 'li');
                    const newBody = newCard.querySelector('[list-body]');
                    newBody.setAttribute('class', 'li');
                    newHeader.textContent = card.querySelector('[user-card-header]').textContent;
                    for (let i=0; i<people.tags.length; i++){
                        newBody.innerHTML += '<btn>' + people.tags[i] + '</btn>';
                    }
                    newBody.innerHTML += '<span contenteditable></span>';
                    list.appendChild(newCard);
                } else {
                    staffed.splice(staffed.indexOf(card), 1);
                    list.removeChild(document.getElementById(card.querySelector('[user-card-header]').textContent));
                }
            });
            header.textContent = people.name;
            userCardContainer.append(card);
        })
    });

    document.addEventListener('click', e => {
        if (e.target.tagName == 'BTN'){
            console.log('btn');
            const selClass = e.target.classList.contains('selected');
            e.target.classList.toggle('selected', !selClass);
        }
    });