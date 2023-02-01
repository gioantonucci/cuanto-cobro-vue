<template>
  <div class="por-horas">
    <div class="form-container">
      <h1 class="title">Cuánto cobras hoy?</h1>
      <form class="form" @submit.prevent>
        <div>
          <label for="enMano">Cuánto cobraste en mano?</label>
          <input v-model="enMano" ref="enMano.value" type="number" id="enMano">

          <label for="horas">Cuántas horas laburaste?</label>
          <input v-model="horas" ref="horas.value" type="number" id="horas">

          <label for="nocturnas">Y horas nocturas?</label>
          <input v-model="nocturnas" ref="nocturnas.value" type="number" id="nocturnas">

          <label for="extras">Y horas extras?</label>
          <input v-model="extras" ref="extras.value" type="number" id="extras">
        </div>
        <button @click="onSubmit()">Calcular</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';


export default {
  setup() {
    let horas = ref('')
    let enMano = ref('')
    let extras = ref('')
    let nocturnas = ref('')

    const montoHoras = () => {
      const normal = 668.44;
      const feriado = normal * 2;
      const nocturnas = normal * 1.08;

      let totalHoras = (enMano.value ? enMano.value : 0) + (normal * horas.value) + (feriado * extras.value) + (nocturnas * nocturnas.value)
      totalHoras.toFixed(2)
      alert(`Cobras $ ${totalHoras}`)
      return totalHoras
    }
    const onSubmit = () => {
      montoHoras()
    }

    return {
      onSubmit,
      montoHoras,
      horas,
      enMano,
      extras,
      nocturnas
    }
  }
}
</script>
<style scoped lang="scss">
.por-horas {
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

.form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.form div {
  display: flex;
  flex-direction: column;

}

label {

  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

input,
select {
  border: none;
  outline: none;
  color: #fff;
  background-color: #496583;
  font-size: 20px;
  padding: 6px;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: 0.4s;

  &:focus {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2)
  }
}



button {
  background-color: #42b883;
  border: none;
  border-radius: 8px;
  font-size: var(--md);
  font-weight: bold;
  height: 50px;
  color: #fff;
  width: 100%;
  cursor: pointer;
  margin-top: 30px;

  &:active {
    background-color: #3b8070;
  }
}
</style>