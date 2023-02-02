<template>
  <div class="por-horas">
    <div class="form-container">
      <h1 class="title">Cuánto cobras hoy?</h1>
      <form class="form" @submit.prevent>
        <div>
          <label for="horas">Cuántas horas laburaste?</label>
          <input v-model="horas" ref="horas.value" type="number" id="horas">

          <label for="nocturnas">Y horas nocturas?</label>
          <input v-model="nocturnas" ref="nocturnas.value" type="number" id="nocturnas">

          <label for="extras">Y horas extras?</label>
          <input v-model="extras" ref="extras.value" type="number" id="extras">
        </div>
        <button @click="montoHoras()">Calcular</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Swal from 'sweetalert2';

export default {

  setup() {
    let horas = ref('')
    let extras = ref('')
    let nocturnas = ref('')

    const montoHoras = () => {
      const montoNormal = 668.44;
      const montoFeriado = montoNormal * 2;
      const montoNocturnas = montoNormal * 1.08;
      let totalHoras = (montoNormal * horas.value) + (montoFeriado * extras.value) + (montoNocturnas * nocturnas.value)


      totalHoras > 5000 ? Swal.fire({
        title: `COBRAS $${totalHoras.toFixed(2)}`,
        text: 'Juegan esos red bull que vos sabes ;)',
        imageUrl: 'https://i.ytimg.com/vi/_Qn36DvJpa8/maxresdefault.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'a casa platita',
      }) : Swal.fire({
        title: `No queres saber la miseria que estas cobrando pa`,
        text: `$${totalHoras.toFixed(2)}, te alcanzan los puchos.`,
        imageUrl: 'https://elcomercio.pe/resizer/FgjS_snsl39BmZ23FjKysadmE1E=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VFYPAIIFTZG4VE342MH634H43I.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "platitan't",
      })
      return totalHoras
    }
    return {
      montoHoras,
      horas,
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
  margin-top: 10px;
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
  font-size: 16px;
  font-weight: bold;
  height: 50px;
  color: #fff;
  width: 100%;
  cursor: pointer;
  margin-top: 30px;
  font-family: "Open Sans", sans-serif;
  &:active {
    background-color: #3b8070;
  }
}
</style>