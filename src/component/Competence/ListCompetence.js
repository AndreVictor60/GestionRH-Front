import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CompetenceService from "../../services/competence.service";

class ListCompetence extends Component {
    constructor(props) {
        super(props);
        this.retrieveCompetence = this.retrieveCompetence.bind(this);
        this.state = {
          competences: []
        };
    }

    componentDidMount() {
        this.retrieveCompetence();
    }

    retrieveCompetence() {
        CompetenceService.getAllCompetence()
        .then(response => {
          this.setState({
            competences: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    ifdelete(competence){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer cette compétence : '"+competence.nom+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteCompetence(competence.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
    }

    deleteCompetence(id) {
        CompetenceService.deleteById(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveRole: response.data,//suppression OK
            competences: this.state.competences.filter(c => c.id !== id)
          });
        })
        .catch(e => {
          this.setState({
              message: e.message
            });
          console.log(e);
        });
    }

    render() {
      const { competences } = this.state;
      return (
          <>
          <div className="row mt-4">
            <div className="col-lg-12">
              <table className="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                      <th>Nom</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {competences.map( competence => 
                      <tr key={competence.id}>
                          <td>{competence.nom}</td>
                          <td><Link to={"/competence/modification/" + competence.id}>Modifier</Link> / <Link onClick={() => this.ifdelete(competence)}>Supprimer</Link></td>
                      </tr>
                    )}
                    </tbody>
                </table>
              </div>
          </div>
        </>
    );
      
  }
}

export default ListCompetence;