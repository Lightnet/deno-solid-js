/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

// https://www.solidjs.com/examples/context
// https://stackoverflow.com/questions/72368745/reseting-a-store-object-to-a-default-value-in-solidjs

import { 
  createSignal
, useContext
, createEffect
} from 'solid-js';

import { NotifyContext } from "./NotifyProvider.jsx";
import NotifyContainer from './NotifyContainer.jsx';

// need to have nofity position?
export default function NotifyManager(props) {

  const [notes, setNotes] = createSignal([]);
  const [{objNotify}] = useContext(NotifyContext);

  createEffect(()=>{
    if(objNotify()){
      console.log("create")
      setNotes(state=>[...state, <NotifyContainer onDeleteID={onDeleteID} {...objNotify()} />])
    }
  })

  function onDeleteID(id){
    setNotes(state=>state.filter(item=>item().id !== id))
    //console.log(notes())
  }

  return (
    <div id="notify" style="position:fixed;top:4px;right:4px;overflow:hidden;">
      {notes}
    </div>
  );
}