/*import React, { Component } from "react";

export default class AllSongs extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      artista: "",
      idtema: 0,
      sonido: "",
      imagen: "",
      songs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  addSong(e) {
    fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        M.toast({ html: "Guardado" });
        this.setState({
          nombre: "",
          artista: "",
          idtema: 0,
          sonido: "",
          imagen: "",
        });
        this.fetchSongs();
      })
      .catch((err) => console.error(err));
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs() {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ songs: data });
        //console.log(data[0]);
      });
  }

  deleteSong(id) {
    if (confirm("Seguro que quieres eliminarla?")) {
      //console.log('Eliminando: '+ id);
      fetch(`/api/songs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Eliminado" });
          this.fetchSongs();
        });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addSong}>
                    <div className="row">
                      <div className="input-field col-s12"></div>
                      <input
                        name="nombre"
                        value={this.state.nombre}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Nombre"
                      />
                    </div>
                    <div className="row">
                      <div className="input-field col-s12"></div>
                      <textarea
                        name="artista"
                        value={this.state.artista}
                        onChange={this.handleChange}
                        placeholder="Artista"
                        className="materialize-textarea"
                      ></textarea>
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
                    (console.log(this.state.songs),
                    this.state.songs.length > 0 ? (
                      this.state.songs.map((song) => {
                        return (
                          <tr key={song.idtema}>
                            <td>{song.nombre}</td>
                            <td>{song.artista}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { useState} from "react";

const Planets = ()  => {
  const  [hasError, setErrors] =  useState(false),
  const  [planets,setPlanets ] =  useState({}),
  const  [name, setNombre  ] =  useState(""),
  const  [artista, setArtista] =  useState(""),
  const  [idtema, setIdtema  ] =  useState(0),
  const  [sonido, setSonido  ] =  useState(""),
  const  [imagen, setImagen  ] =  useState(""),
  const  [songs, setSongs  ] =  useState([]),


  componentDidMount() {
    fetch("/api/songs")
      .then(res => res.json())
      .then(res => this.setState({ songs: res }))
      .catch(() => this.setState({ hasErrors: true }));
  }
 
  return (
     <div>{JSON.stringify(songs)}</div>
  )
}

export default  Planets;
*/
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function AllSongs() {
  const [hasErrors, setErrors] = useState(false);
  /*const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [id, setId] = useState(0);
  const [audio, setAudio] = useState("");
  const [cover, setCover] = useState("");
  const [color, setColor] = useState([]);*/
  const [allsongs, setAllsongs] = useState([]);

  async function fetchData() {
    const res = await fetch("/api/songs");
    res
      .json()
      .then((res) => setAllsongs(res))
      .catch((err) => setErrors(err));
  }
  useEffect(() => {
    fetchData();
    // console.log(allsongs);
  });

  return JSON.stringify(allsongs);
}
export default AllSongs;
