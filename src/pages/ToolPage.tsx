import React, { useState, useEffect } from "react";

import { Link , useHistory, useLocation } from "react-router-dom";
import { Prompt } from 'react-router'

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import { updatePassword } from "firebase/auth";

import { LoginInfo, Game, InitialGame, Point, InitialParameter, Parameter} from "../interfaces";
import { auth, db } from "../Firebase";
import { setDoc, addDoc, doc, collection } from "firebase/firestore"

interface Props {
    logininfo: LoginInfo;
}

type List = {
    id: string;
    game: Game;
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

    const [list, setList] = useState<List>({id: "", game: InitialGame});
    const [Beforlist, setBeforlist] = useState<List>({id: "", game: InitialGame});
    const { state } = useLocation<List>();

    const [key, setKey] = useState<string>("info");
    const [Edit, setEdit] = useState<boolean>(false);

    
    useEffect(() => {
        if (state !== undefined) {
            setList(state);
            setBeforlist(state);
            setEdit(false);
        } else {
            setList({id: "", game: InitialGame});
            setBeforlist({id: "", game: InitialGame});
            setEdit(true);
        }
    }, [state]);

    console.log("list",list)
    
    const [Point, setPoint] = useState<Point[]>([]);
    const [GoalorNot, setGoalorNot] = useState("Goal");
    const [GoalRate, setGoalRate] = useState(0);

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
    

    useEffect(() => {
        if (key === "Q1" || key === "Q2" || key === "Q3" || key === "Q4" || key === "total") {
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

            var quator: Point[] = [];
            if (key === "Q1" || key === "total") {
                quator = quator.concat(list.game.Q1.point);
            }
            if (key === "Q2" || key === "total") {
                quator = quator.concat(list.game.Q2.point);
            }
            if (key === "Q3" || key === "total") {
                quator = quator.concat(list.game.Q3.point);
            }
            if (key === "Q4" || key === "total") {
                quator = quator.concat(list.game.Q4.point);
            }

            setPoint(quator);

            quator.map((point, index) => {
                if (point.team === "A") {
                    if (point.point === 3){
                        if (point.color === "red"){
                            FGMA_tmp++;
                            FG3MA_tmp++;
                            FGPA_tmp=FGPA_tmp+3;
                        }
                        FGAA_tmp++;
                        FG3AA_tmp++;
                    } else if (point.point === 2){
                        if (point.color === "red"){
                            FGMA_tmp++;
                            FG2MA_tmp++;
                            FGPA_tmp=FGPA_tmp+2;
                        }
                        FGAA_tmp++;
                        FG2AA_tmp++;
                    }
                } else if (point.team === "B") {
                    if (point.point === 3){
                        if (point.color === "red"){
                            FGMB_tmp++;
                            FG3MB_tmp++;
                            FGPB_tmp=FGPB_tmp+3;
                        }
                        FGAB_tmp++;
                        FG3AB_tmp++;
                    } else if (point.point === 2){
                        if (point.color === "red"){
                            FGMB_tmp++;
                            FG2MB_tmp++;
                            FGPB_tmp=FGPB_tmp+2;
                        }
                        FGAB_tmp++;
                        FG2AB_tmp++;
                    }
                }
            });
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
        }
    }, [list, key]);



	

    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return;
        }
        const svg = event.currentTarget
        const pt = svg.createSVGPoint()
        
        pt.x = event.clientX
        pt.y = event.clientY

        
        const ctm = svg.getScreenCTM()
        if (ctm) {
            const cursorPt = pt.matrixTransform(ctm.inverse())
            var color: string = ""
            var point: number = 3
            var team: string = ""
            if (cursorPt.x > 50) {
                if ((cursorPt.x - (width - goal))**2 + (cursorPt.y - height/2)**2 <= tpl**2
                    && cursorPt.x <= width - tplsw
                    || cursorPt.x > width-tplsw 
                    && cursorPt.x < width 
                    && cursorPt.y > tpls 
                    && cursorPt.y < height - tpls){
                    point = 2
                }
                
                if (key === "Q1" || key === "Q2") {
                    team = "B"
                } else if (key === "Q3" || key === "Q4") {
                    team = "A"
                }

                if (GoalorNot === "Goal") {
                    color = "red"
                } else if (GoalorNot === "NotGoal") {
                    color = "blue"
                }
                // console.log("=>", cursorPt.x, cursorPt.y, color, point, team)
            } else {
                if ((cursorPt.x - goal)**2 + (cursorPt.y - height/2)**2 <= tpl**2
                    && cursorPt.x >= tplsw
                    || cursorPt.x > 0
                    && cursorPt.x < tplsw
                    && cursorPt.y > tpls
                    && cursorPt.y < height - tpls){
                    point = 2
                }

                if (key === "Q1" || key === "Q2") {
                    team = "A"
                } else if (key === "Q3" || key === "Q4") {
                    team = "B"
                }

                if (GoalorNot === "Goal") {
                    color = "red"
                } else if (GoalorNot === "NotGoal") {
                    color = "blue"
                }
                // console.log("<=", cursorPt.x, cursorPt.y, color, point, team)
            }
            setList(
                {...list, game: {
                    ...list.game, [key]: {
                        ...list.game[key], point: [
                            ...list.game[key].point, {coor_x: cursorPt.x, coor_y: cursorPt.y, color: color, point: point, team: team}
                        ]
                    }
                }}
            )
        }
    }
    const onGoal = () => {
        setGoalorNot("Goal");
    }

    const onNotGoal = () => {
        setGoalorNot("NotGoal");
    }

    const onBack = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return;
        }
        setList(
            {...list, game: {
                ...list.game, [key]: {
                    ...list.game[key], point: list.game[key].point.filter(
                        (point, index) => (index !== list.game[key].point.length - 1))
                }
            }
        })
    }

    const onClear = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return;
        }
        setList(
            {...list, game: {
                ...list.game, [key]: {
                    ...list.game[key], point: []
                }
            }
        })
        setFGPA(0);
        setFGPB(0);
    }

    const onCnt = (e: any) => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return;
        }
        const id = e.currentTarget.id;
        if (id === "foulAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                foul_A: Math.max(list.game[key].parameter.foul_A - 1, 0)}}}});
        } else if (id === "foulAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                foul_A: list.game[key].parameter.foul_A + 1}}}});
        } else if (id === "foulBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                foul_B: Math.max(list.game[key].parameter.foul_B - 1, 0)}}}});
        } else if (id === "foulBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                foul_B: list.game[key].parameter.foul_B + 1}}}});
        } else if (id === "bsAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                bs_A: Math.max(list.game[key].parameter.bs_A - 1, 0)}}}});
        } else if (id === "bsAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                bs_A: list.game[key].parameter.bs_A + 1}}}});
        } else if (id === "bsBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                bs_B: Math.max(list.game[key].parameter.bs_B - 1, 0)}}}});
        } else if (id === "bsBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                bs_B: list.game[key].parameter.bs_B + 1}}}});
        } else if (id === "toAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                to_A: Math.max(list.game[key].parameter.to_A - 1, 0)}}}});
        } else if (id === "toAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                to_A: list.game[key].parameter.to_A + 1}}}});
        } else if (id === "toBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                to_B: Math.max(list.game[key].parameter.to_B - 1, 0)}}}});
        } else if (id === "toBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                to_B: list.game[key].parameter.to_B + 1}}}});
        } else if (id === "ftMAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_SA: Math.max(list.game[key].parameter.ft_SA - 1, 0)}}}});
        } else if (id === "ftMAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_SA: list.game[key].parameter.ft_SA + 1}}}});
        } else if (id === "ftMBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_SB: Math.max(list.game[key].parameter.ft_SB - 1, 0)}}}});
        } else if (id === "ftMBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_SB: list.game[key].parameter.ft_SB + 1}}}});
        } else if (id === "ftAAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_FA: Math.max(list.game[key].parameter.ft_FA - 1, 0)}}}});
        } else if (id === "ftAAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_FA: list.game[key].parameter.ft_FA + 1}}}});
        } else if (id === "ftABM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_FB: Math.max(list.game[key].parameter.ft_FB - 1, 0)}}}});
        } else if (id === "ftABP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                ft_FB: list.game[key].parameter.ft_FB + 1}}}});
        } else if (id === "assistAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                assist_A: Math.max(list.game[key].parameter.assist_A - 1, 0)}}}});
        } else if (id === "assistAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                assist_A: list.game[key].parameter.assist_A + 1}}}});
        } else if (id === "assistBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                assist_B: Math.max(list.game[key].parameter.assist_B - 1, 0)}}}});
        } else if (id === "assistBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                assist_B: list.game[key].parameter.assist_B + 1}}}});
        } else if (id === "stealAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                steal_A: Math.max(list.game[key].parameter.steal_A - 1, 0)}}}});
        } else if (id === "stealAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                steal_A: list.game[key].parameter.steal_A + 1}}}});
        } else if (id === "stealBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                steal_B: Math.max(list.game[key].parameter.steal_B - 1, 0)}}}});
        } else if (id === "stealBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                steal_B: list.game[key].parameter.steal_B + 1}}}});
        } else if (id === "reboundDAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_DA: Math.max(list.game[key].parameter.rebound_DA - 1, 0)}}}});
        } else if (id === "reboundDAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_DA: list.game[key].parameter.rebound_DA + 1}}}});
        } else if (id === "reboundOAM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_OA: Math.max(list.game[key].parameter.rebound_OA - 1, 0)}}}});
        } else if (id === "reboundOAP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_OA: list.game[key].parameter.rebound_OA + 1}}}});
        } else if (id === "reboundDBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_DB: Math.max(list.game[key].parameter.rebound_DB - 1, 0)}}}});
        } else if (id === "reboundDBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_DB: list.game[key].parameter.rebound_DB + 1}}}});
        } else if (id === "reboundOBM") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_OB: Math.max(list.game[key].parameter.rebound_OB - 1, 0)}}}});
        } else if (id === "reboundOBP") {
            setList(
                {...list,
                    game: {...list.game,
                        [key]: {...list.game[key],
                            parameter: {...list.game[key].parameter,
                                rebound_OB: list.game[key].parameter.rebound_OB + 1}}}});
        } else {
            console.log("error");
        }

    }


    const onSave = () => {
        var score_A = 0;
        var score_B = 0;
        score_A += list.game.Q1.parameter.ft_SA;
        score_A += list.game.Q2.parameter.ft_SA;
        score_A += list.game.Q3.parameter.ft_SA;
        score_A += list.game.Q4.parameter.ft_SA;
        score_B += list.game.Q1.parameter.ft_SB;
        score_B += list.game.Q2.parameter.ft_SB;
        score_B += list.game.Q3.parameter.ft_SB;
        score_B += list.game.Q4.parameter.ft_SB;
        list.game.Q1.point.map((point) => {
            if (point.team === "A" && point.color === "red") {
                score_A += point.point;
            } else if (point.team === "B" && point.color === "red") {
                score_B += point.point;
            }
        });
        list.game.Q2.point.map((point) => {
            if (point.team === "A" && point.color === "red") {
                score_A += point.point;
            } else if (point.team === "B" && point.color === "red") {
                score_B += point.point;
            }
        });
        list.game.Q3.point.map((point) => {
            if (point.team === "A" && point.color === "red") {
                score_A += point.point;
            } else if (point.team === "B" && point.color === "red") {
                score_B += point.point;
            }
        });
        list.game.Q4.point.map((point) => {
            if (point.team === "A" && point.color === "red") {
                score_A += point.point;
            } else if (point.team === "B" && point.color === "red") {
                score_B += point.point;
            }
        });
        if (list.id === "") {
            (async () => {
                const newGameRef = await collection(db, `users/${logininfo.userid}/games`);
                const newGameAdd = await addDoc(newGameRef,
                                                { game: {...list.game, score_A: score_A, score_B: score_B} })
                .then((e) => {
                    setList({id: e.id, game: {...list.game, score_A: score_A, score_B: score_B}});
                    setBeforlist({id: e.id, game: {...list.game, score_A: score_A, score_B: score_B}});
                    setEdit(false);
                    alert("保存しました");
                });
            })();
        } else {
            setDoc(doc(db, `users/${logininfo.userid}/games`, list.id),
                   { game: {...list.game, score_A: score_A, score_B: score_B} }, { merge: true })
            .then(() => {
                setEdit(false);
                setBeforlist(list);
                alert("保存しました");
            })
            .catch(() => {
                alert("保存に失敗しました");
            });
        }
    }

    const onView = () => {
        setEdit(false);
    }

    const onEdit = () => {
        setEdit(true);
    }
    
    const ViewSave = () => {
        if (Edit) {
            return (
                <Row>
                    <Col>
                        <Button onClick={onSave}>保存</Button>
                        {/*
                        <Button onClick={onView}>View</Button>
                        */}
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col>
                        <Button onClick={onEdit}>編集</Button>
                    </Col>
                </Row>
            )
        }

    }

    const Label = () => {
        if (key === "Q1" || key === "Q2") {
            return(
                <Row>
                    <Col xs={6}>
                        <h4>A : {list.game.team_A}</h4>
                    </Col>
                    <Col xs={6}>
                        <h4>B : {list.game.team_B}</h4>
                    </Col>
                </Row>
            )
        } else if (key === "Q3" || key === "Q4") {
            return(
                <Row>
                    <Col xs={6}>
                        <h4>B : {list.game.team_B}</h4>
                    </Col>
                    <Col xs={6}>
                        <h4>A : {list.game.team_A}</h4>
                    </Col>
                </Row>
            )
        } else {
            return null;
        }
    }


    const Coat = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4" && key !== "total") {
            return null
        }
        if (key === "total") {
            return (
                <>
                    <Row>
                        <Col xs={6}>
                            <h4>A : {list.game.team_A}</h4>
                        </Col>
                    </Row>
                    <svg id="coart" width="100%" height="100%" viewBox={`0 0 100 ${height}`}>
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
                        {Point.map((point, index) => {
                            if (point.team === "A") {
                                return <circle cx={point.coor_x} cy={point.coor_y} r="1" fill={point.color} />
                            } else {
                                return null;
                            }
                        })}
                    </svg>
                    <Row>
                        <Col xs={6}>
                            <h4>B : {list.game.team_B}</h4>
                        </Col>
                    </Row>
                    <svg id="coart" width="100%" height="100%" viewBox={`0 0 100 ${height}`}>
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
                        {Point.map((point, index) => {
                            if (point.team === "B") {
                                return <circle cx={point.coor_x} cy={point.coor_y} r="1" fill={point.color} />
                            } else {
                                return null;
                            }
                        })}
                    </svg>
                </>
            )
        }
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


                    {Point.map((point, index) => {
                        return <circle cx={point.coor_x} cy={point.coor_y} r="1" fill={point.color} />
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
                    {Point.map((point, index) => {
                        return <circle cx={point.coor_x} cy={point.coor_y} r="1" fill={point.color} />
                    })}
                </svg>
            )
        }
    }
    const GoalButtons = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return null
        }
        if (Edit) {
            return (
                <ButtonToolbar className="gap-1">
                    <Button onClick={onGoal}>Goal</Button>
                    <Button onClick={onNotGoal}>Not Goal</Button>
                    <Button onClick={onBack}>Back</Button>
                    <Button onClick={onClear}>All clear</Button>
                </ButtonToolbar>
            )
        } else {
            return null
        }
    }

    const Counter = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4") {
            return null
        }
        if (! Edit) {
            return null
        }
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
                                        {list.game[key].parameter.foul_A}
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
                                        {list.game[key].parameter.foul_B}
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
                                        {list.game[key].parameter.assist_A}
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
                                        {list.game[key].parameter.assist_B}
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
                                        {list.game[key].parameter.steal_A}
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
                                        {list.game[key].parameter.steal_B}
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
                                    <span className="AB">成</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                    {list.game[key].parameter.ft_SA}
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
                                    <span className="AB">失</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftAAM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {list.game[key].parameter.ft_FA}
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
                                    <span className="AB">成</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftMBM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {list.game[key].parameter.ft_SB}
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
                                    <span className="AB">失</span>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <Button
                                    id="ftABM"
                                    className="square-button"
                                    onClick={onCnt}>-</Button>
                                </Col>
                                <Col className="mx-0 px-1">
                                    <span className="number">
                                        {list.game[key].parameter.ft_FB}
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
                                        {list.game[key].parameter.rebound_DA}
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
                                        {list.game[key].parameter.rebound_OA}
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
                                        {list.game[key].parameter.rebound_DB}
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
                                        {list.game[key].parameter.rebound_OB}
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
                                        {list.game[key].parameter.bs_A}
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
                                        {list.game[key].parameter.bs_B}
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
                                        {list.game[key].parameter.to_A}
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
                                        {list.game[key].parameter.to_B}
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
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4" && key !== "total") {
            return null
        }
        var parameter: Parameter = InitialParameter;
        if (key === "Q1" || key === "total") {
            parameter = {
                assist_A: list.game.Q1.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q1.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q1.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q1.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q1.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q1.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q1.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q1.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q1.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q1.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q1.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q1.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q1.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q1.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q1.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q1.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q1.parameter.to_A + parameter.to_A,
                to_B: list.game.Q1.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q2" || key === "total") {
            parameter = {
                assist_A: list.game.Q2.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q2.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q2.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q2.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q2.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q2.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q2.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q2.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q2.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q2.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q2.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q2.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q2.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q2.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q2.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q2.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q2.parameter.to_A + parameter.to_A,
                to_B: list.game.Q2.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q3" || key === "total") {
            parameter = {
                assist_A: list.game.Q3.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q3.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q3.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q3.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q3.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q3.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q3.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q3.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q3.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q3.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q3.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q3.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q3.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q3.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q3.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q3.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q3.parameter.to_A + parameter.to_A,
                to_B: list.game.Q3.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q4" || key === "total") {
            parameter = {
                assist_A: list.game.Q4.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q4.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q4.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q4.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q4.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q4.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q4.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q4.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q4.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q4.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q4.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q4.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q4.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q4.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q4.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q4.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q4.parameter.to_A + parameter.to_A,
                to_B: list.game.Q4.parameter.to_B + parameter.to_B,
            }
        }
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
            			<td>{list.game.team_A}</td>
                        <td>{FGPA + parameter.ft_SA}</td>
                        <td>M : {FGMA}<br/>A : {FGAA}<br/>{(FGMA/FGAA*100).toFixed(0)}%</td>
                        <td>M : {FG3MA}<br/>A : {FG3AA}<br/>{(FG3MA/FG3AA*100).toFixed(0)}%</td>
                        <td>M : {FG2MA}<br/>A : {FG2AA}<br/>{(FG2MA/FG2AA*100).toFixed(0)}%</td>
                        <td>
                            M : {parameter.ft_SA}<br/>
                            A : {parameter.ft_SA+parameter.ft_FA}<br/>
                            {(parameter.ft_SA/(parameter.ft_SA+parameter.ft_FA)*100).toFixed(0)}%</td>
                        <td>{parameter.foul_A}</td>
                        <td>
                            DIF : {parameter.rebound_DA}<br/>
                            OFF : {parameter.rebound_OA}<br/>
                            Total : {parameter.rebound_DA+parameter.rebound_OA}</td>
                        <td>{parameter.assist_A}</td>
                        <td>{parameter.steal_A}</td>
                        <td>{parameter.bs_A}</td>
                        <td>{parameter.to_A}</td>
                    </tr>
                    <tr>
            			<td>{list.game.team_B}</td>
                        <td>{FGPB + parameter.ft_SB}</td>
                        <td>M : {FGMB}<br/>A : {FGAB}<br/>{(FGMB/FGAB*100).toFixed(0)}%</td>
                        <td>M : {FG3MB}<br/>A : {FG3AB}<br/>{(FG3MB/FG3AB*100).toFixed(0)}%</td>
                        <td>M : {FG2MB}<br/>A : {FG2AB}<br/>{(FG2MB/FG2AB*100).toFixed(0)}%</td>
                        <td>
                            M : {parameter.ft_SB}<br/>
                            A : {parameter.ft_SB+parameter.ft_FB}<br/>
                            {(parameter.ft_SB/(parameter.ft_SB+parameter.ft_FB)*100).toFixed(0)}%</td>
                        <td>{parameter.foul_B}</td>
                        <td>
                            DIF : {parameter.rebound_DB}<br/>
                            OFF : {parameter.rebound_OB}<br/>
                            Total : {parameter.rebound_DB+parameter.rebound_OB}</td>
                        <td>{parameter.assist_B}</td>
                        <td>{parameter.steal_B}</td>
                        <td>{parameter.bs_B}</td>
                        <td>{parameter.to_B}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    const Result2 = () => {
        if (key !== "Q1" && key !== "Q2" && key !== "Q3" && key !== "Q4" && key !== "total") {
            return null
        }
        var parameter: Parameter = InitialParameter;
        if (key === "Q1" || key === "total") {
            parameter = {
                assist_A: list.game.Q1.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q1.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q1.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q1.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q1.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q1.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q1.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q1.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q1.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q1.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q1.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q1.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q1.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q1.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q1.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q1.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q1.parameter.to_A + parameter.to_A,
                to_B: list.game.Q1.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q2" || key === "total") {
            parameter = {
                assist_A: list.game.Q2.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q2.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q2.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q2.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q2.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q2.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q2.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q2.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q2.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q2.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q2.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q2.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q2.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q2.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q2.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q2.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q2.parameter.to_A + parameter.to_A,
                to_B: list.game.Q2.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q3" || key === "total") {
            parameter = {
                assist_A: list.game.Q3.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q3.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q3.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q3.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q3.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q3.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q3.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q3.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q3.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q3.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q3.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q3.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q3.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q3.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q3.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q3.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q3.parameter.to_A + parameter.to_A,
                to_B: list.game.Q3.parameter.to_B + parameter.to_B,
            }
        }
        if (key === "Q4" || key === "total") {
            parameter = {
                assist_A: list.game.Q4.parameter.assist_A + parameter.assist_A,
                assist_B: list.game.Q4.parameter.assist_B + parameter.assist_B,
                bs_A: list.game.Q4.parameter.bs_A + parameter.bs_A,
                bs_B: list.game.Q4.parameter.bs_B + parameter.bs_B,
                foul_A: list.game.Q4.parameter.foul_A + parameter.foul_A,
                foul_B: list.game.Q4.parameter.foul_B + parameter.foul_B,
                ft_SA: list.game.Q4.parameter.ft_SA + parameter.ft_SA,
                ft_SB: list.game.Q4.parameter.ft_SB + parameter.ft_SB,
                ft_FA: list.game.Q4.parameter.ft_FA + parameter.ft_FA,
                ft_FB: list.game.Q4.parameter.ft_FB + parameter.ft_FB,
                rebound_DA: list.game.Q4.parameter.rebound_DA + parameter.rebound_DA,
                rebound_DB: list.game.Q4.parameter.rebound_DB + parameter.rebound_DB,
                rebound_OA: list.game.Q4.parameter.rebound_OA + parameter.rebound_OA,
                rebound_OB: list.game.Q4.parameter.rebound_OB + parameter.rebound_OB,
                steal_A: list.game.Q4.parameter.steal_A + parameter.steal_A,
                steal_B: list.game.Q4.parameter.steal_B + parameter.steal_B,
                to_A: list.game.Q4.parameter.to_A + parameter.to_A,
                to_B: list.game.Q4.parameter.to_B + parameter.to_B,
            }
        }
        
        const PTS_A = FGPA + parameter.ft_SA;
        const POSS_A = FGAA + 0.44*(parameter.ft_SA+parameter.ft_FA) + parameter.to_A;
        const PPP_A = PTS_A/POSS_A;
        const eFG_A = (FGMA + FG3MA*0.5) / FGAA;
        const TO_A = parameter.to_A / (FGAA + 0.44*(parameter.ft_SA+parameter.ft_FA)+parameter.to_A);
        const FTR_A = (parameter.ft_SA+parameter.ft_FA) / FGAA;
        const ORB_A = parameter.rebound_OA / (parameter.rebound_OA + parameter.rebound_DB);
        const DRB_A = parameter.rebound_DA / (parameter.rebound_DA + parameter.rebound_OB);
        const TRB_A = (parameter.rebound_DA+parameter.rebound_OA)/((parameter.rebound_DA+parameter.rebound_OA)+(parameter.rebound_OB+parameter.rebound_DB));

        const PTS_B = FGPB + parameter.ft_SB;
        const POSS_B = FGAB + 0.44*(parameter.ft_SB+parameter.ft_FB) + parameter.to_B;
        const PPP_B = PTS_B/POSS_B;
        const eFG_B = (FGMB + FG3MB*0.5) / FGAB;
        const TO_B = parameter.to_B / (FGAB + 0.44*(parameter.ft_SB+parameter.ft_FB)+parameter.to_B);
        const FTR_B = (parameter.ft_SB+parameter.ft_FB) / FGAB;
        const ORB_B = parameter.rebound_OB / (parameter.rebound_OB + parameter.rebound_DA);
        const DRB_B = parameter.rebound_DB / (parameter.rebound_DB + parameter.rebound_OA);
        const TRB_B = (parameter.rebound_DB+parameter.rebound_OB)/((parameter.rebound_DB+parameter.rebound_OB)+(parameter.rebound_OA+parameter.rebound_DA));

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
            			<td>{list.game.team_A}</td>
                        <td>{(PPP_A).toFixed(3)}</td>
                        <td>{(POSS_A).toFixed(2)}</td>
                        <td>{(eFG_A*100).toFixed(2)}%</td>
                        <td>{(TO_A*100).toFixed(2)}%</td>
                        <td>{(FTR_A).toFixed(3)}</td>
                        <td>{(ORB_A*100).toFixed(2)}%</td>
                        <td>{(DRB_A*100).toFixed(2)}%</td>
                        <td>{(TRB_A*100).toFixed(2)}%</td>
            		</tr>
            		<tr>
            			<td>{list.game.team_B}</td>
                        <td>{(PPP_B).toFixed(3)}</td>
                        <td>{(POSS_B).toFixed(2)}</td>
                        <td>{(eFG_B*100).toFixed(2)}%</td>
                        <td>{(TO_B*100).toFixed(2)}%</td>
                        <td>{(FTR_B).toFixed(3)}</td>
                        <td>{(ORB_B*100).toFixed(2)}%</td>
                        <td>{(DRB_B*100).toFixed(2)}%</td>
                        <td>{(TRB_B*100).toFixed(2)}%</td>
            		</tr>
            	</tbody>
            </Table>
        )
    }

	if (logininfo.state == "signin") {
		return (
			<Container>
                <Prompt when={list === Beforlist ? false : true} message="保存されていませんが移動しますか？" />
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    defaultActiveKey="info"
                    onSelect={(k) => k === null ? setKey("info") : setKey(k)}
                >
                    <Tab eventKey="info" title="基本情報">
                        <Row className="my-1">
                            <Form>
                                <Form.Group as={Col} md="9" controlId="validationCustom04">
                                    <Form.Label>日付</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={list.game.date}
                                        onChange={(e) => {
                                            setList({
                                                ...list,
                                                game: {
                                                    ...list.game,
                                                    date: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <Form.Control.Feedback>OK!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">日付を入力してください</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicTeamName">
                                    <Form.Label>Team A</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="A"
                                        value={list.game.team_A}
                                        onChange={(e) => setList({...list, game: {...list.game, team_A: e.target.value}})}
                                    />
                                    <Form.Label>Team B</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="B"
                                        value={list.game.team_B}
                                        onChange={(e) => setList({...list, game: {...list.game, team_B: e.target.value}})}
                                    />
                                    <Form.Label>解析者</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="鈴木"
                                        value={list.game.analyst}
                                        onChange={(e) => setList({...list, game: {...list.game, analyst: e.target.value}})}
                                    />
                                    <Form.Label>場所</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="東京"
                                        value={list.game.place}
                                        onChange={(e) => setList({...list, game: {...list.game, place: e.target.value}})}
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={onSave}>保存</Button>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q1" title="Q1">
                        <ViewSave/>
                        <Label />
				        <Row className="gap-1">
                            <Coat/>
                            <GoalButtons />
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q2" title="Q2">
                        <ViewSave/>
                        <Label />
				        <Row className="gap-1">
                            <Coat/>
                            <GoalButtons />
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q3" title="Q3">
                        <ViewSave/>
                        <Label />
				        <Row className="gap-1">
                            <Coat/>
                            <GoalButtons />
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="Q4" title="Q4">
                        <ViewSave/>
                        <Label />
				        <Row className="gap-1">
                            <Coat/>
                            <GoalButtons />
                            <Counter/>
                            <Result/>
                            <Result2/>
                        </Row>
                    </Tab>
                    <Tab eventKey="total" title="Total">
				        <Row className="gap-1">
                            <Coat/>
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
