<template>
    <div :class="[checkRed && colorChanged.includes(elId)? 'color-red':
                  checkGreen && colorChanged.includes(elId)? 'color-green':
                  sorted ? 'completed':
                  quickVoilet && quickVoiletChanged.includes(elId)? 'color-voilet':
                  quickIPosition === elId? 'color-dark-green':
                  quickGreen && quickGreenChanged.includes(elId)? 'color-green':
                  quickRed && quickRedChanged.includes(elId)? 'color-red':
                  heapRed && heapRedChanged.includes(elId)? 'color-red':
                  heapGreen && heapGreenChanged.includes(elId)? 'color-green':
                  seperator.includes(elId)?'completed':
                  'color-gray' ]"
        class="bars" :style="heightCss" >
        
        <span v-if="showValue" class="desktop-value">{{value}}</span>
    
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Bars',
    props: ['value','elId'],
    created(){
    },
    computed: {
        ...mapState('array',['array','width','showValue','sorted']),
        ...mapState('insertBubble',['checkGreen','checkRed',
                                    'colorChanged']),
        ...mapState('quick',['quickGreen','quickVoilet','quickGreenChanged', 
                            'quickVoiletChanged', 'quickIPosition', 'quickRed',
                            'quickRedChanged','seperator']),

        ...mapState('heap',['heapRed', 'heapRedChanged', 'heapGreen', 'heapGreenChanged']),
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
        font-size: 16px;
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
    .color-voilet{
        background-color: violet;
    }

    .color-dark-green{
        background-color: green;
    }

    @media only screen and (max-width: 600px) {
        .bars{
            width: 5px!important;
        }
        .desktop-value{
            display: none;
        }
    }

</style>