import { Tooltip } from "@mui/material"
import { FC } from "react";
import { FaLock } from "react-icons/fa"

export const DisabledButton: FC<{ text: string }> = ({ text }) => {

    return (
        <Tooltip title="You must log in to see your feed">
            <div className="nav-link" style={{ cursor: 'pointer' }}>
                <FaLock /> {text}
            </div>
        </Tooltip>
    )
}