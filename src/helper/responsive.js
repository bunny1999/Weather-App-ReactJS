export const isPortrait=()=>{
    return window.addEventListener('resize',()=>{
        if(window.innerWidth<=525){
            return true;
        }else{
            return false;
        }
    })
    
}