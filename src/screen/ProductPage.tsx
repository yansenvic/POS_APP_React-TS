import { NavBar } from "../component/NavBar"

type ProductPageProps = {
    HomeClick : () => void,
    CategoryClick : () => void,
    ProductClick : () => void,
}

export function ProductPage (props : ProductPageProps ) {
    const navBar = NavBar({
        onClickHome : props.HomeClick,
        onClickCategory: props.CategoryClick,
        onClickProduct : props.ProductClick
    })

    return (
            <div>
                {navBar}
                <p>Welcome to Product Page</p>
            </div>
        
    )
}