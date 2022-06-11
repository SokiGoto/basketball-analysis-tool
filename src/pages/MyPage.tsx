import React, { useState, useEffect} from "react";

import { Link , useHistory } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ReactPaginate from 'react-paginate'

import clone from "clone";
import { LoginInfo, Game, InitialGame } from "../interfaces";
import { auth, db } from "../Firebase";
import { getDocs, getDoc, addDoc, setDoc, deleteDoc, collection, doc} from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

type List = {
    id: string,
    game: Game,
}

type SortKey = {
    key: string,
    order: number
}

const MyPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [show, setShow] = useState(false);
    const [DeleteGameId, setDeleteGameId] = useState<string | null>(null);
    const [DeleteGameIndex, setDeleteGameIndex] = useState<number | null>(null);

    const [SortKey, setSortKey] = useState<SortKey>({key: "date", order: 0});
    
    const [List, setList] = useState<List[]>([]);

    const [Page, setPage] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, `users/${logininfo.userid}/games`));
            const ret: List[] = [];
            querySnapshot.forEach(doc => {
                ret.push({id:doc.id, game:doc.data().game} as List);
            });
            ret.sort((a, b) => {
                if (a.game.date > b.game.date) {
                    return -1;
                } else if (a.game.date < b.game.date) {
                    return 1;
                }
                return 0;
            });
            setSortKey({key: "date", order: -1});
            setList(ret);
        })();
    }, [logininfo.userid]);
	

	
	const onLogoutClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
		await auth.signOut();
		history.push("/");http://localhost:3000/
		alert("ログアウトしました");
	};

	if (logininfo.state !== "signin") {
		return (
			<Container className="mt-4 mb-5">
				<Row>
					<Col className="mx-3">
						マイページを利用する場合は<Link to="/login">ログイン</Link>してくだい
					</Col>
				</Row>
			</Container>
		);
	};


    const onNewGame = async() => {
        history.push("/tool");
        // const newGameRef = collection(db, `users/${logininfo.userid}/games`);
        // const newGame: Game = InitialGame;
        // const newGameAdd = await addDoc(newGameRef, { game: newGame });
        // setList([...List, {id:newGameAdd.id, game:newGame} as List]);
    }

    // const onChange = async (e:any) => {
    //     const Id = e.target.id;
    //     const newTest = {
    //         id: "",
    //         name: "",
    //         key1: "aaaa",
    //         key2: "bbbb",
    //     }
    //     await setDoc(doc(db, `users/${logininfo.userid}/gamse`, Id), { game: newTest }, { merge: true });
    //     setList(List.map((x, index) => {
    //         if(x.id === Id) {
    //             return {id:Id, game:newTest} as List;
    //         }
    //         return x;
    //     }));
    // }


	const onDelete = (id: string, index: number) => {
        setDeleteGameId(id);
        setDeleteGameIndex(index);
        setShow(true);
    }
    const onDeleteConfirm = () => {
        if (DeleteGameId !== null && DeleteGameIndex !== null) {
            deleteDoc(doc(db, `users/${logininfo.userid}/games`, DeleteGameId));
            setList(List.filter(x => x.id !== DeleteGameId));
        }
        setShow(false);
        setDeleteGameId(null);
        setDeleteGameIndex(null);
        console.log("deleted", DeleteGameId, DeleteGameIndex);
    }

	const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const user = auth.currentUser;
	
			if (!user) {
				return;
			}

			if (newPassword !== newPasswordConfirmation) {
				alert("パスワードが一致しません。");
				return;
			}
	
			updatePassword(user, newPassword)
				.then(() => {
					alert("パスワードを更新しました。");
					setNewPassword("");
					setNewPasswordConfirmation("");
				})
				.catch((error) => {
					alert(error.code);
				});
	};
    
    const handleClose = () => setShow(false);

    const ConfirmDialog = () => {
        console.log("DeleteGameIndex:", DeleteGameIndex);
        if (DeleteGameId === null || DeleteGameIndex === null) {
            return null;
        } else {
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>消去確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ID : {DeleteGameIndex+1}<br/>
                        日付 : {List[DeleteGameIndex].game.date}<br/>
                        チームA : {List[DeleteGameIndex].game.team_A}<br/>
                        チームB : {List[DeleteGameIndex].game.team_B}<br/>
                        {/*
                        */}
                        の試合データを削除します。<br/>
                        データは完全に消去されます。<br/>
                        消去してもよろしいですか？
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            キャンセル
                        </Button>
                        <Button variant="primary" onClick={onDeleteConfirm}>
                            消去
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    const onSort = (key: string) => {
        const newList = clone(List);
        var order = 1;
        if (SortKey.key === key) {
            order = SortKey.order === 1 ? -1 : 1;
        }
        if (key === "date") {
            newList.sort((a, b) => {
                if (a.game.date > b.game.date) {
                    return 1*order;
                } else if (a.game.date < b.game.date) {
                    return -1*order;
                }
                return 0;
            });
            setSortKey({key:key, order:order});
        } else if (key === "team_A") {
            newList.sort((a, b) => {
                if (a.game.team_A === undefined) {
                    return 1;
                }
                if (b.game.team_A === undefined) {
                    return -1;
                }
                if (a.game.team_A > b.game.team_A) {
                    return 1*order;
                } else if (a.game.team_A < b.game.team_A) {
                    return -1*order;
                }
                return 0;
            });
            setSortKey({key:key, order:order});
        } else if (key === "team_B") {
            newList.sort((a, b) => {
                if (a.game.team_B === undefined) {
                    return 1;
                }
                if (b.game.team_B === undefined) {
                    return -1;
                }
                if (a.game.team_B > b.game.team_B) {
                    return 1*order;
                } else if (a.game.team_B < b.game.team_B) {
                    return -1*order;
                }
                return 0;
            });
            setSortKey({key:key, order:order});
        } else if (key === "score_A") {
            newList.sort((a, b) => {
                if (a.game.score_A === undefined) {
                    return 1;
                }
                if (b.game.score_A === undefined) {
                    return -1;
                }
                if (a.game.score_A > b.game.score_A) {
                    return 1*order;
                } else if (a.game.score_A < b.game.score_A) {
                    return -1*order;
                }
                return 0;
            });
            setSortKey({key:key, order:order});
        } else if (key === "score_B") {
            newList.sort((a, b) => {
                if (a.game.score_B === undefined) {
                    return 1;
                }
                if (b.game.score_B === undefined) {
                    return -1;
                }
                if (a.game.score_B > b.game.score_B) {
                    return 1*order;
                } else if (a.game.score_B < b.game.score_B) {
                    return -1*order;
                }
                return 0;
            });
            setSortKey({key:key, order:order});
        }
        setList(newList);
        setPage(1);
    }

	const onView = (id: string, index: number) => {
		history.push("/tool", List[index]);
    }

    const onPageChange = (e: any) => {
        const selected = e.selected + 1;
        console.log("selected:", selected);
        setPage(selected);
    }

    const onPageSize = (e: any) => {
        console.log("pageSize:", e);
        setPageSize(e);
    }

	return (
        <Container className="mt-4 mb-5">
            <Row>
                <Col className="mx-3">
                    <ConfirmDialog/>
                    <Tabs
                        defaultActiveKey="games"
                        transition={false}
                        id="noanim-tab-example"
                        variant="tabs"
                    >
                        <Tab eventKey="games" title="試合">
                            <div className="mx-3 my-3">
                                <Row className="gap-2">
                                    <Col xs={2}>
                                        <Button onClick={onNewGame}>
                                            NewGame
                                        </Button>
                                        {/*
                                        <Button onClick={onTest}>
                                            test
                                        </Button>
                                        */}
                                    </Col>
                                    <Col xs={7}>
                                    </Col>
                                    <Col xs={1}>
                                        <Dropdown onSelect={onPageSize}>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                表示件数
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                                <Dropdown.Item eventKey="10">10</Dropdown.Item>
                                                <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th onClick={() => onSort("date")}>
                                                    日付
                                                    {SortKey.key === "date" ? (SortKey.order === 1 ? "▲" : "▼") : ""}
                                                </th>
                                                <th onClick={() => onSort("team_A")}>
                                                    チームA
                                                    {SortKey.key === "team_A" ? (SortKey.order === 1 ? "▲" : "▼") : ""}
                                                </th>
                                                <th onClick={() => onSort("team_B")}>
                                                    チームB
                                                    {SortKey.key === "team_B" ? (SortKey.order === 1 ? "▲" : "▼") : ""}
                                                </th>
                                                <th onClick={() => onSort("score_A")}>
                                                    スコアA
                                                    {SortKey.key === "score_A" ? (SortKey.order === 1 ? "▲" : "▼") : ""}
                                                </th>
                                                <th onClick={() => onSort("score_B")}>
                                                    スコアB
                                                    {SortKey.key === "score_B" ? (SortKey.order === 1 ? "▲" : "▼") : ""}
                                                </th>
                                                <th>View</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {List.map((list, index) => {
                                                if (index < Page * PageSize && index >= (Page - 1) * PageSize) {
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{list.game.date}</td>
                                                        <td>{list.game.team_A}</td>
                                                        <td>{list.game.team_B}</td>
                                                        <td>{list.game.score_A}</td>
                                                        <td>{list.game.score_B}</td>
                                                        <td>
                                                            <Button id={list.id} onClick={() => onView(list.id,index)}>
                                                                View
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button id={list.id} onClick={() => onDelete(list.id,index)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </tbody>
                                    </Table>
                                    <ReactPaginate
                                        forcePage={Page-1}
                                        pageCount={Math.ceil(List.length/PageSize)}
                                        onPageChange={onPageChange}
                                        marginPagesDisplayed={4} // 先頭と末尾に表示するページ数
                                        pageRangeDisplayed={2} // 現在のページの前後をいくつ表示させるか

                                        containerClassName="pagination justify-center" // ul(pagination本体)
                                        pageClassName="page-item" // li
                                        pageLinkClassName="page-link rounded-full" // a
                                        activeClassName="active" // active.li
                                        activeLinkClassName="active" // active.li < a

                                        // 戻る・進む関連
                                        previousClassName="page-item" // li
                                        nextClassName="page-item" // li
                                        previousLabel={'<'} // a
                                        previousLinkClassName="previous-link"
                                        nextLabel={'>'} // a
                                        nextLinkClassName="next-link"
                                        
                                        // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                                        disabledClassName="disabled-button d-none"
                                        
                                        // 中間ページの省略表記関連
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                    />
                                </Row>
                            </div>
                        </Tab>
                        {/*
		                <Tab eventKey="home" title="ユーザー情報">
                            <div className="mx-3 my-3">
				                <p>id:{logininfo.userid}</p>
			                </div>
		                </Tab>
                        */}
                        <Tab eventKey="password" title="パスワード変更">
                            <div className="mx-3 my-3">
                                <Form onSubmit={handleFormSubmission}>
                                    <Form.Group>
                                        <Form.Label>新しいパスワード</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>パスワードの確認</Form.Label>
                                        <Form.Control
                                            type="password"
                                        value={newPasswordConfirmation}
                                        onChange={(e) =>
                                            setNewPasswordConfirmation(e.target.value)
                                        }
                                        />
                                    </Form.Group>
				                    <br/>
				                    <Button variant="primary" type="submit">
                                        更新
                                    </Button>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="logout" title="ログアウト">
                            <div className="mx-3 my-3">
                                <Button variant="primary" type="button" onClick={onLogoutClick}>
                                    ログアウト
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default MyPage;
