import { CButton, CAlert } from "@coreui/react";
import React, { Component } from "react";
import ComptenceService from "../../services/competence.service";
import Select from 'react-select';
import domaineService from "src/services/domaine.service";
import { withRouter } from "react-router-dom";

class CreateCompetence extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.CreateCompetence = this.CreateCompetence.bind(this);
    this.getDomaine = this.getDomaine.bind(this);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);

    this.state = {
      domaines: [],
       currentCompetence: {
        id: null,
        nom: "",
        domaines:{
          id: null
        }
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
    this.getDomaine();
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

  getDomaine() {
    domaineService.getAllDomaine()
    .then(response => {
      this.setState({
        domaines: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  onChangeDomaine(e) {
  /**
   * TODO: Required min 1
   */
  console.log(e.length)

  this.setState((prevState) => ({
    currentCompetence: {
      ...prevState.currentCompetence,
      domaines: e,
    },
  }));
  }

  CreateCompetence(e) {
    e.preventDefault();
    console.log("reponse : ",this.state.currentCompetence);
    const json = JSON.stringify(this.state.currentCompetence).split('"value":').join('"id":');
    console.log("reponse json : ",json);
    const data = JSON.parse(json);
    ComptenceService.saveCompetence( data )
      .then(response => {
        //console.log("reponse : ",response.data);
        this.setState({
            currentCompetence: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de compétence.",
            ifError: false
        });
        this.props.history.push("/competence/liste");
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
    const { currentCompetence, domaines, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form name="createCompetenceForm" onSubmit={this.CreateCompetence}>
              <div className="form-group">
                <label htmlFor="nom">Créer une nouvelle compétence</label>
                <input type="text" className="form-control" id="nom" value={currentCompetence.nom} onChange={this.onChangeCompetence}/>
              </div>
              
              <div className="form-group">
                <label htmlFor="skills">Domaines *</label>
                <Select 
                  name="domaines"
                  placeholder="Liste des domaines"
                  value={currentCompetence.domaine}
                  options={domaines.map(e => ({ label: e.titre, value: e.id}))}
                  onChange={this.onChangeDomaine}
                  isMulti
                  required
                />
              </div>
              <CButton type="submit" block  color="info">
                Créer
              </CButton>
            </form>
            
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}

export default withRouter(CreateCompetence);