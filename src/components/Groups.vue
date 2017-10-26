<template>
    <aside id="overlay">
        <a href="#" id="close" @click="closeOverlay"><img src="/static/icon-close.svg" alt="close"></a>
        <main class="container">
            <a href="#" id="add-group" @click="saveGroup">Spara grupp</a>
            <section class="grid-container">
                <article v-for="(group, index) in savedGroups">
                    <h1 @click="populateNameList(index)">{{ group.groupName }}</h1>
                    <h2 @click="populateNameList(index)"> {{ group.groupMembers.length }} medlemmar</h2>
                    <a href="#" class="remove-group" @click="removeListItem(index)">Ta bort</a>
                </article>
            </section>
        </main>
    </aside>
</template>

<script>
export default {
    name: 'overlay',
    data(){
        return {
            groupie: false
        }
    },
    beforeCreate(){
        // Get groupieData
        if(localStorage.getItem(['groupie'])){
            this.groupie = true;
            this.$store.commit(`setGroupieObj`, JSON.parse(localStorage.getItem('groupie')))
            let x = this.$store.state.groupieObj;
        } else {
            console.error(`Hittar inget Groupie-objekt.`);	
        }
    },
    methods:{
        populateNameList(index){
            let obj = this.$store.state.groupieObj[index];
            let arr = obj.groupMembers;

            this.$store.commit("updateNameList", arr.join(`\n`));
            this.closeOverlay();
        },
        removeListItem(index){
            this.$store.commit(`removeGroup`, index);
        },
        saveGroup(){
            let name = prompt(`Döp gruppen`);
            if (name === null) {
                return;
            }

            let obj = {
                groupName: name,
                groupMembers: this.$store.state.nameList
            }

            this.$store.commit(`updateGroupieObj`, obj);     
        },
        closeOverlay(){
            this.$store.commit(`toggleShowGroups`);
        }
    },
    computed: {
        savedGroups(){
            return this.$store.state.groupieObj;        
        }
    }
}
</script>

<style>
aside#overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,1);
    z-index: 99;
    display: flex;
}

aside#overlay a#close {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background: rgba(255,255,255,.8);
    padding: .6rem;
    margin: 2rem;
    border-radius: 999em;
}

aside#overlay a#close:hover {
    background: rgba(255,255,255,1);
}


aside#overlay .container {
    flex: 1;
    margin: auto;
    max-width: 900px;
}


aside#overlay a#add-group {
    color: white;
    width: 120px;
    border:1px solid white;
    padding: .75rem 2rem;
    text-align: center;
    display: block;
    margin: 0 0 2rem 0;
    font-size: 1.2rem;
    text-decoration: none;
    border-radius: 3px;
}

aside#overlay a#add-group:hover {
    background: white;
    color: #222;
}

.remove-group:hover {
    display: inline-block;
    margin: .75rem 0 0 0;
    text-decoration: none;
    color: rgba(0,0,0,1);
    background: #EB6A6A;
    border-radius: 3px;
}

.remove-group {
    display: inline-block;
    margin: .5rem 0 0 0;
    padding: 3px;
    text-decoration: none;
    color: rgba(255,255,255,.6);
}

aside#overlay .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    grid-gap: 1rem;
}

aside#overlay article {
    padding: 1rem;
    opacity: .6;
}

aside#overlay article:hover {
    opacity: 1;
    cursor: pointer;
}

aside#overlay article h1 {
    color: white;
    margin: 0;
    padding: 0;
    font-size: 2rem;
}

aside#overlay article h2 {
    color: rgba(255,255,255,.6);
    margin: 0;
    padding: 0;
    font-weight: 200;
    font-size: 1.2rem;
}
</style>
