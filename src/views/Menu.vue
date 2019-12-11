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
                // 开发文档
                src:'https://github.com/YuanRuQian/Recruit-frontend/tree/final/src/assets/dev-docs.pdf'
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

