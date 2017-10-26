<template>
    <div class="container">
    <section id="input">
        <div class="group-length"><b>{{ nameListLength }}</b> namn i listan</div>
        <textarea id="name-list" v-model="updateList" @change="validateList"></textarea>
        <div class="group-name" @click="groupName = !groupName">
            <div id="input-group-name" :class="{ selected: groupName }"></div>
            <h3>Ge grupperna ett kickass gruppnamn!</h3>
        </div>
        <div class="group-leader" @click="groupLeader = !groupLeader">
            <div id="input-group-leader" :class="{ selected: groupLeader }"></div>
            <h3>Slumpa fram en gruppledare / grupp</h3>
        </div>
        <div id="group-style-members" @click="groupType = 0" :class="{ selected: groupType == 0 }">Medlemmar / grupp</div>
        <div id="group-style-groups" @click="groupType = 1" :class="{ selected: groupType == 1 }">Antal grupper</div>
        <div class="group-scale">
            <ul id="scale" @click="scale">
                <li><span :class="{ selected: groupSize == 2 }">2</span></li>
                <li><span :class="{ selected: groupSize == 3 }">3</span></li>
                <li><span :class="{ selected: groupSize == 4 }">4</span></li>
                <li><span :class="{ selected: groupSize == 5 }">5</span></li>
                <li><span :class="{ selected: groupSize == 6 }">6</span></li>
                <li><span :class="{ selected: groupSize == 7 }">7</span></li>
                <li><span :class="{ selected: groupSize == 8 }">8</span></li>
                <li><span :class="{ selected: groupSize == 9 }">9</span></li>
                <li><span :class="{ selected: groupSize == 10 }">10</span></li>
                <li><span :class="{ selected: groupSize == 11 }">11</span></li>
                <li><span :class="{ selected: groupSize == 12 }">12</span></li>
                <li><span :class="{ selected: groupSize == 13 }">13</span></li>
                <li><span :class="{ selected: groupSize == 14 }">14</span></li>
            </ul>
        </div>
        <a href="#" @click="go" id="create-groups">Slump me some groups</a>
    </section>
    </div>
</template>

<script>
export default {
    name: 'wt-input',
    data() {
        return {
            groupName: true,
            groupLeader: false,
            groupType: 0,
            groupSize: 2
        }
    },
    methods: {
        scale(e){
            this.groupSize = e.target.innerHTML;
        },
        go(){

            let data = {
                groupName: this.groupName,
                groupLeader: this.groupLeader,
                groupSize: this.groupSize*1,
                groupType: this.groupType,
                nameList: this.$store.state.nameList
            }

            this.$store.commit('toggleState');
            this.$store.commit('setActiveGroupie', data);
            this.$router.push({name: 'wt-output'});
            
        },
        validateList(){
            let list = this.$store.state.nameList;
            let arr = list.filter(entry => entry.trim() != '');
            let newList = arr.join(`\n`);
            this.$store.commit("updateNameList", newList);
        }
    },
    computed: {
        updateList: {
            get: function () {
                let list = this.$store.state.nameList;
                let newList = list.join(`\n`);
                return newList;
            },
            set: function (newValue) {
                this.$store.commit("updateNameList", newValue)
            }
        },
        nameListLength(){
            return this.$store.state.nameList.length;
        }
    }
}
</script>

<style scoped>

.container {
    width:100vw;
    height: 100vh;
    display:flex;
}

#input {
    border-radius: 3px;
    width: 400px;
    box-sizing: border-box;
    margin: auto;
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40px 360px 40px 40px 40px 40px 80px;
    grid-template-areas: 
    "group-length group-length"
    "name-list name-list"
    "group-name group-name"
    "group-leader group-leader"
    "group-style-members group-style-groups"
    "scale scale"
    "create-groups create-groups"
}

#input .group-length {
        grid-area: group-length;
        color: rgba(0,0,0,.4);
        padding: 1rem .5rem;
        font-size: .8rem;
}

#name-list {
    grid-area: name-list;
    border: none;
    resize: none;
    padding: 0 1rem;
    box-sizing: border-box;
    font-size: .8rem;
    line-height: 30px;
    height: 360px;
    background: #fff url('/static/row.png');
    background-attachment: local;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}


#input h3 {
    margin: 0;
    padding: 0;
}

#input .group-name {
    grid-area: group-name;
    background: rgba(0,0,0,.1);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 0 0 1rem;
}

#input .group-leader {
    grid-area: group-leader;
    background: rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    padding: 0 0 0 1rem;
}

#input-group-name, #input-group-leader {
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 3px;
    margin: 0 1rem 0 0;
}

#input-group-name.selected, #input-group-leader.selected {
    background: #222 url('/static/icon-close-white.svg') no-repeat;
    background-size: 100%;
}

#input #group-style-members {
    grid-area: group-style-members;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 500;
}

#input #group-style-groups {
    grid-area: group-style-groups;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 500;
}

#group-style-groups:hover, #group-style-members:hover, .group-leader:hover, .group-name:hover {
    cursor: pointer;
}

#group-style-members.selected, #group-style-groups.selected {
    background: rgb(80, 80, 80) !important;
    color: rgba(255,255,255,.8);
}

#group-style-members.selected:after, #group-style-groups.selected:after {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(0, 0, 0, 0);
	border-top-color: rgb(80, 80, 80);
	border-width: 6px;
	margin-left: -6px;
}


#input .group-scale {
    grid-area: scale;
    background: rgba(0,0,0,.4);
}

#input .group-scale #scale {
    list-style: none;
    display: flex;
    height: 40px;
    margin: 0 0.5rem;
    padding: 0;
}

#input .group-scale #scale li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
}

#input .group-scale #scale li span {
    display: block;
    width: 17px;
    padding: 2px;
    text-align: center;
    border-radius: 999rem;
}

#input .group-scale #scale li span:hover {
    background: rgba(255,255,255,.2);
    cursor: pointer;
}

#input .group-scale #scale li span.selected {
    background: #444;
    color: white;
}


#input #create-groups {
    grid-area: create-groups;
    background: rgba(0,0,0,.7);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    color: rgba(255,255,255,.9);
    text-decoration: none;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

#input #create-groups:hover {
    background: rgba(0,0,0,.8);
}

#input #create-groups:active {
    background: rgba(0,0,0,1);
}
</style>
