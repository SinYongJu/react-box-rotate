import React, {useState, useEffect} from 'react';
import Box from './Box'
import {START,RESET, PAUSE } from '../js/constance'
import BoxJs from '../js/BoxJs'
import './App.css'


const initOpt = {
  index : 0,
  containerWidth: 800,
  containerHeight: 400,
  x : 0,
  y : 0,
  width: 50,
  height: 50,
}

const addArrayMaker = (arr) => {
    const list = arr.reduce((prev,cv,ci)=>{
      let add = Array.from(Array(4)).map((item,index) => {
        return { 
          box : new BoxJs({...initOpt, 
              index : index,
              x : cv.box.x, 
              y : cv.box.y, 
              width : cv.box.width/2,
              height : cv.box.height/2
          })  
        }
      })
      const result = Array.from(prev).concat(add)
      return result
    },[])

    
  return list

}


const App = () => {
  
  const initialRotate = {
    state : RESET,
    list : [],
  }
  
  const [ rotate , setRotate ] = useState(null)
  
    useEffect(()=>{
      let isInit = true
      const init = () => {
        
        isInit&&setRotate(c=>({
          state : RESET,
          list : [{ box : new BoxJs(initOpt) } ]
        }))
      }
      init()
      return () => isInit = false
    },[])
  
  

  const onStartHanler = () => {
    setRotate(c => ({
      ...c,
      state : START
    }))
  }

  const onPauseHanler = () => {
    setRotate(c => ({
      ...c,
      state : PAUSE
    }))
  }


  const onAddHanler = async () => {
    // await setRotate(c => ({
    //   ...c,
    //   state : PAUSE
    // }))
    await setRotate(c =>{
       const list = addArrayMaker(c.list.slice())
       console.log(list)
      return {
        ...c,
        state : START,
        list : [...list ]
      }
    })
    // await setRotate(c =>({
    //   ...c,
    //   state : START
    // }))

  }


  const onResetHanler = async () => {
    setRotate(c=>({
      ...initialRotate,
      list : [{ box : new BoxJs({...initOpt}) } ]
    }))

  }

  const memo = React.useMemo(()=> {
      return rotate&&rotate.list.map((item,index)=>{
        return <Box key={index} state={rotate.state} box={item.box}/>
        }) 
  },[rotate])
 
  return (
    <>
      <div className="App">
        {memo}
      </div>
      <button type='button' onClick={onStartHanler}>시작</button>
      <button type='button' onClick={onPauseHanler} style={{backgroundColor:'red',marginLeft:10}}>멈춤</button>
      <button type='button' onClick={onAddHanler} style={{backgroundColor:'green',marginLeft:10}}>더하기</button>
      <button type='button' onClick={onResetHanler} style={{backgroundColor:'blue',marginLeft:10}}>리셋</button>
    </>

  );
}




export default App;
