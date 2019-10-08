import React ,{useState, useEffect,useMemo, useRef,useLayoutEffect}from 'react';
import { START, PAUSE ,RESET} from '../js/constance';

const useRotateBox = ( state, box ) => {
    const thisRequestAnimationFrame = useRef(null)
    const [ pos , actionPos ] = useState(null)
    
    useLayoutEffect(()=>{
        if(state === START){
            const draw = function (time) { 
                if(!time) return null
                if( box.x + box.width > box.containerHeight || box.x < 0){
                    box.dx = -box.dx
                }
                if( box.y +  box.width > box.containerWidth || box.y < 0){
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
                thisRequestAnimationFrame.current = window.requestAnimationFrame(draw)
            }
            thisRequestAnimationFrame.current= window.requestAnimationFrame(draw)
        
        }else if(state === PAUSE){
            window.cancelAnimationFrame(thisRequestAnimationFrame.current)
            thisRequestAnimationFrame.current = null
            
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
            window.cancelAnimationFrame(thisRequestAnimationFrame.current)
            thisRequestAnimationFrame.current = null
        }

        
        return ()=>{
            window.cancelAnimationFrame(thisRequestAnimationFrame.current)
            thisRequestAnimationFrame.current = null
        }
    },[state,box])

    return pos
};

export default useRotateBox;