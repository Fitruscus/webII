import { useState } from "react"
import {useEffect} from "react";
import { Container } from "@mui/material";
import BookForm from "./components/BookForm";
import Typography from "@mui/material/Typography";
import Booklist from "./components/Booklist";
import SearchBar from "./components/SearchBar";


const App=()=> {
  const [libros, setLibros] = useState([]);
  const [filtro,setfiltro] = useState("");
  const [nuevoLibro,setNuevoLibro]=useState({titulo:"",autor:"",anio:""});
  const obtenerLibros = async () => 
    {
      const response = await fetch("http://localhost:3000/libros");
      const data = await response.json();
      setLibros(data);

    }
    useEffect(() => {
      obtenerLibros();
  }, []);
    const handlechange=(e) => {setNuevoLibro({...nuevoLibro,[e.target.name]:e.target.value})}
    const agregarLibro = async (e) => {
      if(!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.anio) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      await fetch("http://localhost:3000/libros"), 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoLibro)

      }
    }
    setNuevoLibro({titulo:"",autor:"",anio:""});
    obtenerLibros();
    //Eliminar libro
    const eliminarLibro = async (id) => {
      await fetch(`http://localhost:3000/libros/${id}`, {
        method: "DELETE"
      });
      obtenerLibros();
    }
  
    //buscar
    const handleBuscar = (e) => {
      setfiltro(e.target.value);
    }
    const librosFiltrados = libros.filter(libro => 
      libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      libro.autor.toLowerCase().includes(filtro.toLowerCase())
    );
    const handleClear = () => {
      setfiltro('');
    }    
return(
  <>
    <Container maxWidth='md'sx ={{mt:4}}>
    <Typography variant="h4" align="center" gutterBottom>MI PRIMERA APLICACION EN REACT</Typography>
    </Container>
    <SearchBar
    search={filtro}
    onSearchChange={handleBuscar}
    onClear={handleClear}
    />
    <BookForm
    libro={nuevoLibro}
    onchange={handlechange}
    onsubmit={agregarLibro}
     >

    </BookForm>

   <Booklist
    libros={librosFiltrados}
    onDelete={eliminarLibro}
    >

    </Booklist>

  </>
)
}
export default App;