Vue.component('CoinDetail',{
    props:['coin'],

    data(){
      return{
          showPrices:false,

          value:0
      }
    },

    methods: {
        toggleShowPrices(){
            this.showPrices = !this.showPrices

            this.$emit('change-color', this.showPrices ? 'FF96C8' : '3D3D3D')
        },
        closeShowPrices(){
            this.showPrices = false
        },

        openShowPrices(){
            this.showPrices = true
        }
    },


    computed: {
        title(){
            return`${this.coin.name} - ${this.coin.symbol}`
        },

        convertedValue(){
            if(!this.value){
                return 0
            }
            return  this.value / this.coin.price
        }
    },

    template: `
    <div>
        <img v-on:mouseover="openShowPrices" v-on:mouseout="closeShowPrices" v-bind:src="coin.img" v-bind:alt="coin.name"/>

        <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
            {{ title }}
            <span v-if="coin.changePercent > 0">👍</span>
            <span v-else-if="coin.changePercent < 0">👎</span>
            <span v-else>🤞</span>
            <span v-on:click="toggleShowPrices">{{ showPrices ? "🙈" : "🐵"}}</span>
        </h1>
        
        <input type="number" v-model="value">
        <span>{{ convertedValue }}</span>
        
        <slot name="text"></slot>
        <slot name="link"></slot>
        
        <ul v-show=showPrices>
          <li class="uppercase" v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }" v-for="(p, i) in coin.pricesWithDays" v-bind:key="p.day">
            {{ i }} - {{ p.day }} - {{ p.value }}
          </li>
        </ul>    
    
    </div>
    `
})



new Vue({
    el: "#app",

    data(){
        return{
            btc:{
                name: "Bitcoin",
                symbol: "BTC",
                img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
                changePercent: -10,
                pricesWithDays: [
                    { day: 'Lunes', value: 8400 },
                    { day: 'Martes', value: 7900 },
                    { day: 'Miercoles', value: 8200 },
                    { day: 'Jueves', value: 9000 },
                    { day: 'Viernes', value: 9400 },
                    { day: 'Sabado', value: 10000 },
                    { day: 'Domingo', value: 10200 },
                ],
                price:8400,
            },

            color: "f4f4f4"
        }
    },

    watch: {
        showPrices(newVal,oldVal){
            console.log(newVal,oldVal)
        }
    },

    methods:{
        updateColor(color){
            this.color = color || this.color.split("").reverse().join("")
        }
    }
})
