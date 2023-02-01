<template>
    <div class="variables">
        <div class="form-container">
            <h1 class="title">Cuánto cobras hoy?</h1>
            <h2> Acá va a ir el editor de variables.</h2>
            <img src="https://pbs.twimg.com/media/DfIibtvXkAAnWur?format=jpg&name=small" />
        </div>
    </div>
</template>
<script>


export default {
    setup() {

    }
}
</script>
<style scoped lang="scss">
.variables {
    display: grid;
    place-items: center;
}

.form-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 300px;
}

h1 {
    font-size: 28px;
    color: #fff;
}

h2 {
    color: #fff;
}

.form {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

img {
    height: 296px;
}
</style>