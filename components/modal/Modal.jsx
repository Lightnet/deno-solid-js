/*
  Project Name: solid-js-sandbox
  License: MIT
  Created by: Lightnet
*/

import {
  createSignal
, onMount
, onCleanup
, createEffect
, createMemo
, onError
} from 'solid-js';

import { Portal } from "solid-js/web";

import "./modal.css";

function Modal(props){

  const [isOpen, setIsOpen] = createSignal(props.isopen || false);
  const [enableDrag, setEnableDrag] = createSignal(props.enabledrag ||false);
  //setEnableDrag(true)
  const [offSet, setOffSet] = createSignal({x:0,y:0});
  const [translate, setTranslate] = createSignal({x:0,y:0});
  const [isDrag, setIsDrag] = createSignal(false);

  const [width, setWidth] = createSignal(props.width || 200);
  const [height, setHeight] = createSignal(props.height || 100);

  const [isCenter, setIsCenter] = createSignal(props.center || true);
  let ref;

  createEffect(()=>{
    console.log(props)
    //console.log(typeof props.isopen())
    //console.log(typeof props.isopen)
    setIsOpen(props.isopen)
  })

  createEffect(()=>{
    if(isCenter()){
      //set modal position center
      setTranslate({
        x:(window.innerWidth/2) - (width()/2)
        ,y:(window.innerHeight/2) - (height()/2)
      })
    }
  })

  onMount(()=>{

  })

  onCleanup(()=>{
    //console.log("CLEAN UP MODAL")
  })

  onError((err)=>{
    console.log(err)
  })

  function clickClose(){
    if(typeof props?.onClose === 'function'){
      //console.log("CLOSE MODAL?///")
      props.onClose();
    }
  }

  function onMouseDown(event){
    if(!enableDrag()){return;}
    //console.log("onMouseDown")
    event = event || window.event;
    const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
    const {left, top} = ref.getBoundingClientRect();

    setOffSet({
      x: event.pageX - (left + scrollLeft - clientLeft)
      , y: event.pageY - (top + scrollTop - clientTop)
    })

    setIsDrag(true);
  }

  function onMouseMove(event){
    if(!enableDrag()){return;}
    //console.log("onMouseMove")
    if(isDrag()){
      event = event || window.event;
      setTranslate({
        x: event.pageX - offSet().x,
        y: event.pageY - offSet().y
      })
    }
  }

  function onMouseUp(event){
    if(!enableDrag()){return;}
    //console.log("onMouseUp")
    setIsDrag(false);
  }

  const renderModal = createMemo(()=>{
    if(isOpen()==false){
      return <></>
    }else{
      return (<div ref={ref} class="modal_panel" style={`position:absolute;height:${height()}px;width:${width()}px;left:${translate().x}px;top:${translate().y}px;`}>
      <div class="modal_header" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} >
        <label>Modal</label> <span class="btnClose" style="float:right;"><button onClick={clickClose}>x</button></span>
      </div>
      <div class="modal_content" style="height:calc(100% - 18px);">
        {props.children}
      </div>
      </div>);
    }
  })

  return (
    <Portal mount={document.getElementById("modal")}>
      {renderModal}
    </Portal>
  )
}

export default Modal;