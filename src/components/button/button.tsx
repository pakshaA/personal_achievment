import { ReactNode } from "react"
import Style from './button.module.scss'

interface IButton {
    children: ReactNode;
    onClick: any
}

export const ButtonCustom = ({children, onClick }: IButton) => {
    return (
        <div className={Style.button} onClick={onClick}>
            {children}
        </div>
    )
}