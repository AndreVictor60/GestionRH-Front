import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RoleService from "../../services/role.service";

class ListRole extends Component {
    constructor(props) {
        super(props);
        this.retrieveRole = this.retrieveRole.bind(this);
        this.state = {
          roles: []
        };
    }

    componentDidMount() {
        this.retrieveRole();
    }

    retrieveRole() {
        RoleService.getAllRoles()
        .then(response => {
          this.setState({
            roles: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    ifdelete(role){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer se rôle : '"+role.titre+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteRole(role.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
    }

    deleteRole(id) {
      RoleService.deleteById(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveRole: response.data,//suppression OK
            roles: this.state.roles.filter(r => r.id !== id)
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
      const { roles } = this.state;
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
                  {roles.map( role => 
                      <tr key={role.id}>
                          <td>{role.titre}</td>
                          <td><Link to={"/role/modification/" + role.id}>Modifier</Link> / <Link onClick={() => this.ifdelete(role)}>Supprimer</Link></td>
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

export default ListRole;