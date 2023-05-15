export type LinkProps={
    pathname: string;
    label: string ;
    onClick : ()=>void
}

export function Link(props: LinkProps){
    return (
        <a href={props.pathname} onClick={(event)=>{
            event.preventDefault();
            props.onClick()
        }}> 
        {props.label}
        </a>
    )
}