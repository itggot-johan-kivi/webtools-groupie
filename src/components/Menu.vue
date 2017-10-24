<template>
    <nav>
        <a v-for="option in options" href="#" :id="option.id">
            <div class="icon">
                <img :src="option.iconUrl" :alt="option.tip">
            </div>
            <div class="tip">
                <span class="label">{{ option.tip }}</span>
            </div>
        </a>
    </nav>
</template>

<script>
export default {
    name: 'wt-menu',
    data(){
        return {
            options: [
                {
                    id: `groups`,
                    iconUrl: `/static/icon-nav.svg`,
                    tip: `Sparade grupper`
                },
                {
                    id: `edit`,
                    iconUrl: `/static/icon-edit.svg`,
                    tip: `Ändra i grupper`
                },
                {
                    id: `remix`,
                    iconUrl: `/static/icon-remix.svg`,
                    tip: `Blanda grupper`
                },
                {
                    id: `screenshot`,
                    iconUrl: `/static/icon-screenshot.svg`,
                    tip: `Spara som bild`
                },
                {
                    id: `link`,
                    iconUrl: `/static/icon-link.svg`,
                    tip: `Spara som länk`
                }
            ]
        }
    },
    methods: {
        showGroups(){
            store.changeState(`overlay`);
        }
    }
}
</script>

<style>

nav {
    position: fixed;
    margin: 2rem 0 0 2rem;
    display: flex;
    flex-direction: column;
    width: 15rem;
    height: 300px;
}

nav.input {
    height: 60px;
}

nav a {
    display: flex;
    flex: 1;
    align-items: center;
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
