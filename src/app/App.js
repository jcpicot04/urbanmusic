import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            nom: '',
            numCanciones: '',
            numArtistas: '',
            canciones: [
                {nombre : '',
                 artista: '',
                idtema: 0,
                sonido: '',
                imagen: ''}
            ],
            songs: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    addSong(e) {
        fetch('/api/songs', {
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
                this.setState({
                    nom: '',
                    numCanciones: '',
                    numArtistas: '',
                    canciones: [
                        {nombre : '',
                         artista: '',
                        idtema: 0,
                        sonido: '',
                        imagen: ''}
                    ]});
                this.fetchSongs();
            })
            .catch(err => console.error(err));
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchSongs();
    }

    fetchSongs() {
        fetch('/api/songs')
            .then(res => res.json())
            .then(data => {
                this.setState({songs: data});
                //console.log(data[0]);
            });
    }

    deleteSong(id) {
       if(confirm('Seguro que quieres eliminarla?')){
         //console.log('Eliminando: '+ id);
         fetch(`/api/songs/${id}`, {
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
        this.fetchSongs();
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
                                <form onSubmit={this.addSong}>
                                    <div className="row">
                                        <div className="input-field col-s12">
                                            </div>
                                                <input name="nombre" value={this.state.canciones.nombre} onChange={this.handleChange} type="text" placeholder="Nombre"/>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col-s12">
                                            </div>
                                            <textarea name="artista" value={this.state.canciones.artista} onChange={this.handleChange} placeholder="Artista" className="materialize-textarea"></textarea>
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
                                        <th>Nombre</th>
                                        <th>Artista</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        console.log(this.state.songs),
                                        this.state.songs.length>0 ? 
                                        this.state.songs[0].canciones.map(song => {
                                            return (
                                                            <tr key={song.idtema}> 
                                                            <td>{song.nombre}</td>
                                                            <td>{song.artista}</td>
                                                            </tr>

                                                        
                                                       
                                                ) 
                                        }) : <tr><td>Cargando setState</td></tr>
                                                
                                            /*{key={song.canciones.map((_id) => <tr key="{_id}" className="_id">{_id}</tr>).toString()}>
                                                <td>{song.canciones.map((nombre) => <td key="{nombre}" className="nombre">{nombre}</td>).toString()}</td>
                                                <td>{song.canciones.map(artista => <td key="{artista}" className="artista">{artista}</td>).toString()}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => this.deleteSong(song._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                    <i className="material-icons">edit</i>
                                                    </button>
                                                </td>   
                                            </tr>
                                        )})*/
                                            
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