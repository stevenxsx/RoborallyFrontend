import React, {FunctionComponent, useContext, useMemo, useState} from 'react';
import GameContext from "../context/GameContext";
import { GameComponent } from "./GameComponent";
import styles from "../styling/BoardComponent.module.scss" //Import css module
import { Typography, Button, TextField } from "@material-ui/core";


/**
 * @author s205444, Lucas
 */


type GamesComponentProps = {

}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {

    const { games, loaded } = useContext(GameContext)
    const { createGame } = useContext(GameContext)
    const {user} = useContext(GameContext)
    const {validateUser} = useContext(GameContext)

    const [inputName, setinputName] = useState('')

    const [userInputName, setUserInputName] = useState('')







    const handleClick = () => {
        console.log("new game name: " + inputName)
        createGame(inputName)
    };

    const userClick = () => {
        validateUser(userInputName)
    }

    return (
        <div id="everything">
            {
                !loaded ?
                    <div>
                        <div className={styles.centerHori}>
                            <Typography variant="h4">RoboRally Gruppe 07</Typography>
                            <br />
                            <div>
                                <Typography variant="h6">New game:</Typography>
                                <form className={styles.centerButtons}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        name="inputName"
                                        label="Game name"
                                        type="inputName"
                                        id="inputName"
                                        autoComplete="current-inputName"
                                        value={inputName}
                                        onChange={(event) => { setinputName(event.target.value) }} //whenever the text field change, you save the value in state
                                    />
                                    <button
                                        onClick={handleClick}
                                    >
                                        New game
                                    </button>
                                </form>
                            </div>
                            <div>
                                <form className={styles.centerButtons}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        name="inputUser"
                                        label="User name"
                                        type="inputUser"
                                        id="inputUser"
                                        autoComplete="current-inputUser"
                                        value={userInputName}
                                        onChange={(event) => { setUserInputName(event.target.value) }} //whenever the text field change, you save the value in state
                                    />
                                    <Button
                                        onClick={userClick}
                                    >
                                        Login
                                    </Button>
                                </form>
                            </div>
                            <Typography variant="body1">Current user: {user.playerName}</Typography>
                            <div>
                            </div>
                            <br />
                            <br />

                        </div>
                        <Typography variant="h5">Games</Typography>

                        <div className={styles.container} >
                            {games.map((game, index) =>
                                <GameComponent key={"game" + index} game={game} />
                            )
                            }
                        </div>

                    </div >
                    :
                    <div />
            }
        </div >
    )
}

export default GamesComponent


