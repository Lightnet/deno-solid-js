/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/

import {
  createSignal
, createContext
} from 'solid-js';

export const NotifyContext = createContext([{ notifies:[]},{}]);

function NotifyProvider(props){

  const [notifies, setNotifies] = createSignal([]);
  const [objNotify, setObjNotify] = createSignal(null);

  const value = [
    {notifies,
    objNotify,
    setObjNotify},
    {
      notify(arg){
        //console.log(arg)
        let color = arg.color || "info";
        let content = arg.content || "None";
        let autoClose = arg.autoClose || true;
        const obNote={
          id:crypto.randomUUID(),
          color:color,
          children:content,
          autoClose:autoClose
        }
        setNotifies(state=>[...state,obNote])
        //console.log(notifies())
        setObjNotify(obNote)
      },
      deleteNotifyID(id){
        //console.log("DELETE?")
        setNotifies(state=>state.filter(item=>item.id !== id))
      }
    }
  ];

  return (
    <NotifyContext.Provider value={value}>
      {props.children}
    </NotifyContext.Provider>
  );
}

export default NotifyProvider;