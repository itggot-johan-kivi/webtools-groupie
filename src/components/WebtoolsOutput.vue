<template>
     <div class="container">
        <wtmenu @do="proxy"/>
        <section id="output">
            <section class="card-container">
                <article v-for="(group, index) in activeGroupie.groups" class="card-group">
                    <h1 class="card-title"><span v-if="group.name">{{ group.name }}</span><span v-else>Grupp {{ index+1 }}</span></h1>
                    <draggable class="card-members" :options="{group:'member'}" @remove="removeCard">
                            <div class="member" v-for="member of group.members" :key="member">{{ member }}</div>
                    </draggable>
                </article>
            </section>
        </section>
    </div>
</template>

<script>

import wtmenu from '@/components/Menu';
import html2canvas from 'html2canvas';
import draggable from 'vuedraggable';

export default {
    name: 'wt-output',
    components: {
        wtmenu,
        draggable
    },
    data(){
        return {
            activeGroup: null
        }
    },
    methods:{
        proxy(e){
           if (e === `remix`) { this.remix(); }
           if (e === `cross`) { this.cross = true; this.crossGroups(); }
           if (e === `screenshot`) { this.takeScreenshot(); }
           if (e === `link`) { this.createLink(); }
        },
        collectMembers(){
            
            let collectedMembers = [];
            let members = document.querySelectorAll('.member');
            
            for(let member of members){
                collectedMembers.push(member.innerHTML.replace(`*`,``));
            }

            return collectedMembers;

        },
        collectGroups(){
            
            let collectedGroupie = {
                groupieName: `GroupieObj`,
                groups: []
            };

            let groups = document.querySelectorAll(`.card-group`);
            
            for(let group of groups){

                let title = group.querySelector('.card-title span').innerHTML;
                let members = group.querySelectorAll('.member');

                let tempGroup = {
                    groupName: title,
                    groupMembers: [] 
                };

                for(let member of members){
                    tempGroup.groupMembers.push(member.innerHTML);
                };

                collectedGroupie.groups.push(tempGroup);
            }

            return collectedGroupie;
        
        },
        remix(){

            let groupie = this.$store.state.activeGroupie;

             let data = {
                groupName: groupie.groupName,
                groupLeader: groupie.groupLeader,
                groupSize: groupie.groupSize*1,
                groupType: groupie.groupType,
                nameList: shuffle(this.collectMembers())
            }

            this.$store.commit('setActiveGroupie', data);

        },
        crossGroups(){

            let groups = this.collectGroups();
            
            let crossGroupsArr = [];
            
            for(let n=0, m=groups.groups[0].groupMembers.length; n<m; n++){
                
                let y = {
                    name: `Tvärgrupp ${n+1}`,
                    members: []
                }

                groups.groups.forEach(function(v,i) {
                    if(v.groupMembers[n]){
                        y.members[i] = v.groupMembers[n].replace(`*`,``);
                    }
                })
                crossGroupsArr.push(y);
            }

            let data = {
                groupType: 2,
                groupName: true,
                name: `Tvärgrupper`,
                groups: crossGroupsArr
            }

            this.$store.commit('setActiveGroupie', data);

        },
        takeScreenshot(){

            let now = Date.now();
            
            html2canvas(document.querySelector(`.card-container`),{
                background: `#eee`,
                onrendered:(canvas) => {
                    let a = document.createElement('a');
                    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                    a.download = `${now}_groupie.jpg`;
                    a.click();
                } 
            });

        },
        removeCard(e){
            
            if(e.from.childElementCount < 1){
                e.from.parentElement.remove();
            };

        },
        createLink(){
            let obj = this.collectGroups();
            let name = prompt(`Döp din Groupie`);
                obj.groupieName = name;
            
            console.log(obj);
        }
    },
    computed: {
        activeGroupie(){
            
            let groupie = this.$store.state.activeGroupie;

            if(groupie.groupType === 0){
                let results = generateGroupTypeMembers(groupie.nameList, groupie.groupSize, groupie.groupName, groupie.groupLeader);
                return results;
            }

            if(groupie.groupType === 1){
                let results = generateGroupTypeGroups(groupie.nameList, groupie.groupSize, groupie.groupName, groupie.groupLeader);
                return results;
            }

            if(groupie.groupType === 2){
                return groupie;
            }

        }
    }
};


/* GLOBAL FUNCTIONS */
function generateGroupTypeGroups(namesArr, groupSize, groupName, groupLeader){

    // Create Groupie Object
    let activeGroup = {
        name: null,
        groups: []
    };
    
    // Get Group Names
    let randName = getGroupName();

    // Do the shuffle
    shuffle(namesArr);

    // Get even chunks
    let groups = chunk(namesArr, groupSize, true);
    
    // Create object
    for (let group of groups) {

        // if leader
        if(groupLeader){
            let slump = Math.floor(Math.random()*group.length);
            group[slump] = `*${group[slump]}`;
        };

        let rName;
        if(groupName) { rName = randName.pop() } else { rName = false }

        let gr = {
            name: rName,
            members: group
        };

        activeGroup.groups.push(gr)
    }

    return activeGroup;
};


function generateGroupTypeMembers(namesArr, groupSize, groupName, groupLeader){
    
    // Create Groupie Object
    let activeGroup = {
        name: null,
        groups: []
    };
    
    // Get Group Names
    let randName = getGroupName();
    
    // Do the shuffle
    shuffle(namesArr);

    // Get even chunks
    let groups = chunk(namesArr, Math.ceil(namesArr.length/groupSize), true);
    
   
    // Create object
    for (let group of groups) {
 
        // if leader
        if(groupLeader){
            let slump = Math.floor(Math.random()*group.length);
            group[slump] = `*${group[slump]}`;
        };
        
        let rName;
        if(groupName) { rName = randName.pop() } else { rName = false }

        let gr = {
            name: rName,
            members: group
        };

        activeGroup.groups.push(gr)
    }
    return activeGroup;
};


function chunk(a, n, balanced) {
    
    if (n < 2)
        return [a];

    let len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n))

    }

    return out;
};


// Fisher Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};


// Group names
function getGroupName() {
	
    let prefix = ["Super","Ninja","Bunny","Robo","Ultra","Power","Speedy","Crazy","Bionic","Space","Ghost","Kung-Fu","Happy","Smooth","Fire","Smart","Poop","Mega","Mad","Majestic","Mighty","Cool","Diamond","Fabulous","Fantastic","Furious","Golden","Silver","Iron","Magic","Ruby","Pink","Crypto","War","Spicy","Curly"];
    let suffix = ["Zebras","Bananas","Rabbits","Zombies","Rangers","Sheriffs","Knights","Vikings","Ninjas","Turtles","Monkeys","Pants","Gardeners","Guardians","Masters","Astronauts","Experts","Poopers","Fighters","Stars","Criminals","Rollers","Pirates","Surfers","Warriors","Nerds","Scientists","Unicorns","Dolphins","Kittens"];
            
    let names = []; 

    for(let i=0, j=prefix.length; i < j; i++){
       
        for(let k=0, l=suffix.length; k < l; k++){
            names.push(`${prefix[i]} ${suffix[k]}`);
        }      
    }

    return shuffle(names);
};


</script>

<style>

#output {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;
}

.card-container {
    max-width: 1000px;
    margin: auto;
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:1rem;
}

.card-group {
    background: white;
    border-radius: 3px;
    box-shadow: 3px 3px 20px rgba(0,0,0,.05);
}


.card-group.edit .card-title {
    background: #EB6A6A;
}

.card-title {
    margin: 0;
    padding: 0 1rem;
    background: #888;
    color: rgba(255,255,255,1);
    height: 3rem;
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.card-members {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-content: stretch;
}

.card-members .member {
    padding: .5rem .75rem;
    border-bottom:1px solid rgba(0,0,0,.05);
    color: #555;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: .8rem;
}

.card-members .member:hover {
    cursor: grab;
}

.card-members .member:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px; 
}


.sortable-chosen, .sortable-ghost {
    background: rgba(235,106,106,.25) !important;
    cursor: grabbing !important;
}

</style>
