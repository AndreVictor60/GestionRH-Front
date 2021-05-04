import { CButton, CAlert } from "@coreui/react";
import React, { Component } from "react";
import ComptenceService from "../../services/competence.service";

export default class CreateCompetence extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.CreateCompetence = this.CreateCompetence.bind(this);
    this.getCompetence = this.getCompetence.bind(this);

    this.state = {
        currentCompetence: {
        id: null,
        nom: ""
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
   
  }
  onChangeCompetence(e){
    const comptepence = e.target.value;
    
    this.setState(function(prevState) {
      return {
        currentCompetence: {
          ...prevState.currentCompetence,
          nom: comptepence
        }
      };
    });
  }
  
  getCompetence(id) {
    ComptenceService.getCompetenceById(id)
      .then(response => {
        this.setState({
            currentCompetence: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/competence/liste');
    }, 1000);
  }

  CreateCompetence() {
    console.log("reponse : ",this.state.currentCompetence);
    ComptenceService.saveCompetence(
      this.state.currentCompetence
    )
      .then(response => {
        //console.log("reponse : ",response.data);
        this.setState({
            currentCompetence: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de compétence.",
            ifError: false
        });
        //redirection vers liste des rôles
        this.redirectionApresValidation();
      })
      .catch(e => {
        this.setState({
            message: e.message,
            ifError: true
          });
        console.log(e);
      });
  }

  render() {
    const { currentCompetence, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="nom">Créer une nouvelle compétence</label>
                <input type="text" className="form-control" id="nom" value={currentCompetence.nom} onChange={this.onChangeCompetence}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.CreateCompetence}>
                Créer
            </CButton>
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}