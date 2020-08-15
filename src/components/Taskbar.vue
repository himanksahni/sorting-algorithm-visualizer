<template>
    <div class="taskbar">
          <b-button size="sm" v-b-toggle.sidebar-variant>Configurations</b-button>
          <b-sidebar text-variant="light" z-index=2 width="190px" id="sidebar-variant" bg-variant="dark" shadow>
            <div class="px-3 py-2">
              <nav class="nav flex-column">
                <p class="nav-label"> Generate </p>
                <ul>
                  <li><a class="nav-link active" href="#">New array</a></li>
                </ul>
                <p id="sel" class="nav-label"> Select Algorithm</p>
                <ul>
                  <li><a class="nav-link" v-b-toggle.sidebar-variant @click="merge_sort" href="#">Merge Sort</a></li>
                  <li><a class="nav-link" href="#">Heap Sort</a></li>
                  <li><a class="nav-link" v-b-toggle.sidebar-variant @click="bubble_sort" href="#">Bubble Sort</a></li>
                  <li><a class="nav-link" @click="insertion_sort" href="#">Insertion Sort</a></li>
               </ul>
                 <p class="nav-label">Change Size</p>
                <ul>
                  <li><input type="range" 
                            min="1" 
                            max="120" 
                            value="1" 
                            class="slider" 
                            id="myRange"
                            v-model="sliderValue"
                            @input="changeArray({sliderValue})"></li>
                </ul>
            </nav>
            </div>
          </b-sidebar>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import $ from 'jquery'
export default {
    name: 'Taskbar',
    computed:{

        ...mapState('array',['array','mergeOrder'])
    },
    methods: {
        bubble_sort(){
          this.$store.dispatch('array/insertion_and_bubble_sort',"bubble")

        },
        insertion_sort(){
          this.$store.dispatch('array/insertion_and_bubble_sort',"insertion")
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
        ...mapMutations('array',['changeArray','changeValue'])
    },
    created(){
      this.changeArray(this.sliderValue)
      // this.$store.dispatch('array/merge_sort')
    },
    data(){
      return{
        sliderValue: 1
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
</style>