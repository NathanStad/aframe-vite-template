class Player {
    constructor() {
        this.state = {
            choices: {
                1: false,
                2: false,
                3: false,
                4: false
            },
            lvl: 0
        };
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

    getChoices() {
        return this.state.choices;
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

    toggleLevel() {
        this.setState(prevState => ({
            lvl: prevState.lvl === 0 ? 1 : 0
        }));
    }

    getLevel() {
        return this.state.lvl;
    }
}

export default Player;