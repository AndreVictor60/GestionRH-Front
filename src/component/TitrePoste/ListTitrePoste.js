import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import TitrePosteService from "../../services/titre-poste.service";

class ListTitrePoste extends Component {
    constructor(props) {
        super(props);
        this.retrieveTitrePoste = this.retrieveTitrePoste.bind(this);
        this.state = {
          titresPostes: []
        };
    }

    componentDidMount() {
        this.retrieveTitrePoste();
    }

    retrieveTitrePoste() {
        TitrePosteService.getAllTitrePoste()
        .then(response => {
          this.setState({
            titresPostes: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    ifdelete(titrePoste){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer cet intitulé de poste : '"+titrePoste.intitule+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteTitrePoste(titrePoste.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
    }

    deleteTitrePoste(id) {
      TitrePosteService.deleteTitrePosteById(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveRole: response.data,//suppression OK
            titresPostes: this.state.titresPostes.filter(tp => tp.id !== id)
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
      const { titresPostes } = this.state;
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
                  {titresPostes.map( titrePoste => 
                      <tr key={titrePoste.id}>
                          <td>{titrePoste.intitule}</td>
                          <td><Link to={"/titre-poste/modification/" + titrePoste.id}>Modifier</Link> / <Link onClick={() => this.ifdelete(titrePoste)}>Supprimer</Link></td>
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

export default ListTitrePoste;