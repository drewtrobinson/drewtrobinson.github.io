let team = [];
let staff = [];
const people_container = document.querySelector('[people-container]');
const people_list = document.querySelector('[people-list]');

fetch('people.json').then(res => res.json()).then(data => {
    data.forEach(people => {
        staff.push(people);
        createPeopleCard(people);
    });
});

function createPeopleCard(obj){
    let node = document.querySelector('[people-card-template]').content.cloneNode(true).children[0];
    node.innerText = obj.name;

    node.addEventListener('click', e => {
        e.target.classList.toggle('select');
        loop(obj);
    });

    people_container.appendChild(node);
}

function loop(obj){
    plist = people_list;
    for (let i=0; i<people_container.children.length; i++){
        let inst = people_container.children[i];
        if (inst.classList.contains('select')){
            if (document.getElementById(inst.innerText) == null){
                let node = document.createElement('li');
                node.id = inst.innerText;
                node.innerText = inst.innerText;

                plist.appendChild(node);

                for (let j=0; j<obj.tags.length; j++){
                    btn = document.createElement('btn');
                    btn.innerText = obj.tags[j];
                    btn.addEventListener('click', e => {
                        e.target.classList.toggle('select');
                        console.log(e.target);
                        
                    });
                    node.appendChild(btn);
                }
                btn = document.createElement('btn');
                btn.contentEditable = true;
                btn.addEventListener('keyup', e => {
                    if (btn.innerText != ''){
                        btn.classList.add('select');
                    } else {
                        btn.classList.remove('select');
                    }
                });
                node.appendChild(btn);
                

                team.push(inst.innerText);
            }
        } else {
            if (document.getElementById(inst.innerText) != null){
                team.splice(team.indexOf(inst.innerText), 1);
                document.getElementById(inst.innerText).remove();
            }
        }
    }
}