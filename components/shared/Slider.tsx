import { ChangeEventHandler, TouchEventHandler } from "react";

// Props
type Props = {
    min: number,
    max: number,
    step?: number,
    value: number,
    handleChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    handleTouch?: TouchEventHandler<HTMLInputElement> | undefined
}

export const Slider = ({
    min = 1, // default values
    max = 10, // default values
    step = 1, // default values
    value,
    handleChange,
    handleTouch,
}: Props) => {

    return (
        <div className="slider">
            <input id="slider"
                type="range"
                min={min}
                max={max}
                value={value}
                step={step}
                onChange={handleChange}
                onTouchEnd={handleTouch}
            />
        </div>
    );
}