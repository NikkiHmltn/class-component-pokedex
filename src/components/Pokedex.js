import { logDOM } from '@testing-library/react'
import React, {Component} from 'react'
import Axios from 'axios'

export default class Pokedex extends Component {
    constructor() {
        super()

        this.state = {
            pokemonName: 'pikachu',
            pokemonImage: ''
        }
    }

    componentDidMount() {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`).then((res) => {
            this.setState({
                pokemonImage: res.data.sprites.front_default
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.pokemonName === '') {
            return
        }

        if (prevState.pokemonName === this.state.pokemonName) {
            return
        }

        Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`).then((res) => {
            this.setState({
                pokemonImage: res.data.sprites.front_default
            })
        }).catch((err) => {
            this.setState({
                pokemonImage: ''
            })
        })
    }

    render() {
        return(
            <div>
                {/* input component 
                      
                      state to fovern the input component
                    
                    state to hold the image; this will be url string
                    that will become the src of an img tag 
                    img tag that references the image stored in state*/}
                <h1>Fischer-Price My First Pokedex</h1>
                <input value={this.state.pokemonName} onChange={(e) => {
                    this.setState({pokemonName: e.target.value.toLowerCase()})
                }} />
                <div>
                    <img src={this.state.pokemonImage} /> 
                </div>
                
            </div>
        )
    }
}