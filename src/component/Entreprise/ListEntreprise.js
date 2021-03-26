import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntreprisesService from "../../services/entreprises.service";

class ListEntreprise extends Component {
    constructor(props) {
      super(props);
      this.retrieveEntreprise = this.retrieveEntreprise.bind(this);
      this.state = {
        entreprises: []
      };
    }

    componentDidMount() {
        this.retrieveEntreprise();
    }

    retrieveEntreprise() {
        EntreprisesService.getAllEntreprises()
        .then(response => {
          this.setState({
            entreprises: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    render() {
        const { entreprises } = this.state;
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Complément</th>
                        <th>Ville</th>
                        <th>Pays</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {entreprises.map( entreprises => 
                        <tr key={entreprises.id}>
                            <td>{entreprises.nom}</td>
                            <td>{entreprises.adresse.numero + " " + entreprises.adresse.voie}</td>
                            <td>{entreprises.adresse.complementAdresse}</td>
                            <td>{entreprises.adresse.ville + " " + entreprises.adresse.codePostal}</td>
                            <td>{entreprises.adresse.pays}</td>
                            <td><Link to={"/entreprises/modification/" + entreprises.id}>Modifier</Link></td>
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

export default ListEntreprise;