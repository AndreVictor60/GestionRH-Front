import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PosteService from "../../services/poste.service";

/*function compareDateStringWithDateCurrent(string){
  let datePoste = new Date(string).getTime();
  let dateCurrent = new Date().getTime();
  if(datePoste < dateCurrent){
    return false;
  }else{
    return true;
  }
}*/

class ListPoste extends Component {
  constructor(props) {
    super(props);
    //this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.getPoste = this.getPoste.bind(this);
    this.getCurrentPoste = this.getCurrentPoste.bind(this);
    this.onchangeAllPoste = this.onchangeAllPoste.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      sortBy: "id",
      order: "DESC",
      postes: []
    };
  }

  componentDidMount() {
    this.getCurrentPoste();
  }

  /* onChangeSearchTitle(e) {
     const searchTitle = e.target.value;
 
     this.setState({
       searchTitle: searchTitle
     });
   }*/

  getPoste() {
    PosteService.getAllPoste()
      .then(response => {
        this.setState({
          postes: response.data
        });
        console.log("response.data", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCurrentPoste() {
    PosteService.getAllCurrentPoste(this.state.sortBy,this.state.order)
      .then(response => {
        this.setState({
          postes: response.data
        });
        console.log("response.data", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onchangeAllPoste(){
    if(document.getElementById("allPosteCurrentPoste").checked){
      this.getPoste();
    }else{
      this.getCurrentPoste();
    }
  }

  /*searchTitle() {
      SalariesService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/
  triPar(sort){
    //TODO: De base poste en cours et checkbox pour archive
    /*if(this.state.sortBy === sort){
      if(this.state.order === "DESC"){
        this.setState({
          order: "ASC"
        });
      }else{
        this.setState({
          order: "DESC"
        });
      }
    }else{
      this.setState({
        sortBy: sort,
        order: "ASC"
      });
    }
    this.onchangeAllPoste();
    console.log("this sortBy : ",this.state.sortBy," || sort : ",sort," || this order : ", this.state.order);*/
  }

  render() {
    const { postes } = this.state;
    console.log("postes : ", postes)
    
    return (
      <>
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="form-group form-check">
              <input type="checkbox" value="1" className="form-check-input" id="allPosteCurrentPoste" onChange={this.onchangeAllPoste} />
              <label className="form-check-label" htmlFor="allPosteCurrentPoste">Afficher l'historique des postes</label>
            </div>
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th onClick={() => this.triPar("nom")}>Nom prénom</th>
                  <th onClick={() => this.triPar("titrePoste.intitule")}>Poste</th>
                  <th onClick={() => this.triPar("typeContrat.type")}>Type de contrat</th>
                  <th onClick={() => this.triPar("manager.nom")}>Manager</th>
                  <th onClick={() => this.triPar("salarie.entreprise.nom")}>Entreprise</th>
                  <th onClick={() => this.triPar("maitreAppretissage.nom")}>Maitre d'apprentissage</th>
                  <th onClick={() => this.triPar("dateFin")}>Date du contrat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {postes.map(poste =>
                  <tr key={poste.id}>
                    <td>{poste.salarie.nom + " " + poste.salarie.prenom + " ("+poste.id+")"}</td>
                    <td>{poste.titrePoste.intitule}</td>
                    <td>{poste.typeContrat.type}</td>
                    <td>{poste.manager != null ? poste.manager.nom + " " + poste.manager.prenom : ""}</td>
                    <td>{poste.salarie.entreprise.nom}</td>
                    <td>{poste.maitreAppretissage != null ? poste.maitreAppretissage.nom + " " + poste.maitreAppretissage.prenom : ""}</td>
                    <td>{poste.dateDebut + " - " + poste.dateFin}</td>
                    <td><Link to={"/poste/modification/" + poste.id}><CButton className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link></td>
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

export default ListPoste;