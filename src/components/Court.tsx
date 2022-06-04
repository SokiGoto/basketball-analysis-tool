import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link , useHistory } from "react-router-dom";
import { LoginInfo } from "../interfaces";
import { auth } from "../Firebase";
import { updatePassword } from "firebase/auth";

import court from "../images/court.jpg"


//円を描くコンポーネント
const Circle:React.FC<{ x: number, y: number, color: string}> = (pops) => {
	return (
		<circle cx={pops.x} cy={pops.y} r="1" fill={pops.color} />
	);
}

//画像を表示するコンポーネント
//クリックされたら、された座標に画像を表示する
const CourtComponent: React.VFC<{ readonly: boolean, GoalorNot: string}> = ({readonly, GoalorNot}) => {
	const [GoalPoint, setGoalPoint] = useState<number[][]>([[10, 10]]);
	const [NotGoalPoint, setNotGoalPoint] = useState<number[][]>([]);


	const onClick = (e: any) => {
		console.log(e.clientX, e.clientY);
	}

    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg = event.currentTarget
        const pt = svg.createSVGPoint()
        
        pt.x = event.clientX
        pt.y = event.clientY
        
        const ctm = svg.getScreenCTM()
        if (ctm) {
            const cursorPt = pt.matrixTransform(ctm.inverse())
            if (GoalorNot === "Goal") {
                setGoalPoint([...GoalPoint, [cursorPt.x, cursorPt.y]]);
            } else if (GoalorNot === "NotGoal") {
		        setNotGoalPoint([...NotGoalPoint, [cursorPt.x, cursorPt.y]]);
            }
            console.log(cursorPt.x, cursorPt.y);
        }
    }

    if (readonly) {
	    return (
		    <svg id="svg" width="100%" height="100%" viewBox="0 0 100 70">
		        <rect x="0" y="0" width="100" height="70" stroke="black" strokeWidth="1" fill="white"/>
                {GoalPoint.map((coor, index) => {
                    return <Circle x={coor[0]} y={coor[1]} color={"red"} />
                })}
                {NotGoalPoint.map((coor, index) => {
                    return <Circle x={coor[0]} y={coor[1]} color={"blue"} />
                })}
		    </svg>
        );
    } else {
        return (
            <svg id="svg" width="100%" height="100%" viewBox="0 0 100 70" onClick={handleClick}>
                <rect x="0" y="0" width="100" height="70" stroke="black" strokeWidth="1" fill="white"/>
                {GoalPoint.map((coor, index) => {
                    return <Circle x={coor[0]} y={coor[1]} color={"red"} />
                })}
                {NotGoalPoint.map((coor, index) => {
                    return <Circle x={coor[0]} y={coor[1]} color={"blue"} />
                })}
            </svg>
        );
    }
}

export default CourtComponent;

