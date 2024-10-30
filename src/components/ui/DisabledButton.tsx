import { Tooltip } from "@mui/material";
import { FC } from "react";
import { FaLock } from "react-icons/fa";

export const DisabledButton: FC<{ text: string }> = ({ text }) => {
    return (
        <Tooltip title="You must log in to see this section">
            <div
                role="button"
                tabIndex={0}
                className="nav-link disabled-button"
                style={{ cursor: 'not-allowed', opacity: 0.6 }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                    }
                }}
            >
                <FaLock /> {text}
            </div>
        </Tooltip>
    );
};
