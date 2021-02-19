import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Deck.css";
import axios from 'axios';


// create a page to view deck one cards, and create a get request to our DB
// upon component did mount GET all cards in deck 1
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      editMode: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAcceptUpdate = this.handleAcceptUpdate.bind(this);
  }
     
  componentDidMount() {
    const {deckNumber} = this.props.location.state;
    console.log(deckNumber);

    axios.get(`/deck/${deckNumber}`)
      .then((res) => {
        console.log("res: ", res);
        const editArray = new Array(res.data.length + 1).fill(false);
        this.setState({deck: res, editMode: editArray});
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }


  handleDelete(id) {
    axios.delete(`/card/delete/${id}`, { data: { source: id } })
      .then(deletedNum => {
        console.log(`Successfully deleted ${deletedNum.data} card[s]`);
        const {deckNumber} = this.props.location.state;

        axios.get(`/deck/${deckNumber}`)
          .then((res) => {
            this.setState({...this.state, deck: res});
          })
          .catch((err) => {
            console.log("err: ", err);
          })
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }


  handleUpdate(id) {
    let newEditMode = this.state.editMode;
    newEditMode[id] = !newEditMode[id];
    this.setState({
      ...this.state,
      editMode: newEditMode,
    })
    console.log(this.state)
  }

  handleAcceptUpdate(cid, id) {
    let newEditMode = this.state.editMode;
    newEditMode[id] = !newEditMode[id];

    const body = {
      term: this.refs.termInput.value,
      definition: this.refs.definitionInput.value,
    };

    axios.patch(`/card/patch/${cid}`, body)
      .then(updatedNum => {
        console.log(`Successfully updated ${updatedNum} card[s]`);
        const {deckNumber} = this.props.location.state;

        axios.get(`/deck/${deckNumber}`)
          .then((res) => {
            this.setState({deck: res, editMode: newEditMode});
          })
          .catch((err) => {
            console.log("err: ", err);
          })
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }


  
  render(){
    // iterate through the response array of objects (this.state.deck)
    // render a component for each card object
    // ### provide flashcard styling
    // ### provide flashcard functionality
    const componentsToRender = [];
    
    const inputArray = this.state.deck.data || [];
    console.log('input array', inputArray);
    
    inputArray.map((current, i) => {
      let cid = this.state.deck.data[i]._id;
      if (this.state.editMode[i]) {
        componentsToRender.push(
          <div key={cid} id={cid} className="flashcard">
            <div>
              <input ref="termInput" className="updateInputBar" type="text" defaultValue={current.term}></input>
            </div>
            <div>
              <input ref="definitionInput" className="updateInputBar" type="text" defaultValue={current.definition}></input>
            </div>
            <div className="d-flex flex-row justify-content-around">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleDelete(cid)}>
                delete card
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleAcceptUpdate(cid, i)}>
                k, w/e
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleUpdate(i)}>
                wait nvm
              </button>
            </div>
          </div>
        )
      }
      else {
        componentsToRender.push(
          <div key={cid} id={cid} className="flashcard">
            <h5 className="card-title">{current.term}</h5>
            <p className="card-text">{current.definition}</p>
            <div className="d-flex flex-row justify-content-around">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleDelete(cid)}>
                delete card
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleUpdate(i)}>
                update card
              </button>
            </div>
          </div>
        )
      }
    })
    return (
      <div className="cards">
        {componentsToRender}
      </div>
    )
  }
}


export default Deck;

