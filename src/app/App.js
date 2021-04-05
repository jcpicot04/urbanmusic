import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        fetch('/api', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Guardado'});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }

    deleteTask(id) {
       if(confirm('Seguro que quieres eliminarla?')){
         //console.log('Eliminando: '+ id);
         fetch(`/api/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        M.toast({html: 'Eliminado'});
        this.fetchTasks();
    })
       }
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                {/* NAVEGACIÓN */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Urban Music</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addTask}>
                                    <div className="row">
                                        <div className="input-field col-s12">
                                            </div>
                                                <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Título"/>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col-s12">
                                            </div>
                                            <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Descripcion" className="materialize-textarea"></textarea>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                    <i className="material-icons">edit</i>
                                                    </button>
                                                </td>   
                                            </tr>
                                        )})
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;