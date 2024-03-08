import modalContext from "./Context";

function Provider({value, children}){
    return (
        <modalContext.Provider value={value}>
            {
                children
            }
        </modalContext.Provider>
    )
}

export default Provider;