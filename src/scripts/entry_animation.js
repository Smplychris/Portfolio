import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
import SplitType from 'split-type';
let imagesLoaded = require ("imagesLoaded");

let chars = new SplitType('.split_char',{types:'chars'})
let words = new SplitType('.split_word',{types:'words'})
let body = document.querySelector('body')
let splitChar = document.querySelector('.split_char')
let splitWords = document.querySelector('.split_word')

imagesLoaded(document.querySelectorAll('img'),{background: true},function(){
  entryAnimation.play()
})

let entryAnimation = gsap.timeline({
  paused:true,
  onComplete:()=>{
    body.classList.remove('no_scroll')
  }
})
entryAnimation.from(splitChar.children,{
  y:"100%",
  duration:0.6,
  ease:'circ.inOut',
  opacity:0,
  stagger:0.02
});
entryAnimation.from(splitWords.children,{
  y:"100%",
  duration:0.6,
  ease:'circ.inOut',
  opacity:0,
  stagger:0.02
},"-=0.6")
