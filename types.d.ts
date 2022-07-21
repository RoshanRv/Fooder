export interface PizzaList{
    _id:string,
    title:string,
    img:string,
    desc:string,
    prices:[number,number,number]
}

export interface CartData{
    product:string,
    name:string,
    price:number,
    quantity:number,
    total:number
}