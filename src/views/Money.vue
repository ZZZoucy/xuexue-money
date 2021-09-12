<template>
    <div class="nav-wrapper">
        <div class="content">
            <p>money.vue</p>
        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
    export default ({
        name:'Money',
    })
</script>

<style lang="scss" scoped>
    .nav-wrapper{
        border: 1px solid blue;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        overflow: auto;
        flex-grow: 1;
    }
</style>