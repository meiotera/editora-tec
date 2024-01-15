import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Topo from "./components/Topo";
import Home from "./components/Home";
import Frontend from "./components/Frontend";
import Programacao from "./components/Programacao";
import Catalogo from "./components/Catalogo";
import NotFound from "./components/NotFound";
import Rodape from "./components/Rodape";
import Design from "./components/Design";
import Livro from "./components/Livro";

import "./index.css";

class App extends Component {
  state = {
    livros: [],
    erro: null,
  };

  async componentDidMount() {
    // fetch("/api/todosOsLivros.json")
    //   .then((response) => response.json())
    //   .then((livros) => this.setState({ livros }))
    //   .catch((err) => console.log(err));
    try {
      const { data: livros } = await axios.get("/api/todosOsLivros.json");
      this.setState({ livros });
    } catch (error) {
      console.log(error);
      this.setState({ erro: "Mensagem de erro: " });
    }
  }

  render() {
    return (
      <>
        <Topo />
        {this.state.erro ? (
          <p className="erro">{this.state.erro}</p>
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={<Home livros={this.state.livros} />}
            />
            <Route
              exact
              path="/frontend"
              element={<Frontend livros={this.state.livros} />}
            />
            <Route
              exact
              path="/programacao"
              element={<Programacao livros={this.state.livros} />}
            />
            <Route
              exact
              path="/design"
              element={<Design livros={this.state.livros} />}
            />
            <Route
              exact
              path="/catalogo"
              element={<Catalogo livros={this.state.livros} />}
            />
            <Route
              path="/livro/:livroSlug"
              element={<LivroPage livros={this.state.livros} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}

        <Rodape />
      </>
    );
  }
}

function LivroPage({ livros }) {
  const params = useParams("/livro/:livroSlug");

  const livro = livros.find((livro) => livro.slug === params.livroSlug);

  if (livro) {
    return <Livro livro={livro} />;
  } else {
    return <NotFound />;
  }
}

export default App;
