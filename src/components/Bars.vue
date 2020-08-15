<template>
    <div :class="[checkRed && colorChanged.includes(elId)? 'color-red':
                  checkGreen && colorChanged.includes(elId)? 'color-green':
                  sorted ? 'completed': 'color-gray' ]"
        class="bars" :style="heightCss" >
        
        <span v-if="showValue">{{value}}</span>
    
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Bars',
    props: ['value','elId'],
    created(){
        console.log("hello",this.colorChanged)
    },
    computed: {
        ...mapState('array',['array','width','sorted','checkGreen',
                            'checkRed', 'colorChanged','showValue']),
        heightCss(){
            let h = (this.value*3) + 10
            h = `${h}px`
            const w = `${this.width}px`
            return {
                height: h,
                width: w
            }
        }
    }

    
}
</script>

<style scoped>
    .bars{
        display: inline-block;
        margin-left:4px;
        text-align: center;
        font-weight: bold;
    }
    .color-gray{
        background-color: gray;
    }
    .color-red{
        background-color: #ffb3ba;
    }
    .color-green{
        background-color: #baffc9;
    }
    .completed{
        background-color: #bae1ff;
    }

    @media only screen and (max-width: 600px) {
        .bars{
            width: 2px!important;
        }
    }

</style>