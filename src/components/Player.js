class Player extends Component {
    constructor() {
        let choices = {
            1:false,
            2:false,
            3:false,
            4:false
        }
        let lvl = 0;
    }

    toggleChoice(choice) {
        this.setState(prevState => {
            const updatedChoices = this.getUpdatedChoices(prevState.choices, choice);
            return { choices: updatedChoices };
        });
    }

    getUpdatedChoices(choices, choice) {
        return {
            ...choices,
            [choice]: !choices[choice]
        };
    }

    resetChoices() {
        this.setState({
            choices: {
                1: false,
                2: false,
                3: false,
                4: false
            }
        });
    }
}

export default Player;