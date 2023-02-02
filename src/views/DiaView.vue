<template>
    <div class="por-dia">
        <div class="form-container">
            <h1 class="title">Cuánto cobras hoy?</h1>
            <form class="form" @submit.prevent>
                <div>
                    <label for="entrada">Entrada:</label>
                    <input v-model="entrada" type="datetime-local" id="entrada" ref="entrada.value" name="entrada"
                        required>
                    <label for="salida">Salida:</label>
                    <input v-model="salida" type="datetime-local" id="salida" ref="salida.value" name="salida" required>
                    <label>Es feriado?</label><input type="checkbox" v-model="feriado" class="feriado" id="feriado"
                        ref="feriado.value">
                </div>
                <button @click="calculoHoras()">Calcular</button>
            </form>
        </div>
    </div>
</template>
<script>

import { ref } from 'vue';
import Swal from 'sweetalert2';
const { DateTime } = require("luxon");

export default {
    setup() {
        let entrada = ref('')
        let salida = ref('')
        let feriado = ref()

        const calculoHoras = () => {
            const montoNormal = 668.44;
            const montoNocturnas = montoNormal * 1.08;

            let start = DateTime.fromISO(entrada.value);
            let end = DateTime.fromISO(salida.value);
            let diffInHours = end.diff(start, 'hours');
            let horasTrabajadas = diffInHours.values.hours
            console.log('horas', horasTrabajadas);

            let horaEntrada = start.c.hour;
            let horasTotales = horaEntrada + horasTrabajadas;

            console.log(feriado.value)

            function range(start, stop) {
                let totales = [];
                for (let i = start; i < (stop + 1); i++) {
                    totales.push(i);
                }
                return totales;
            }
            let pagoTotal = 0
            let arrHoras = range(horaEntrada, horasTotales)
            for (let i = 0; i < arrHoras.length; i++) {
                if (arrHoras[i] < 22) {
                    pagoTotal = pagoTotal + montoNormal
                    if (start.weekdayLong == 'domingo' || feriado.value == true) {
                        pagoTotal * 2
                    } else
                        pagoTotal
                } else if
                    (arrHoras[i] >= 22 || arrHoras[i] <= 40) {
                    pagoTotal = pagoTotal + montoNocturnas
                    if (end.weekdayLong == 'domingo') {
                        pagoTotal * 2
                    } else
                        pagoTotal
                } return pagoTotal
            }

            pagoTotal > 5000 ? Swal.fire({
                title: `COBRAS $${pagoTotal.toFixed(2)}`,
                imageUrl: 'https://i.ytimg.com/vi/_Qn36DvJpa8/maxresdefault.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'a casa platita',
            }) : Swal.fire({
                title: `COBRAS $${pagoTotal.toFixed(2)}`,
                imageUrl: 'https://elcomercio.pe/resizer/FgjS_snsl39BmZ23FjKysadmE1E=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VFYPAIIFTZG4VE342MH634H43I.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "platitan't",
            })
        }
        return {
            calculoHoras,
            entrada,
            feriado,
            salida,
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
    margin-top: 10px;
}

.check {
    display: flex;
    align-items: center;
}

label {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
}

input[type='datetime-local'] {
    border: none;
    outline: none;
    color: #fff;
    background-color: #496583;
    font-size: 20px;
    padding: 6px;
    border-radius: 8px;
    margin-bottom: 40px;
    transition: 0.4s;

    &:focus {
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2)
    }
}

input[type='checkbox'] {
    border: none;
    outline: none;
    color: #fff;
    background-color: #496583;
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