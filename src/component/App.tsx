import { useEffect, useState } from "react";
import { HomePage } from "../screen/HomePage";
import { CategoryPage} from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";


export function App(){
    const [path,setPath] = useState(window.location.pathname)
    useEffect(() =>{
        history.pushState(null,"",path)
    },[path])

    const onClickHome = () => setPath("/home")
    const onClickProduct = () => setPath("/product")
    const onClickCategory = () => setPath("/category")

    const homePage = HomePage({
        HomeClick : onClickHome,
        CategoryClick : onClickCategory,
        ProductClick : onClickProduct,
    })
    const categoryPage = CategoryPage({
        HomeClick : onClickHome,
        CategoryClick : onClickCategory,
        ProductClick : onClickProduct,
    })
    const productPage =ProductPage({
        HomeClick : onClickHome,
        CategoryClick : onClickCategory,
        ProductClick : onClickProduct,
    })
    
    if(path === "/home"){
        return homePage
    } else if (path === "/category"){
        return categoryPage
    } else if (path === "/product"){
        return productPage
    } else return homePage
}