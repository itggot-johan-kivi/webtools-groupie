<template>
    <nav>
        <a href="#" @click="showGroups" v-if="!checkState">
            <div class="icon">
                <img src="/static/icon-nav.svg" alt="Sparade Grupper">
            </div>
            <div class="tip">
                <span class="label">Hantera Grupper</span>
            </div>
        </a>
         <a href="#" v-if="checkState" @click="back">
            <div class="icon">
                <img src="/static/icon-back.svg" alt="Tillbaka">
            </div>
            <div class="tip">
                <span class="label">Tillbaka</span>
            </div>
        </a>
        <a href="#" v-if="checkState && !cross" @click="remix">
            <div class="icon">
                <img src="/static/icon-remix.svg" alt="Blanda Grupper">
            </div>
            <div class="tip">
                <span class="label">Blanda Grupper</span>
            </div>
        </a>
        <a href="#" v-if="checkState && !cross" @click="crossGroup">
            <div class="icon">
                <img src="/static/icon-tvargrupp.svg" alt="Skapa tvärgrupper">
            </div>
            <div class="tip">
                <span class="label">Skapa tvärgrupper</span>
            </div>
        </a>
        <a href="#" v-if="checkState" @click="screenshot">
            <div class="icon">
                <img src="/static/icon-screenshot.svg" alt="Spara som bild">
            </div>
            <div class="tip">
                <span class="label">Spara som bild</span>
            </div>
        </a>
        <a href="#" v-if="checkState" @click="link">
            <div class="icon">
                <img src="/static/icon-link.svg" alt="Spara som länk">
            </div>
            <div class="tip">
                <span class="label">Spara som länk</span>
            </div>
        </a>
    </nav>
</template>

<script>
export default {
    name: 'wt-menu',
    data(){
       return {
           cross: false
        }
    },
    methods: {
        showGroups(){
            this.$store.commit(`toggleShowGroups`);
        },
        back(){
            this.$store.commit('toggleState');
            this.$router.push({name: 'wt-input'});
        },
        remix(){
            this.$emit(`do`, `remix`);
        },
        crossGroup(){
            this.$emit(`do`, `cross`);
            this.cross = true;
        },
        screenshot(){
            this.$emit(`do`, `screenshot`);
        },
        link(){
            this.$emit(`do`, `link`);
        }
    },
    computed: {
        checkState(){
            return this.$store.state.stateOutput;   
        }
    }
}
</script>

<style>

nav {
    position: fixed;
    margin: 2rem 0 0 2rem;
    width: 16vw;
    height: 300px;
    z-index: 9;
}

nav a {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0 0 .5rem 0;
}

nav a .icon {
    flex: .4;
    display: flex;

}

nav a .tip {
    flex: 1;
    display: flex;
    align-items: center;
}

nav a:hover .icon img, nav a.active .icon img {
    background: #EB6A6A;
}

nav a:active .icon img {
    background: #222;
}

nav a img {
    height: 2rem;
    width: 2rem;
    padding: .6rem;
    border-radius: 999em;
    background: #95989A;
}

nav a span.label { 
    background: #222;
    position: relative;
    color: white;
    padding: .25rem .75rem;
    border-radius: 2px;
    display: none;
}

nav a span.label:after {
	right: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(0, 0, 0, 0);
	border-right-color: #222;
	border-width: 5px;
	margin-top: -5px;
}

nav a:hover span.label {
    display: block;
    animation: slide .2s ease;
}

@keyframes slide {
    from {  transform: translate3d(2rem,0,0); opacity: 0;   }
      to {  transform: translate3d(0,0,0); opacity: 1;      }
}

</style>
