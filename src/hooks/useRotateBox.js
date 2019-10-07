import React ,{useState, useEffect,useMemo, useRef}from 'react';
import { START, PAUSE ,RESET} from '../js/constance';

const useRotateBox = ( state, box ) => {
    const thisReq = useRef(null)

    const [ pos , actionPos ] = useState(null)
    
    useMemo(()=>{
        // console.log(box)
        if(state === START){
            const draw = function (time) { 
                if(!time) return null
                if( box.x + 50 > box.containerHeight || box.x < 0){
                    box.dx = -box.dx
                }
                if( box.y + 50 > box.containerWidth || box.y < 0){
                    box.dy = -box.dy
                }
                box.x += box.dx
                box.y += box.dy
                actionPos(
                    c => ({
                        ...c,
                        top : box.x,
                        left : box.y,
                        width : box.width,
                        height : box.height,
                    })
                )
                thisReq.current = window.requestAnimationFrame(draw)
            }
            thisReq.current= window.requestAnimationFrame(draw)
        
        }else if(state === PAUSE){
            window.cancelAnimationFrame(thisReq.current)
            thisReq.current = null
        }else if(state === RESET){
            actionPos(
                c => ({
                    ...c,
                    top : box.x,
                    left : box.y,
                    width : box.width,
                    height : box.height,
                })
            )
            window.cancelAnimationFrame(thisReq.current)
            thisReq.current = null
        }
        return ()=>{
            window.cancelAnimationFrame(thisReq.current)
            thisReq.current = null
        }
    },[state,box])

    return pos
};

export default useRotateBox;