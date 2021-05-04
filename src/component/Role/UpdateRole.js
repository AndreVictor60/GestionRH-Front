import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import RoleService from "../../services/role.service";

export default class UpdateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.getRole = this.getRole.bind(this);

    this.state = {
        currentRole: {
          id: null,
          titre: ""
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
   this.getRole(this.props.roleId.id);
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

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/role/liste');
    }, 1000);
  }
  
  getRole(id) {
    RoleService.getRoleById(id)
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


  updateRole() {
    RoleService.updateRole(
      this.state.currentRole
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentRole: response.data,
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
    const { currentRole, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="role">Nom du rôle</label>
                <input type="text" className="form-control" id="role" value={currentRole.titre} onChange={this.onChangeRole}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateRole}>
                Modifier
            </CButton>
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}