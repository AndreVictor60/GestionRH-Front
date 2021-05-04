import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import CompetenceService from "../../services/competence.service";

export default class UpdateCompetence extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.updateCompetence = this.updateCompetence.bind(this);
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
   this.getCompetence(this.props.competenceId.id);
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


  updateCompetence() {
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
                <label htmlFor="nom">Nom de la compétence</label>
                <input type="text" className="form-control" id="nom" value={currentCompetence.nom} onChange={this.onChangeCompetence}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateCompetence}>
                Modifier
            </CButton>
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}