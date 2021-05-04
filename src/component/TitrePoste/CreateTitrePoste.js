import { CButton, CAlert } from "@coreui/react";
import React, { Component } from "react";
import TitrePosteService from "../../services/titre-poste.service";

export default class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitrePoste = this.onChangeTitrePoste.bind(this);
    this.createTitrePoste = this.createTitrePoste.bind(this);
    this.getTitrePoste = this.getTitrePoste.bind(this);

    this.state = {
        currentTitrePoste: {
        id: null,
        intitule: ""
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
   
  }
  onChangeTitrePoste(e){
    const titrePoste = e.target.value;
    
    this.setState(function(prevState) {
      return {
        currentTitrePoste: {
          ...prevState.currentTitrePoste,
          intitule: titrePoste
        }
      };
    });
  }
  
  getTitrePoste(id) {
    TitrePosteService.getTitrePosteById(id)
      .then(response => {
        this.setState({
            currentTitrePoste: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/titre-poste/liste');
    }, 1000);
  }

  createTitrePoste() {
    TitrePosteService.saveTitrePoste(
      this.state.currentTitrePoste
    )
      .then(response => {
        //console.log("reponse : ",response.data);
        this.setState({
            currentTitrePoste: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste des intitulés de poste.",
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
    const { currentTitrePoste, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="titre">Créer un nouveau intitulé de poste</label>
                <input type="text" className="form-control" id="titre" value={currentTitrePoste.intitule} onChange={this.onChangeTitrePoste}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.createTitrePoste}>
                Créer
            </CButton>
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}