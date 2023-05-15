import { Link } from "./Link"

type NavBarProps = {
    onClickHome : () => void,
    onClickCategory : () => void,
    onClickProduct : () => void,
}

export function NavBar(props : NavBarProps){
    const linkHome = Link({
        pathname : "/home",
        label : "Home",
        onClick: props.onClickHome
    })
    const linkCategory = Link({
        pathname : "/category",
        label : "Category",
        onClick: props.onClickCategory
    })
    const linkProduct = Link({
        pathname : "/product",
        label: "Product",
        onClick: props.onClickProduct
    })
    return(
        <div>
            {linkHome}
            <span> | </span>
            {linkCategory}
            <span> | </span>
            {linkProduct}
        </div>
    )
}