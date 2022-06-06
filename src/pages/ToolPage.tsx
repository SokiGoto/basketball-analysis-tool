import React, { useState, useEffect} from "react";
//import { Box, Grid } from "@mui/material";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link , useHistory } from "react-router-dom";
import { updatePassword } from "firebase/auth";

import { LoginInfo, Point, Game } from "../interfaces";
import { auth, db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore"

interface Props {
    logininfo: LoginInfo;
    point: Point;
}


const height: number = 53.571
const width : number = 100
const tpl   : number = 24.107
const tpls  : number = 3.214
const tplsw : number = 10.7
const gbw   : number = 20.714
const gbh   : number = 17.5
const goal  : number = 5.625
const circle: number = 6.429


const ToolPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    // const [Edit, setEdit] = useState(true);
    
    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");

    
    const [Point, setPoint] = useState<any[][]>([]);
    const [GoalorNot, setGoalorNot] = useState("Goal");
    const [GoalRate, setGoalRate] = useState(0);
    const [Goal, setGoal] = useState(0);
    const [NotGoal, setNotGoal] = useState(0);

    const [FGPA, setFGPA] = useState(0);
    const [FGPB, setFGPB] = useState(0);
    const [FGMA, setFGMA] = useState(0);
    const [FGMB, setFGMB] = useState(0);
    const [FG2MA, setFG2MA] = useState(0);
    const [FG2MB, setFG2MB] = useState(0);
    const [FG3MA, setFG3MA] = useState(0);
    const [FG3MB, setFG3MB] = useState(0);
    const [FGAA, setFGAA] = useState(0);
    const [FGAB, setFGAB] = useState(0);
    const [FG2AA, setFG2AA] = useState(0);
    const [FG2AB, setFG2AB] = useState(0);
    const [FG3AA, setFG3AA] = useState(0);
    const [FG3AB, setFG3AB] = useState(0);
    const [FTMA, setFTMA] = useState(0);
    const [FTAA, setFTAA] = useState(0);
    const [FTMB, setFTMB] = useState(0);
    const [FTAB, setFTAB] = useState(0);
    const [FOULA, setFOULA] = useState(0);
    const [FOULB, setFOULB] = useState(0);
    const [BSA, setBSA] = useState(0);
    const [BSB, setBSB] = useState(0);
    const [TOA, setTOA] = useState(0);
    const [TOB, setTOB] = useState(0);
    const [ASSISTA, setASSISTA] = useState(0);
    const [ASSISTB, setASSISTB] = useState(0);
    const [STEALA, setSTEALA] = useState(0);
    const [STEALB, setSTEALB] = useState(0);
    const [REBOUND_DA, setREBOUND_DA] = useState(0);
    const [REBOUND_OA, setREBOUND_OA] = useState(0);
    const [REBOUND_DB, setREBOUND_DB] = useState(0);
    const [REBOUND_OB, setREBOUND_OB] = useState(0);


    useEffect(() => {
        var Goal = 0;
        var NotGoal = 0;
        var FGPA_tmp = 0;
        var FGPB_tmp = 0;
        var FGMA_tmp = 0;
        var FGAA_tmp = 0;
        var FGMB_tmp = 0;
        var FGAB_tmp = 0;
        var FG2MA_tmp = 0;
        var FG2AA_tmp = 0;
        var FG2MB_tmp = 0;
        var FG2AB_tmp = 0;
        var FG3MA_tmp = 0;
        var FG3AA_tmp = 0;
        var FG3MB_tmp = 0;
        var FG3AB_tmp = 0;

        Point.map((point, index) => {
            point[2] === "red" ? Goal++ : NotGoal++;
            if (point[0] < 50) {
                if (point[3] === 3){
                    if (point[2] === "red"){
                        FGMA_tmp++;
                        FG3MA_tmp++;
                        FGPA_tmp=FGPA_tmp+3;
                    }
                    FGAA_tmp++;
                    FG3AA_tmp++;
                } else if (point[3] === 2){
                    if (point[2] === "red"){
                        FGMA_tmp++;
                        FG2MA_tmp++;
                        FGPA_tmp=FGPA_tmp+2;
                    }
                    FGAA_tmp++;
                    FG2AA_tmp++;
                }
            } else {
                if (point[3] === 3){
                    if (point[2] === "red"){
                        FGMB_tmp++;
                        FG3MB_tmp++;
                        FGPB_tmp=FGPB_tmp+3;
                    }
                    FGAB_tmp++;
                    FG3AB_tmp++;
                } else if (point[3] === 2){
                    if (point[2] === "red"){
                        FGMB_tmp++;
                        FG2MB_tmp++;
                        FGPB_tmp=FGPB_tmp+2;
                    }
                    FGAB_tmp++;
                    FG2AB_tmp++;
                }
            }
        });
        setGoalRate(Goal/(Goal+NotGoal)*100);
        setGoal(Goal);
        setNotGoal(NotGoal);
        setFGPA(FGPA_tmp);
        setFGPB(FGPB_tmp);
        setFGMA(FGMA_tmp);
        setFGAA(FGAA_tmp);
        setFGMB(FGMB_tmp);
        setFGAB(FGAB_tmp);
        setFG2MA(FG2MA_tmp);
        setFG2AA(FG2AA_tmp);
        setFG2MB(FG2MB_tmp);
        setFG2AB(FG2AB_tmp);
        setFG3MA(FG3MA_tmp);
        setFG3AA(FG3AA_tmp);
        setFG3MB(FG3MB_tmp);
        setFG3AB(FG3AB_tmp);
    }, [Point]);

	

    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg = event.currentTarget
        const pt = svg.createSVGPoint()
        
        pt.x = event.clientX
        pt.y = event.clientY

        
        const ctm = svg.getScreenCTM()
        if (ctm) {
            const cursorPt = pt.matrixTransform(ctm.inverse())
            console.log(cursorPt.x, cursorPt.y);
            if (cursorPt.x > 50) {
                var color: string = ""
                var point: number = 3
                if ((cursorPt.x - (width - goal))**2 + (cursorPt.y - height/2)**2 <= tpl**2
                    && cursorPt.x <= width - tplsw
                    || cursorPt.x > width-tplsw 
                    && cursorPt.x < width 
                    && cursorPt.y > tpls 
                    && cursorPt.y < height - tpls){
                    point = 2
                }
                if (GoalorNot === "Goal") {
                    color = "red"
                } else if (GoalorNot === "NotGoal") {
                    color = "blue"
                }
                setPoint([...Point, [cursorPt.x, cursorPt.y, color, point]])
                console.log("=>", cursorPt.x, cursorPt.y, color, point)
            } else {
                var color: string = ""
                var point: number = 3
                if ((cursorPt.x - goal)**2 + (cursorPt.y - height/2)**2 <= tpl**2
                    && cursorPt.x >= tplsw
                    || cursorPt.x > 0
                    && cursorPt.x < tplsw
                    && cursorPt.y > tpls
                    && cursorPt.y < height - tpls){
                    point = 2
                }
                if (GoalorNot === "Goal") {
                    color = "red"
                } else if (GoalorNot === "NotGoal") {
                    color = "blue"
                }
                setPoint([...Point, [cursorPt.x, cursorPt.y, color, point]])
                console.log("<=", cursorPt.x, cursorPt.y, color, point)
            }
        }
    }
    
    const onGoal = () => {
        setGoalorNot("Goal");
    }

    const onNotGoal = () => {
        setGoalorNot("NotGoal");
    }

    const onBack = () => {
        setPoint(
            Point.filter((point, index) => (index !== Point.length - 1))
        );
    }

    const onClear = () => {
        setPoint([]);
        setFGPA(0);
        setFGPB(0);
        setFTMA(0);
        setFTMB(0);
        setFTAA(0);
        setFTAB(0);

        setFOULA(0);
        setFOULB(0);
        setASSISTA(0);
        setASSISTB(0);
        setSTEALA(0);
        setSTEALB(0);
        setBSA(0);
        setBSB(0);
        setTOA(0);
        setTOB(0);

        setREBOUND_DA(0);
        setREBOUND_DB(0);
        setREBOUND_OA(0);
        setREBOUND_OB(0);
    }

    const onCnt = (e: any) => {
        const id = e.currentTarget.id;
        console.log(id);
        if (id === "foulAM") {
            setFOULA(Math.max(FOULA - 1, 0));
        } else if (id === "foulAP") {
            setFOULA(FOULA + 1);
        } else if (id === "foulBM") {
            setFOULB(Math.max(FOULB - 1, 0));
        } else if (id === "foulBP") {
            setFOULB(FOULB + 1);
        } else if (id === "bsAM") {
            setBSA(Math.max(BSA - 1, 0));
        } else if (id === "bsAP") {
            setBSA(BSA + 1);
        } else if (id === "bsBM") {
            setBSB(Math.max(BSB - 1, 0));
        } else if (id === "bsBP") {
            setBSB(BSB + 1);
        } else if (id === "toAM") {
            setTOA(Math.max(TOA - 1, 0));
        } else if (id === "toAP") {
            setTOA(TOA + 1);
        } else if (id === "toBM") {
            setTOB(Math.max(TOB - 1, 0));
        } else if (id === "toBP") {
            setTOB(TOB + 1);
        } else if (id === "ftMAM") {
            setFTMA(Math.max(FTMA - 1, 0));
        } else if (id === "ftMAP") {
            setFTMA(FTMA + 1);
        } else if (id === "ftMBM") {
            setFTMB(Math.max(FTMB - 1, 0));
        } else if (id === "ftMBP") {
            setFTMB(FTMB + 1);
        } else if (id === "ftAAM") {
            setFTAA(Math.max(FTAA - 1, 0));
        } else if (id === "ftAAP") {
            setFTAA(FTAA + 1);
        } else if (id === "ftABM") {
            setFTAB(Math.max(FTAB - 1, 0));
        } else if (id === "ftABP") {
            setFTAB(FTAB + 1);
        } else if (id === "assistAM") {
            setASSISTA(Math.max(ASSISTA - 1, 0));
        } else if (id === "assistAP") {
            setASSISTA(ASSISTA + 1);
        } else if (id === "assistBM") {
            setASSISTB(Math.max(ASSISTB - 1, 0));
        } else if (id === "assistBP") {
            setASSISTB(ASSISTB + 1);
        } else if (id === "stealAM") {
            setSTEALA(Math.max(STEALA - 1, 0));
        } else if (id === "stealAP") {
            setSTEALA(STEALA + 1);
        } else if (id === "stealBM") {
            setSTEALB(Math.max(STEALB - 1, 0));
        } else if (id === "stealBP") {
            setSTEALB(STEALB + 1);
        } else if (id === "reboundDAM") {
            setREBOUND_DA(Math.max(REBOUND_DA - 1, 0));
        } else if (id === "reboundDAP") {
            setREBOUND_DA(REBOUND_DA + 1);
        } else if (id === "reboundOAM") {
            setREBOUND_OA(Math.max(REBOUND_OA - 1, 0));
        } else if (id === "reboundOAP") {
            setREBOUND_OA(REBOUND_OA + 1);
        } else if (id === "reboundDBM") {
            setREBOUND_DB(Math.max(REBOUND_DB - 1, 0));
        } else if (id === "reboundDBP") {
            setREBOUND_DB(REBOUND_DB + 1);
        } else if (id === "reboundOBM") {
            setREBOUND_OB(Math.max(REBOUND_OB - 1, 0));
        } else if (id === "reboundOBP") {
            setREBOUND_OB(REBOUND_OB + 1);
        } else {
            console.log("error");
        }

    }



    const Coat:React.VFC<{Edit: boolean}> = ({Edit}) => {
        if (Edit){
            return (
                <svg id="coart" width="100%" height="100%" viewBox={`0 0 100 ${height}`} onClick={handleClick}>
                    {/* harf coart
                    <rect x="0.5" y="0" width="99" height="100" fill="#AB5239"/>
                    <line x1="0.5" y1="0" x2="99.5" y2="0" stroke="#000" strokeWidth="0.5"/>
                    <line x1="0.5" y1="0" x2="0.5" y2="99" stroke="#000" strokeWidth="0.5"/>
                    <line x1="99.5" y1="0" x2="99.5" y2="99" stroke="#000" strokeWidth="0.5"/>
                    <line x1="0.5" y1="93" x2="99.5" y2="93" stroke="#000" strokeWidth="0.5"/>
                    <path d="M 93.5,0 L 93.5,20 A 45,45 0 0,1 6.5,20 L6.5,0z" fill="#AB5239" stroke="black" strokeWidth="0.5" />
                    <circle cx="50" cy="93" r="12" fill="none" strokeWidth="0.5" stroke="#000"/>
                    <rect x="33.7" y="0" width="32.7" height="38.7" stroke="black" strokeWidth="0.5" fill="none"/>
                    <path d="M 50,38.75 L62,38.75 A 12,12 0 0,1 38,38.75z" fill="none"stroke="black" strokeWidth="0.5" />
                    */}
                    <rect x="0" y="0" width={width} height={height} fill="#AB5239"/>
                    <line x1="0" y1="0" x2="0" y2={height} stroke="#000" strokeWidth="1"/>
                    <line x1={width} y1="0" x2={width} y2={height} stroke="#000" strokeWidth="1"/>
                    <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth="1"/>
                    <line x1="0" y1={height} x2={width} y2={height} stroke="#000" strokeWidth="1"/>
                    {/*center line and center circle*/}
                    <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="#000" strokeWidth="0.5"/>
                    <circle cx={width/2} cy={height/2} r={circle} stroke="#000" strokeWidth="0.5" fill="none"/>
                    
                    {/*left coart*/}
                    <rect
                        x="0" y={(height - gbh)/2}
                        width={gbw} height={gbh}
                        stroke="#000" strokeWidth="0.5"
                        fill="none" 
                    />
                    <path 
                        d={`M${gbw},${height/2}
                            L${gbw},${height/2-circle}
                            A${circle},${circle} 0 0,1 
                            ${gbw},${height/2 + circle}z`}
                        fill="#AB5239"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    <path
                        d={`M0,${tpls}
                            L${tplsw},${tpls}
                            A${tpl},${tpl} 0 0,1
                            ${tplsw},${height-tpls}
                            L0,${height-tpls}z`}
                        fill="none"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    {/*right coart*/}
                    <rect
                        x={width - gbw} y={(height - gbh)/2}
                        width={gbw} height={gbh}
                        stroke="#000" strokeWidth="0.5"
                        fill="none" 
                    />
                    <path 
                        d={`M${width-gbw},${height/2}
                            L${width-gbw},${height/2-circle}
                            A${circle},${circle} 0 0,0 
                            ${width-gbw},${height/2 + circle}z`}
                        fill="#AB5239"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    <path
                        d={`M${width},${tpls}
                            L${width-tplsw},${tpls}
                            A${tpl},${tpl} 0 0,0
                            ${width-tplsw},${height-tpls}
                            L${width},${height-tpls}z`}
                        fill="none"
                        stroke="black"
                        strokeWidth="0.5"
                    />

                    {/*
                    <path d="M 94,18 a 45 45 10 0 1 -88,0" fill="none" stroke="black"/>
                    <path d="M 95,10 a 45 45 0 0 1 -90,0" fill="none" stroke="black"/>
                    <path d=" M50,10.5 L90,0 A45,45 0 1,1 9,0z" fill="none" stroke="black" strokeWidth="0.5"/>
                    <path d="M 6,0 L 6,20  A 45,45 0 0,1 90,20 z" stroke="black" strokeWidth="0.5"/>
                    */}


                    {Point.map((coor, index) => {
                        return <circle cx={coor[0]} cy={coor[1]} r="1" fill={coor[2]} />
                    })}
                </svg>
            )

        } else {
            return (
                <svg id="coart" width="100%" height="100%" viewBox={`0 0 100 ${height}`}>
                    {/* harf coart
                    <rect x="0.5" y="0" width="99" height="100" fill="#AB5239"/>
                    <line x1="0.5" y1="0" x2="99.5" y2="0" stroke="#000" strokeWidth="0.5"/>
                    <line x1="0.5" y1="0" x2="0.5" y2="99" stroke="#000" strokeWidth="0.5"/>
                    <line x1="99.5" y1="0" x2="99.5" y2="99" stroke="#000" strokeWidth="0.5"/>
                    <line x1="0.5" y1="93" x2="99.5" y2="93" stroke="#000" strokeWidth="0.5"/>
                    <path d="M 93.5,0 L 93.5,20 A 45,45 0 0,1 6.5,20 L6.5,0z" fill="#AB5239" stroke="black" strokeWidth="0.5" />
                    <circle cx="50" cy="93" r="12" fill="none" strokeWidth="0.5" stroke="#000"/>
                    <rect x="33.7" y="0" width="32.7" height="38.7" stroke="black" strokeWidth="0.5" fill="none"/>
                    <path d="M 50,38.75 L62,38.75 A 12,12 0 0,1 38,38.75z" fill="none"stroke="black" strokeWidth="0.5" />
                    */}
                    <rect x="0" y="0" width={width} height={height} fill="#AB5239"/>
                    <line x1="0" y1="0" x2="0" y2={height} stroke="#000" strokeWidth="1"/>
                    <line x1={width} y1="0" x2={width} y2={height} stroke="#000" strokeWidth="1"/>
                    <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth="1"/>
                    <line x1="0" y1={height} x2={width} y2={height} stroke="#000" strokeWidth="1"/>
                    {/*center line and center circle*/}
                    <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="#000" strokeWidth="0.5"/>
                    <circle cx={width/2} cy={height/2} r={circle} stroke="#000" strokeWidth="0.5" fill="none"/>
                    
                    {/*left coart*/}
                    <rect
                        x="0" y={(height - gbh)/2}
                        width={gbw} height={gbh}
                        stroke="#000" strokeWidth="0.5"
                        fill="none" 
                    />
                    <path 
                        d={`M${gbw},${height/2}
                            L${gbw},${height/2-circle}
                            A${circle},${circle} 0 0,1 
                            ${gbw},${height/2 + circle}z`}
                        fill="#AB5239"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    <path
                        d={`M0,${tpls}
                            L${tplsw},${tpls}
                            A${tpl},${tpl} 0 0,1
                            ${tplsw},${height-tpls}
                            L0,${height-tpls}z`}
                        fill="none"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    {/*right coart*/}
                    <rect
                        x={width - gbw} y={(height - gbh)/2}
                        width={gbw} height={gbh}
                        stroke="#000" strokeWidth="0.5"
                        fill="none" 
                    />
                    <path 
                        d={`M${width-gbw},${height/2}
                            L${width-gbw},${height/2-circle}
                            A${circle},${circle} 0 0,0 
                            ${width-gbw},${height/2 + circle}z`}
                        fill="#AB5239"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    <path
                        d={`M${width},${tpls}
                            L${width-tplsw},${tpls}
                            A${tpl},${tpl} 0 0,0
                            ${width-tplsw},${height-tpls}
                            L${width},${height-tpls}z`}
                        fill="none"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    {Point.map((coor, index) => {
                        return <circle cx={coor[0]} cy={coor[1]} r="1" fill={coor[2]} />
                    })}
                </svg>
            )
        }
    }

    const Counter = () => {
        return (
            <Col>
                <Row>
                    {/*
                    <Col>
                        <Row>
                        <div className="background2">
                            <Col><span className="label"></span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                    */}
                    <Col>
                        <Row>
                        <div className="background1">
                            <Col><span className="label">FOUL</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="foulAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {FOULA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="foulAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="foulBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {FOULB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="foulBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                        <div className="background2">
                            <Col><span className="label">ASSIST</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="assistAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {ASSISTA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="assistAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="assistBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {ASSISTB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="assistBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                        <div className="background1">
                            <Col><span className="label">STEAL</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="stealAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {STEALA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="stealAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="stealBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {STEALB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="stealBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                        <div className="background2">
                            <Col><span className="label">FT</span></Col>
                            <Col><span>A</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">M</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                    {FTMA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftAAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {FTAA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftAAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <span className="AB">B</span>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">M</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {FTMB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftABM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {FTAB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftABP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                        <div className="background1">
                            <Col><span className="label">REBOUND</span></Col>
                            <Col><span>A</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">D</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundDAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {REBOUND_DA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundDAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">O</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundOAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {REBOUND_OA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundOAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <span className="AB">B</span>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">D</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundDBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {REBOUND_DB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundDBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">O</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundOBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {REBOUND_OB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="reboundOBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                        <div className="background2">
                            <Col><span className="label">BLOCK SCHOT</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="bsAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {BSA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="bsAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="bsBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {BSB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="bsBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                        <Row>
                        <div className="background1">
                            <Col><span className="label">TURN OVER</span></Col>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">A</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="toAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {TOA}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="toAP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                            <Row className="p-1">
                                <Col className="mx-0 px-1">
                                    <span className="AB">B</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="toBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {TOB}
                                    </span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="toBP"
                                    className="square-button"
                                    onClick={onCnt}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }

    const Result = () => {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>PTS</th>
                        <th>FG</th>
                        <th>3FG</th>
                        <th>2FG</th>
                        <th>FT</th>
                        <th>FOUL</th>
                        <th>REBOUND</th>
                        <th>ASSIST</th>
                        <th>STEAL</th>
                        <th>BS</th>
                        <th>TO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A</td>
                        <td>{FGPA + FTMA}</td>
                        <td>M : {FGMA}<br/>A : {FGAA}<br/>{(FGMA/FGAA*100).toFixed(0)}%</td>
                        <td>M : {FG3MA}<br/>A : {FG3AA}<br/>{(FG3MA/FG3AA*100).toFixed(0)}%</td>
                        <td>M : {FG2MA}<br/>A : {FG2AA}<br/>{(FG2MA/FG2AA*100).toFixed(0)}%</td>
                        <td>M : {FTMA}<br/>A : {FTAA+FTMA}<br/>{(FTMA/(FTAA+FTMA)*100).toFixed(0)}%</td>
                        <td>{FOULA}</td>
                        <td>DIF : {REBOUND_DA}<br/>OFF : {REBOUND_OA}<br/>Total : {REBOUND_DA+REBOUND_OA}</td>
                        <td>{ASSISTA}</td>
                        <td>{STEALA}</td>
                        <td>{BSA}</td>
                        <td>{TOA}</td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td>{FGPB + FTMB}</td>
                        <td>M : {FGMB}<br/>A : {FGAB}<br/>{(FGMB/FGAB*100).toFixed(0)}%</td>
                        <td>M : {FG3MB}<br/>A : {FG3AB}<br/>{(FG3MB/FG3AB*100).toFixed(0)}%</td>
                        <td>M : {FG2MB}<br/>A : {FG2AB}<br/>{(FG2MB/FG2AB*100).toFixed(0)}%</td>
                        <td>M : {FTMB}<br/>A : {FTAB+FTMB}<br/>{(FTMB/(FTAB+FTMB)*100).toFixed(0)}%</td>
                        <td>{FOULB}</td>
                        <td>DIF : {REBOUND_DB}<br/>OFF : {REBOUND_OB}<br/>Total : {REBOUND_DB+REBOUND_OB}</td>
                        <td>{ASSISTB}</td>
                        <td>{STEALB}</td>
                        <td>{BSB}</td>
                        <td>{TOB}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    const Result2 = () => {
        return (
            <Table striped bordered>
            	<thead>
            		<tr>
            			<th>Team</th>
            			<th>PPP</th>
            			<th>POSS</th>
            			<th>eFG%</th>
                        <th>TO%</th>
                        <th>FTR</th>
                        <th>ORB%</th>
                        <th>DRB%</th>
                        <th>TRB%</th>
            		</tr>
            	</thead>
            	<tbody>
            		<tr>
            			<td>A:</td>
            			<td>{((FGPA+FTMA)/(FGAA+0.44*FTAA+TOA)).toFixed(3)}</td>
            			<td>{(FGAA+0.44*FTAA+TOA).toFixed(2)}</td>
            			<td>{(((FGMA+FG3MA*0.5)/FGAA)*100).toFixed(2)}%</td>
            			<td>{(TOA/(FGAA+0.44*FTAA+TOA)*100).toFixed(2)}%</td>
            			<td>{(FTAA/FGAA).toFixed(3)}</td>
            			<td>{(REBOUND_OA/(REBOUND_OA+REBOUND_DB)*100).toFixed(2)}%</td>
            			<td>{(REBOUND_DA/(REBOUND_DA+REBOUND_OB)*100).toFixed(2)}%</td>
            			<td>{((REBOUND_OA+REBOUND_DA)/(REBOUND_OA+REBOUND_DA+REBOUND_DB+REBOUND_OB)*100).toFixed(2)}%</td>
            		</tr>
            		<tr>
            			<td>B:</td>
            			<td>{((FGPB+FTMB)/(FGAB+0.44*FTAB+TOB)).toFixed(3)}</td>
            			<td>{(FGAB+0.44*FTAB+TOB).toFixed(2)}%</td>
            			<td>{((FGMB+FG3MB*0.5)/FGAB*100).toFixed(2)}%</td>
            			<td>{(TOB/(FGAB+0.44*FTAB+TOB)*100).toFixed(2)}%</td>
            			<td>{(FTAB/FGAB).toFixed(3)}</td>
            			<td>{(REBOUND_OB/(REBOUND_OB+REBOUND_DA)*100).toFixed(2)}%</td>
            			<td>{(REBOUND_DB/(REBOUND_DB+REBOUND_OA)*100).toFixed(2)}%</td>
            			<td>{((REBOUND_OB+REBOUND_DB)/(REBOUND_OA+REBOUND_DA+REBOUND_DB+REBOUND_OB)*100).toFixed(2)}%</td>
            		</tr>
            	</tbody>
            </Table>
        )
    }

	if (logininfo.state == "signin") {
		return (
			<Container>
                <Tabs>
                    <Tab eventKey="info" title="基本情報">
                        <Row className="my-1">
                            <Form>
                                <Form.Group as={Col} md="9" controlId="validationCustom04">
                                    <Form.Label>日付</Form.Label>
                                    <Form.Control type="date"/>
                                    <Form.Control.Feedback>OK!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">日付を入力してください</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicTeamName">
                                    <Form.Label>Team A</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Team A"
                                        value={teamA}
                                        onChange={(e) => setTeamA(e.target.value)}
                                    />
                                    <Form.Label>Team B</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Team B"
                                        value={teamB}
                                        onChange={(e) => setTeamB(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q1" title="Q1">
				        <Row className="gap-1">
                            <Coat Edit={true}/>
                            <ButtonToolbar className="gap-1">
                                <Button onClick={onGoal}>Goal</Button>
                                <Button onClick={onNotGoal}>Not Goal</Button>
                                <Button onClick={onBack}>Back</Button>
                                <Button onClick={onClear}>All clear</Button>
                            </ButtonToolbar>
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q2" title="Q2">
				        <Row className="gap-1">
                            <Coat Edit={true}/>
                            <ButtonToolbar className="gap-1">
                                <Button onClick={onGoal}>Goal</Button>
                                <Button onClick={onNotGoal}>Not Goal</Button>
                                <Button onClick={onBack}>Back</Button>
                                <Button onClick={onClear}>All clear</Button>
                            </ButtonToolbar>
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q3" title="Q3">
				        <Row className="gap-1">
                            <Coat Edit={true}/>
                            <ButtonToolbar className="gap-1">
                                <Button onClick={onGoal}>Goal</Button>
                                <Button onClick={onNotGoal}>Not Goal</Button>
                                <Button onClick={onBack}>Back</Button>
                                <Button onClick={onClear}>All clear</Button>
                            </ButtonToolbar>
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q4" title="Q4">
				        <Row className="gap-1">
                            <Coat Edit={true}/>
                            <ButtonToolbar className="gap-1">
                                <Button onClick={onGoal}>Goal</Button>
                                <Button onClick={onNotGoal}>Not Goal</Button>
                                <Button onClick={onBack}>Back</Button>
                                <Button onClick={onClear}>All clear</Button>
                            </ButtonToolbar>
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Total" title="Total">
				        <Row className="gap-1">
                            <Coat Edit={false}/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                </Tabs>
			</Container>
		);
	} else {
		return(
			<Container>
				<Row>
					ログインしてください
				</Row>
			</Container>
		);
	};

}

export default ToolPage;
