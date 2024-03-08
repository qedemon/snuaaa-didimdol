class ModalController{
    setSetChildren(setChildren){
        this._setChildren=setChildren;
    }
    setSetOpen(setOpen){
        this.setOpen=setOpen;
    }
    setChildren(children){
        this._setChildren&&this._setChildren(()=>children);
    }
    open(){
        this.setOpen && this.setOpen(true);
    }
    close(){
        this.setOpen && this.setOpen(false);
    }
}

export default ModalController;