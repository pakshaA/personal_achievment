import { ReactNode } from "react"
import Style from './button.module.scss'

interface IButton {
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const ButtonCustom = ({children, onClick }: IButton) => {
    return (
        <div className={Style.button} onClick={onClick}>
            {children}
        </div>
    )
}