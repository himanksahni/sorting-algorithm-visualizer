<template>
    <div class="body">
        <div class="grid-body">
            <div class="bar-container">
                <Bars v-for="(el, index) in array" 
                :key="index" 
                :value="el"
                :elId="index"  />
            </div>
    </div>
    </div>
    
</template>

<script>
import Bars from './Bars'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Body',
    components:{
        Bars,
    },
    methods: {
        ...mapMutations('array',[])
    },
    computed: {
        ...mapState('array',['array']),
        ...mapGetters('array', ['getArray'])
    },
    created(){ 
        this.$store.dispatch('array/addFirstElement')
        this.merge_sort
    },

}
</script>

<style scoped>
    .body{
        grid-column: 3/13;
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(12,1fr);

    }
    .grid-body{
        grid-column: 1/12;
    }
    .bar-container{

        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: center;
    }

</style>