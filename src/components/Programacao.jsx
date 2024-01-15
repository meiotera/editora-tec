import React from "react";
import { Link } from "react-router-dom";

const Programacao = ({ livros }) => (
  <main className="principal">
    <h2>Categoria Programação</h2>
    {livros
      .filter((cat) => cat.categoria === "programacao")
      .map((livro) => (
        <div className="card">
          <div className="thumb">
            <img
              src={"/imagens/capas/" + livro.id + ".jpg"}
              alt="Thumbnail da capa do livro"
            />
          </div>
          {livros
            .filter((c) => c.slug === livro.slug)
            .map((livro) => (
              <Link to={`/livro/${livro.slug}`}>
                {
                  <div className="detalhes">
                    <h3>{livro.titulo}</h3>
                    <p>{livro.descricao.slice(0, 138) + "..."}</p>
                    <p>Leia mais &gt;</p>
                  </div>
                }
              </Link>
            ))}
        </div>
      ))}
  </main>
);

export default Programacao;