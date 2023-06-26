"use client"

import Slider from "@/components/containers/slider"
import { useStore } from "@/stores/useStore"

export default function Main({ params }) {

    const lang = params.lang
    const bears = useStore((state) => state.bears)

    return (
        <div className="main">
            <Slider />
        </div>
    )
}