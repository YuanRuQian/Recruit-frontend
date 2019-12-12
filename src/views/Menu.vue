<template>
    <div class="docs">
        <iframe :src="src" frameborder="0" scrolling="no"></iframe>
    </div>
</template>



<script>

    export default {
        name: 'menu',
        data(){
            return {
                src:''
            }
        },

    }
</script>

<style>
        iframe {
            width: 100%;
            height: 99vh;
        }
</style>

