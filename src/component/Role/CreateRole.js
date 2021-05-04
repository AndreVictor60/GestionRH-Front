import { CButton } from "@coreui/react";
import React, { Component } from "react";
import RoleService from "../../services/role.service";

export default class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.createRole = this.createRole.bind(this);
    this.getRole = this.getRole.bind(this);

    this.state = {
        currentRole: {
        id: null,
        titre: ""
      },
      message: ""
    };
  }

  componentDidMount() {
   
  }
  onChangeRole(e){
    const role = e.target.value;
    
    this.setState(function(prevState) {
      return {
        currentRole: {
          ...prevState.currentRole,
          titre: role
        }
      };
    });
  }
  
  getRole(id) {
    RoleService.getRole(id)
      .then(response => {
        this.setState({
            currentRole: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/role/liste');
    }, 1000);
  }

  createRole() {
    RoleService.saveRole(
      this.state.currentRole
    )
      .then(response => {
        //console.log("reponse : ",response.data);
        this.setState({
            currentRole: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de role."
        });
        //redirection vers liste des rôles
        this.redirectionApresValidation();
      })
      .catch(e => {
        this.setState({
            message: e.message
          });
        console.log(e);
      });
  }

  render() {
    const { currentRole } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="titre">Créer un nouveau rôle</label>
                <input type="text" className="form-control" id="titre" value={currentRole.titre} onChange={this.onChangeRole}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.createRole}>
                Créer
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}