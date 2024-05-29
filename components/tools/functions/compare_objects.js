export default function compareObjects(obj1,obj2){
    // console.log(obj1)
    // console.log(obj2)

    if(typeof obj1 !=='object' || typeof obj2 !=='object'){
        return false
    }

    var props1= Object?.getOwnPropertyNames(obj1 || {})
    // var props2= Object?.getOwnPropertyNames(obj2 || {})

    // if(props1.length != props2.length) {return false;}
    
    for(var i =0; i<props1.length;i++){
        var propName= props1[i];
        // if([null, []].includes(obj1[propName] ==null) && [null, []].includes(obj2[propName] ==null)){
        //     continue;
        // }
        if(obj1 ==null || obj2==null){
            if(obj1===null && obj2===null){
                continue;
            }else{
                console.log('aqui')
                return false;
            }
        }
        if(typeof obj1[propName] ==='object' && typeof obj2[propName] ==='object' ){

            if(obj1[propName]?.length>0 && obj2[propName]?.length>0 ){
                if(!obj1[propName] || !obj2[propName]){
                    console.log('aqui')
                    return false;
                }
                if(obj1[propName].every(i=>{
                    if(typeof i !=='object'){
                    obj2[propName]?.includes(i)
                    }
                })){

                    continue;
                }else{
                    console.log('aqui')
                    return false;
                }
            }else{
                if(obj2[propName]==null || obj2[propName].length===0){
                    continue;
                }
                console.log('aqui')
                return false
            }
            
            
        }
        if(obj1[propName] && obj2[propName]){
            if(obj1[propName] !== obj2[propName]){
                console.log('aqui')
                return false;
            }
        }
    }

    return true;
}