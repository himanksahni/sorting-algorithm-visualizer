<template>
    <div class="taskbar">
          <font-awesome-icon  class="show-bars" v-b-toggle.sidebar-variant icon='bars' size="lg" />
          <b-button class="show-button" size="sm" v-b-toggle.sidebar-variant>Configurations</b-button>
          <b-sidebar text-variant="light" z-index=2 width="190px" id="sidebar-variant" bg-variant="dark" shadow>
            <div class="px-3 py-2">
              <nav class="nav flex-column">
                <p class="nav-label"> Generate </p>
                <ul>
                  <li><a :class="[disabled ? 'disabled':'']" @click="changeArray({sliderValue})" class="nav-link active" href="#">New array</a></li>
                </ul>
                <p id="sel" class="nav-label"> Select Algorithm</p>
                <ul>
                  <li><a :class="[disabled ? 'disabled':'']" class="nav-link" v-b-toggle.sidebar-variant @click="mergesort" href="#">Merge Sort</a></li>
                  <li><a :class="[disabled ? 'disabled':'']" class="nav-link" v-b-toggle.sidebar-variant @click="heap_sort" href="#">Heap Sort</a></li>
                  <li><a :class="[disabled ? 'disabled':'']" class="nav-link" v-b-toggle.sidebar-variant @click="bubble_sort" href="#">Bubble Sort</a></li>
                  <li><a :class="[disabled ? 'disabled':'']" class="nav-link" v-b-toggle.sidebar-variant @click="insertion_sort" href="#">Insertion Sort</a></li>
                  <li><a :class="[disabled ? 'disabled':'']" class="nav-link" v-b-toggle.sidebar-variant @click="quick_sort" href="#">Quick Sort</a></li>
               </ul>
                 <p class="nav-label">Change Size</p>
                <ul>
                  <li class="desktop-input"><input type="range" 
                            min="1" 
                            max="120" 
                            value="1"
                            :disabled="disabled" 
                            :class="[disabled ? 'disabled':'']"
                            class="slider" 
                            id="myRange"
                            v-model="sliderValue"
                            @input="changeArray({sliderValue})"></li>
                  <li class="mobile-input"><input type="range"
                            min="1" 
                            max="65" 
                            value="1"
                            :disabled="disabled" 
                            :class="[disabled ? 'disabled':'']"
                            class="slider" 
                            v-model="sliderValue"
                            @input="changeArray({sliderValue})"></li>
                </ul>
                <p class="nav-label">Change Speed</p>
                <ul>  
                    <li><input type="range" 
                              min="1" 
                              max="100" 
                              value="1"
                              :disabled="disabled"
                              class="slider" 
                              v-model="speed"
                              @input="changeSpeed({speed})"></li>
                </ul>
            </nav>
            </div>
          </b-sidebar>

          <div class="color-block">
            <div class="completed"></div> <p class="color-tag">Sorted Position</p>
          </div>
          
          <div class="color-block">
            <div class="right-position"></div> <p class="color-tag">No Swapping</p>
          </div>

          <div class="color-block">
            <div class="wrong-position"></div> <p class="color-tag">Needs Swapping</p>
          </div>

          <div class="color-block">
            <div class="pivot"></div> <p class="color-tag">Pivot</p>
          </div>

          <div class="color-block">
            <div class="next-swapping-position"></div> <p class="color-tag">Next Swapping Position</p>
          </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import $ from 'jquery'
export default {
    name: 'Taskbar',
    computed:{
        ...mapState('array',['array','mergeOrder','disabled'])
    },
    methods: {
        heap_sort(){
          this.$store.commit('array/switchDisabled')
          this.$store.dispatch('heap/heap_sort')
        },
        quick_sort(){
          this.$store.commit('array/switchDisabled')
          this.$store.dispatch('quick/quick_sort')
        },
        bubble_sort(){
          this.$store.commit('array/switchDisabled')
          this.$store.dispatch('insertBubble/insertion_and_bubble_sort',"bubble")
        },
        insertion_sort(){
          this.$store.commit('array/switchDisabled')
          this.$store.dispatch('insertBubble/insertion_and_bubble_sort',"insertion")
        },
        mergesort(){
          this.$store.commit('array/switchDisabled')
          this.$store.dispatch('merge/merge_sort')
        },
        merge_sort(){
          this.$store.dispatch('array/merge_sort')
          const mergeOrder = this.$store.state.array.mergeOrder
          const bars = $('.bars')
          let i = 1
          let j = 1
          for(i; i< mergeOrder.length;i++){
            // console.log(i+1)
            const compBarOne = bars[mergeOrder[i][0]]
            const compBartwo = bars[mergeOrder[i][1]]
            const heightToChange = (mergeOrder[i][3] *3 ) + 10
            const heightBar = bars[mergeOrder[i][2]]
            setTimeout(()=>{
              $(compBarOne).css("background-color","red")
              $(compBartwo).css("background-color","red")
              $(heightBar).css("height",`${heightToChange}px` ) 
              },
              10*j)
            
            j++
            setTimeout(()=>{
              $(compBarOne).css("background-color","gray")
              $(compBartwo).css("background-color","gray")
              },
            10*j)
            j++
          }
        },
        ...mapMutations('array',['changeArray','changeValue','changeSpeed']),
        ...mapMutations('insertBubble',['changeValue'])
    },
    created(){
      this.changeArray(this.sliderValue)
      this.changeSpeed({speed:this.speed})
    },
    data(){
      return{
        sliderValue: 1,
        speed:1
      }
    },
}
</script>

<style scoped>
  .taskbar{
    grid-column: 1/3;
  }
  a{
    text-decoration: none;
    color: white;
  }
  .nav-label{
    color: grey
  }
  strong{
    color: white!important;
  }
  .mobile-input{
    display: none !important;
  }
  .show-bars{
    display: none
    }
  
  .color-block{
    margin-left: 20px;
  }
  .completed{
    margin-top:40%;
    /* margin-left: 20px; */
    width: 20px;
    height: 20px;
    background-color: #bae1ff;
    display: inline-block;
  }
  .right-position{
    /* margin-left: 20px; */
    width: 20px;
    height: 20px;
    background-color: #baffc9;
    display: inline-block;
  }
  .wrong-position{
    /* margin-left: 20px; */
    width: 20px;
    height: 20px;
    background-color: #ffb3ba;
    display: inline-block;
  }
  .pivot{
    width: 20px;
    height: 20px;
    background-color: #ba77b7;
    display: inline-block;
  }
  .next-swapping-position{
    width: 20px;
    height: 20px;
    background-color: green;
    display: inline-block;
  }
  .color-tag{
    display: inline-block;
    padding-left: 5px;
    font-size: 0.8rem;
  }
  .disable{
    pointer-events: none;
    cursor: not-allowed;
  }
  @media only screen and (max-width: 600px) {
      .color-block{
        width:100%;
        text-align: center;
        margin: 0px
      }
      .color-tag{
        text-align: center;
        display: block;
        font-size: 0.5rem;
      }
      .mobile-input{
        display: inline !important;
      }
      .desktop-input{
        display: none !important;
      }
      .show-bars{
        margin: 20px;
        display:inline-block;
      }
      .show-button{
        display: none;
      }
  }
</style>