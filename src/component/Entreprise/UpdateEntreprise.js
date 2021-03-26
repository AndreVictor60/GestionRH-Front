//import { CButton } from "@coreui/react";
import React, { Component } from "react";
import EntreprisesService from "../../services/entreprises.service";
import AdressesService from "../../services/adresses.service";
import { CButton, CSelect } from "@coreui/react";

export default class Adresse extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.getEntreprise = this.getEntreprise.bind(this);
    this.getAllAdresses = this.getAllAdresses.bind(this);
    this.updateEntreprise = this.updateEntreprise.bind(this);
    //this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
        adresses: [],
        currentEntreprise: {
            id: null,
            nom: "",
            adresse: {
                id: null
            },
            version: null
        },
        errors: [],
        message: ""
    };
  }

  componentDidMount() {
   this.getEntreprise(this.props.entrepriseid.id);
   this.getAllAdresses();
  }

  componentDidUpdate(){
    console.log("Nouveau state",this.state)
  }

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(prevState => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          nom: nom
        }
    }));
  }

  onChangeAdresse(e) {
    const idAdresse = e.target.value;
    console.log(idAdresse);
    this.setState(prevState => ({
        currentEntreprise: {
        ...prevState.currentEntreprise,
        adresse: {
            id: idAdresse
        } 
      }
    }));
    
  }
  
  getEntreprise(id) {
    EntreprisesService.getEntrepriseById(id)
      .then(response => {
        this.setState({
            currentEntreprise: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllAdresses() {
    AdressesService.getAllAdresse()
    .then(response => {
      this.setState({
        adresses: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}


  updateEntreprise() {
    EntreprisesService.update(
      this.state.currentEntreprise
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentEntreprise: response.data,
            message: "Modification bien prise en compte !"
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
    const { currentEntreprise, adresses } = this.state;
    return (
        <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" className="form-control" id="nom" value={currentEntreprise.nom} onChange={this.onChangeNom}/>
              </div>
              
              <div className="form-group">
                    <CSelect value={currentEntreprise.adresse.id} custom name="adresse" id="adresse" onChange={this.onChangeAdresse}>
                        <option  disabled value="0">Veuillez sélectionner une adresse</option>
                            {adresses.map((adresse) => (
                            <option value={adresse.id}>{adresse.numero + " " + adresse.voie + " " +adresse.ville}</option>
                            ))}
                    </CSelect>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateEntreprise}>
                Modifier
            </CButton>
            <p>{this.state.message}</p>
          </div>
        </div>
    );
  }
}

/**
 * TODO :
 * 
 *  Select Adresse faut le trier par VILLE 
 *  Vérifier si l'adresse existe bien
 */