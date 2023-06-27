import "@/styles/sass/_slider.scss"
import { useEffect, useRef, useState } from "react"
import Scene from "../atoms/globe1/scene"

export default function Slider() {

    // active inEffect outEffect
    const sliderRef = useRef(null)

    // Initial states
    const [active, setActive] = useState(1)
    const [totalSections, setTotalSections] = useState(null)

    useEffect(() => {
        
        sliderRef.current.addEventListener("wheel", handleSlidePage)

        totalSections === null ? setTotalSections(sliderRef.current.childElementCount) : ""
        console.log(totalSections);
        
        return () => {

            sliderRef.current.removeEventListener("wheel", handleSlidePage)
        }
    }, [active, totalSections])

    const handleSlidePage = (e) => {

        const delta = e.deltaY

        if (delta < 0) {

            setTimeout(() => {

                if (active > 1) {
                    setActive(active - 1)
                } else {
                    setActive(totalSections)
                }
            }, 600)
        }

        if (delta > 0) {

            setTimeout(() => {

                if (active < totalSections) {
                    setActive(active + 1)
                } else {
                    setActive(1)
                }

            }, 600)
        }
    };

    return(
        <ul className="slider" ref={sliderRef}>
            <li className={`slider--section ${active === 1 ? "active inEffect" : "outEffect"}`}>
                <Scene />
            </li>
            <li className={`slider--section ${active === 2 ? "active inEffect": "outEffect"}`}>Section 2 - {active}</li>
            <li className={`slider--section ${active === 3 ? "active inEffect": "outEffect"}`}>Section 3 - {active}</li>
            {/* <li className={`slider--section ${active === 4 ? "active inEffect": "outEffect"}`}>Section 4 - {active}</li> */}
        </ul>
    )
}