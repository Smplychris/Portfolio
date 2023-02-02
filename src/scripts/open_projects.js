import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


let projects = document.querySelectorAll('.project')
projects.forEach(project=>{
  let buttonOpen = project.querySelector('.project_open');
  let buttonClose = project.querySelector('.close_button');
  let page = document.querySelector('body')
  let currentProject = project.querySelector('.project_open_wrapper');
  gsap.set(currentProject,{
    xPercent:100
  })
  let openProject = gsap.timeline({
    paused:true,
    defaults:{
      ease:'power4.inOut',
      duration:2
    }
  })
  openProject.set(currentProject,{
    autoAlpha:1,
  })
  openProject.to(currentProject,{
    xPercent:0,
  })
  openProject.from(buttonClose,{
    opacity:0,
    y:'-100'
  },'-=1.5')
  openProject.from(currentProject.children,{
    opacity:0,
    y:"100",
  },'-=1')
  buttonOpen.addEventListener('click',()=>{
    page.classList.add('no_scroll')
    openProject.play();
  })
  buttonClose.addEventListener('click',()=>{
    openProject.reverse()
    page.classList.remove('no_scroll')
  })
})
