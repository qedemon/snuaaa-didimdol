export default function buildComponent(Component, className){
    return Component?
        Array.isArray(Component)?
            Component.map(
                (C, index)=>{
                    return (
                        <C className={className}/>
                    )
                }
            )
            :
            (<Component className={className}/>)
        :
        (<></>)
}