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
            //defino montos
            const montoNormal = 668.44;
            const montoNocturnas = montoNormal * 1.08;
            //manipulo el input de hora y fecha y me quedo solamente con la hora
            let start = DateTime.fromISO(entrada.value);
            let end = DateTime.fromISO(salida.value);
            let diffInHours = end.diff(start, 'hours');
            let horasTrabajadas = diffInHours.values.hours
            //guardo la hora de entrada y defino la cantidad de horas trabajadas
            let horaEntrada = start.c.hour;
            let horasTotales = horaEntrada + horasTrabajadas;
            //funcion para determinar un rango entre 2 numeros, en este caso, de entrada y salida
            function range(start, stop) {
                let totales = [];
                for (let i = start; i < (stop + 1); i++) {
                    totales.push(i);
                }
                return totales;
            }

            //declaro la variable del total
            let pagoTotal = 0
            //creo un array con la cantidad de horas trabajadas a partir del ingreso
            let arrHoras = range(horaEntrada, horasTotales)
           
            /**
             * Teniendo en cuenta que de 22 a 6 am se computan horas nocturnas, recorro el array
             * de horas trabajadas. Como no se puede pasar de 24 a 00, tomé el 25 como 00 y continué el bucle.
             * Si la hora es menor que 22 o mayor que 30 (explicado abajo), se suma una hora normal.
             * Si es domingo, se duplica por hora extra.
             * Si la hora es mayor o igual que 22 y menor o igual que 25, se paga nocturna.
             * Si es domingo, se duplica por hora extra.
             * (Usé 25 porque contando desde 22 a 25, 25 equivale a las 00 am que es la última hora del día, es un paso extra para corroborar si el otro dia es domingo o feriado.)
             * 
             */
            for (let i = 0; i < arrHoras.length-1 ; i++) {
                if (arrHoras[i] < 22 || arrHoras[i] > 30) {
                    if (start.weekdayLong == 'domingo' || feriado.value == true) {
                        pagoTotal = pagoTotal + (montoNormal * 2)
                    } else
                        pagoTotal = pagoTotal + montoNormal
                } else if
                    (arrHoras[i] >= 22 && arrHoras[i] <= 25) {
                    if (start.weekdayLong == 'domingo'|| feriado.value == true) {
                        pagoTotal = pagoTotal + (montoNocturnas * 2)
                    } else
                        pagoTotal = pagoTotal + montoNocturnas
                } else if 
                    (arrHoras[i] < 25 && arrHoras[i] > 29) {
                    if (end.weekdayLong == 'domingo'|| feriado.value == true) {
                        pagoTotal = pagoTotal + (montoNocturnas * 2)
                    } else
                        pagoTotal = pagoTotal + montoNocturnas
                }
            }
            //configuración de alarmas
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