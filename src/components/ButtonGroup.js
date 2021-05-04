import { useState } from 'react'
const ButtonGroup = ({ buttons, buttonClickHandler }) => {
    const [clickedId, setClickedId] = useState(-1);
    const handleClick = (event, id) => {
        setClickedId(id);
        buttonClickHandler(event);
    };
    return (
        <div className="groupButtons">
            {buttons.map((buttonLabel, i) => (
                <button
                    key={i}
                    name={buttonLabel}
                    onClick={(event) => handleClick(event, i)}
                    className={i === clickedId ? "customButton active" : "customButton"}
                >
                    {buttonLabel}
                </button>
            ))}
        </div>
    );
};

export default ButtonGroup;