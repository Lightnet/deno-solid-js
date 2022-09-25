/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

// https://www.solidjs.com/examples/context
// https://stackoverflow.com/questions/72368745/reseting-a-store-object-to-a-default-value-in-solidjs
// https://stackoverflow.com/questions/41223081/sliding-transition-for-list-items-when-one-is-removed
import { 
  createSignal
, createEffect
, createMemo
, onMount 
} from 'solid-js';

//import "./notify.css";

export default function NotifyContainer(props) {
  //console.log(props)

  const [fade , setFade] = createSignal(true)
  const [nColor , setNColor] = createSignal(props.color || 'info')
  const [ID , setID] = createSignal(props.id)

  let ref;
  let fadeID;
  let closeID;

  function onClose(){
    clearTimeout(fadeID)
    clearTimeout(closeID)
    if(typeof props?.onDeleteID == 'function'){
      props.onDeleteID(ID());
    }
  }

  function clickClose(){
    callFade()
    clearTimeout(fadeID)
    clearTimeout(closeID)
    closeID = setTimeout(()=>{
      if(typeof props?.onDeleteID == 'function'){
        props.onDeleteID(ID());
      }
      clearTimeout(closeID)
    },2000)
  }

  function callFade(){
    //console.log("TIMER CLOSE...")
    setFade(false)
    ref.classList.remove("notify_in"); //this works
    ref.classList.add("notify_out"); //this works
  }

  const nodeClass = createMemo(()=> {
    //console.log("createMemo: ",fade())
    return "notify" + " " + (fade()?"notify_in":"notify_out") + " ";
  })

  //createEffect(()=>{//check class string
    //console.log(nodeClass())
  //})

  onMount(() => {
    //if(props?.autoClose){
      fadeID = setTimeout(()=>callFade(),9000)
      closeID = setTimeout(()=>{
        onClose()
      },10000)
    //}
  })

  //onCleanup(()=>{ //bug ?
    //console.log("CLEAN UP??")
    //clearTimeout(fadeID)
    //clearTimeout(closeID)
  //})

  return (
    <div ref={ref} id={ID()} class={ nodeClass()}>
      
        <span class={nColor()} style="float:right;">
          {props.children}
          <span style="float:left;">
            <button onClick={clickClose}> X </button>
          </span>
        </span>
      
    </div>
  );
}
/*
<span style="float:right;top:100px;">
</span>
*/