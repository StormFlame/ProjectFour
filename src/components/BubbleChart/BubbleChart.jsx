import React from 'react';
import * as d3 from 'd3';

export default function BubbleChart({width, height, radius}){
    return(
        <svg>
            <circle 
                cx={width}
                cy={height}
                r={radius}
                fill="blue"
            />
        </svg>
    )
}