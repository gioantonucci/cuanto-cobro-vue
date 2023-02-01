<template>
    <div class="por-dia">
        <div class="form-container">
            <h1 class="title">Cuánto cobras hoy?</h1>
            <form class="form" @submit.prevent>
                <div>
                    <label for="dia">Que día es hoy?</label>
                    <select v-model="dia" id="dia" ref="dia.value" name="dia">
                        <option ref="dia.value">
                            Lunes
                        </option>
                        <option ref="dia.value">
                            Martes
                        </option>
                        <option ref="dia.value">
                            Miércoles
                        </option>
                        <option ref="dia.value">
                            Jueves
                        </option>
                        <option ref="dia.value">
                            Viernes
                        </option>
                        <option ref="dia.value">
                            Sábado
                        </option>
                        <option ref="dia.value">
                            Domingo
                        </option>
                    </select>
                    <label for="entrada">Entrada:</label>
                    <input v-model="entrada" type="number" id="entrada" ref="entrada.value" name="entrada" min="00"
                        max="24">
                    <label for="salida">Salida:</label>
                    <input v-model="salida" type="number" id="salida" ref="salida.value" name="salida" min="00"
                        max="24">
                    <label for="enMano">Cuánto cobraste en mano?</label>
                    <input v-model="enMano" ref="enMano.value" type="number" id="enMano">
                    <label>Es feriado?</label><input type="checkbox">
                </div>
                <button @click="onSubmit()">Calcular</button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import range from 'python-range';
import Swal from 'sweetalert2';

export default {
    setup() {
        let horas = ref('')
        let enMano = ref('')
        let extras = ref('')
        let entrada = ref('')
        let salida = ref('')
        //let dia = ref('')

        const calculoHoras = () => {
            const horaNormal = 668.44;
            const horaExtra = horaNormal * 1.08;
            let horas = [...range(entrada.value, salida.value + 1)]
            let total = 0

            for (let i = 0; i < horas.length; i++) {
                if (horas[i] >= 22 || horas[i] <= 6) {
                    total = total + horaExtra
                } else {
                    total = total + horaNormal
                }
            }
            total > 5000 ? Swal.fire({
                title: `COBRAS $${total.toFixed(2)}`,
                text: 'Juegan esos red bull que vos sabes ;)',
                imageUrl: 'https://i.ytimg.com/vi/_Qn36DvJpa8/maxresdefault.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'a casa platita',
            }) : Swal.fire({
                title: `No queres saber la miseria que estas cobrando pa`,
                text: `$${total.toFixed(2)}, te alcanzan los puchos.`,
                imageUrl: 'https://elcomercio.pe/resizer/FgjS_snsl39BmZ23FjKysadmE1E=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VFYPAIIFTZG4VE342MH634H43I.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "platitan't",
            })

        }
        const onSubmit = () => {
            calculoHoras()
        }

        return {
            onSubmit,
            calculoHoras,
            horas,
            enMano,
            extras,
            entrada,
            salida
        }
    }
}
</script>
<style scoped lang="scss">
.por-dia {
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