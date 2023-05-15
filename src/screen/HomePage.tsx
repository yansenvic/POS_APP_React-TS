import { NavBar } from "../component/NavBar"

type HomePageProps = {
    HomeClick : () => void,
    CategoryClick : () => void,
    ProductClick : () => void,
}

export function HomePage (props : HomePageProps ) {
    const navBar = NavBar({
        onClickHome : props.HomeClick,
        onClickCategory: props.CategoryClick,
        onClickProduct : props.ProductClick
    })

    return (
            <div>
                {navBar}
                <p>Welcome to Home Page</p>
            </div>
        
    )
}