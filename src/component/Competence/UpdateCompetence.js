import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import Select from 'react-select';
import CompetenceService from "../../services/competence.service";
import domaineService from "src/services/domaine.service";

export default class UpdateCompetence extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.updateCompetence = this.updateCompetence.bind(this);
    this.getCompetence = this.getCompetence.bind(this);

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
   this.getCompetence(this.props.competenceId.id);
   this.getDomaine();
  }
  onChangeCompetence(e){
    const competence = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompetence: {
          ...prevState.currentCompetence,
          nom: competence
        }
      };
    });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/competence/liste');
    }, 1000);
  }
  
  getCompetence(id) {
    CompetenceService.getCompetenceById(id)
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


  updateCompetence(e) {
    e.preventDefault();
    CompetenceService.updateCompetence(
      this.state.currentCompetence
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentCompetence: response.data,
            message: 'Modification bien prise en compte !',
            ifError: false
        });
        //redirection vers liste des rôles
        //this.redirectionApresValidation();
      })
      .catch(e => {
        this.setState({
            message: e.message,
            ifError: true
          });
        console.log(e);
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

  render() {
    const { currentCompetence, domaines, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form name="updateCompetenceForm" onSubmit={this.updateCompetence}>
              <div className="form-group">
                <label htmlFor="nom">Nom de la compétence</label>
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
                Modifier
              </CButton>
            </form>
            
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}