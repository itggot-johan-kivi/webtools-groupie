<template>
    <section id="output">
        <section class="card-container">
            <article v-for="(group, index) in activeGroupie.groups" class="card-group">
                <h1 class="card-title"><span v-if="group.name">{{ group.name }}</span><span v-else>Grupp {{ index+1 }}</span></h1>
                <ul class="card-members">
                    <li class="member" v-for="member of group.members">{{ member }}</li>
                </ul>
            </article>
        </section>
    </section>
</template>

<script>
export default {
    name: 'wt-output',
    data(){
        return {
            activeGroup: null
        }
    },
    methods:{
        collectGroups(){
            let arr = this.activeGroup;
            console.log(arr);
        }
    },
    computed: {
        activeGroupie(){
            let groupie = this.$store.state.activeGroupie;

            if(groupie.groupType === 0){
                let results = generateGroupTypeMembers(groupie.nameList, groupie.groupSize, groupie.groupName, groupie.groupLeader);
                this.activeGroup = results;
                console.log(results);
                return results;
            }

            if(groupie.groupType === 1){
                let results = generateGroupTypeGroups(groupie.nameList, groupie.groupSize, groupie.groupName, groupie.groupLeader);
                this.activeGroup = results;
                console.log(results);
                return results;
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
    console.log(activeGroup);
    return activeGroup;
};

function generateGroupTypeMembers(namesArr,groupSize, groupName, groupLeader){
    
    // Create Groupie Object
    let activeGroup = {
        name: null,
        groups: []
    };
    
    // Get Group Names
    let randName = getGroupName();
    

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
    console.log(activeGroup);
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
}

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

// Group numbers

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

.card-container {
    width: 60vw;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:1rem;
}

.card-group {
    background: white;
    border-radius: 3px;
    box-shadow: 3px 3px 20px rgba(0,0,0,.05);
}

.card-title {
    margin: 0;
    padding: 0;
    background: #888;
    color: rgba(255,255,255,1);
    height: 4rem;
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
}

.card-members li {
    padding: .8rem;
    border:1px solid rgba(0,0,0,.05);
    color: #555;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.card-members li:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px; 
}

</style>
