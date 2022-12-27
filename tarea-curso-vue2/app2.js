new Vue({
    el: '#app',

    data () {
        return {
            title:"",
            time:0,
            courses: [],
            cursos:[],
            horasTotales:0,
            curso:""
        }
    },

    computed: {
        totalTime(){
            this.horasTotales = 0
            if(this.courses){
                return "No tiene clases registradas"
            }
            for (let i = 0 ; i < this.courses.length; i++){
                i = i + 1
                this.horasTotales = this.horasTotales + this.courses[i]
            }
            return this.horasTotales
        },

        lista(){

        }

    },

    methods: {
        addCourse(){
            this.courses.push(this.title, Number(this.time) )
            this.cursos.push({name: this.title, hour: Number(this.time)})
        }

    }
})