import React, { FunctionComponent, useContext, useState } from "react";
import { SpaceComponent } from "./SpaceComponent";
import styles from "../styling/BoardComponent.module.scss" //Import css module
import GameContext from "../context/GameContext";
import { Typography, Button } from "@material-ui/core";
import { Game } from "../types/Game";
import { User } from "../types/User";
import {deepPurple, green, lightBlue, red, yellow} from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PlayerIcon from "@material-ui/icons/Person";

/*
If the board component took any props/arguments they would be declared inside the type below
see the space component for an example.
 */

/**
 * @author s205444, Lucas
 */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
        red: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
        },
        green: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
        },
        blue: {
            color: theme.palette.getContrastText(lightBlue[500]),
            backgroundColor: lightBlue[500],
        },
        yellow: {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
        }
    }),
);

type BoardComponentProps = {}
const BoardComponent: FunctionComponent<BoardComponentProps> = () => {
    //{...} context is known as object destructuring
    const { games, createPlayer, board, loaded, unselectGame, startGame, endGame } = useContext(GameContext) //Hook form of Context.Consumer, used to access the context

    let [join, setJoin] = useState(false);
    let [start, setStart] = useState(false);
    // Major hack to find out which game is being used in this instance
    let game = games.find(game => game.gameId === board.boardId);
    if (game === undefined) {
        var users: User[] = [];
        game = {
            gameName: "null",
            gameId: 500,
            gameStarted: false,
            gameUsers: users
        };
    } else {
        // Sets local var of game to actual status
        start = game.gameStarted
    }

    const {user} = useContext(GameContext)

    const {changeUserID} = useContext(GameContext)

    const {addUserToBackEnd} = useContext(GameContext)


    const classes = useStyles();

    const onSetJoin = () => {
        setJoin(true);
        if(game !== undefined) {
            addUserToBackEnd(game.gameId, user.playerName)
        }
    }

    const onClickCreate = () => {
        if (game !== undefined) {
            createPlayer(game)
        }
    }

    const onSetLeave = () => {
        setJoin(false);
    }
    const onSetStart = () => {
        if (game !== undefined) {
            startGame(game).then(() =>
                setStart(true)
            ).catch(() =>
                setStart(false)
            );
        }
    }
    const onSetEnd = () => {
        let game: Game | undefined;
        game = games.find(game => game.gameId === board.boardId);
        if (game === undefined) {
            console.log("Game could not be found in map")
        } else {
            endGame(game);
            setStart(false);
        }
    }

    const onBack = () => {
        setJoin(false);
        unselectGame();
    }


    return (
        loaded ?
            <div className={styles.centerAll}>


                <Typography variant="h5" align="center" >Game {game.gameName} </Typography>
                {!start ?
                    <Typography variant="h5" align="center" >Welcome to roborally</Typography>

                    :
                    <Typography variant="h5" align="center" >Game is on </Typography>
                }
                <Typography variant="h6" align="left" >Users in this game: </Typography>
                {game.gameUsers.map((user, index) => <ListItem key={index}>


                    <ListItemText
                        primary={user.playerName}
                    />
                </ListItem>)}

                <br />
                <br />
                <div className={styles.container}>
                    {board.spaceDtos.map((spaceArray, index) =>
                        <div key={"spaceArray" + index}>
                            {
                                spaceArray.map((space, index) => <SpaceComponent key={"space" + index} space={space} />)
                            }
                        </div>
                    )
                    }
                </div>
                <Typography variant="body1">Current user: {user.playerName}</Typography>

                    <Typography variant="subtitle1">Choose a player</Typography>
                    {board.playerDtos.map((user, index) => <button color={"primary"} key={index}
                                                                 onClick={() => changeUserID(user.playerId)}> {user.playerColor}</button>)
                    }




                <br/>
                {!join ?
                    <button className={classes.blue}   color="primary" onClick={onSetJoin}  >
                        Join
                    </button>

                    :

                    < button className={classes.red}  color="primary" onClick={onSetLeave}  >
                        Leave
                    </button>
                }

                <button className={classes.blue} color="primary" onClick={onClickCreate}>
                    New player
                </button>


                <button className={classes.green} color="primary" onClick={onSetStart}  >
                    Start
                </button>

                <button className={classes.yellow} color="primary" onClick={onSetEnd}  >
                    End Game
                </button>

                <button className={classes.red} color="primary" onClick={onBack}>
                    Back to Games
                </button>


                <Typography variant="h5">Game info</Typography>
                <Typography variant="subtitle1">{"Board: " + board.boardId}</Typography>




            </div >
            :
            <div />
    )
}

export default BoardComponent


