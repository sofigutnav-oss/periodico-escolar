import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

import { db } from "./firebase/config";

export default function PeriodicoEscolar() {

  const [noticias, setNoticias] = useState([]);
  const [revistas, setRevistas] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    obtenerNoticias();
    obtenerRevistas();
  }, []);

  // OBTENER NOTICIAS
  const obtenerNoticias = async () => {

    const querySnapshot = await getDocs(
      collection(db, "noticias")
    );

    const datos = [];

    querySnapshot.forEach((doc) => {
      datos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setNoticias(datos);
  };

  // OBTENER REVISTAS
  const obtenerRevistas = async () => {

    const querySnapshot = await getDocs(
      collection(db, "revistas")
    );

    const datos = [];

    querySnapshot.forEach((doc) => {
      datos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setRevistas(datos);
  };

  // GUARDAR NOTICIA
  const guardarNoticia = async () => {

    if (!titulo || !descripcion || !imagen) {
      alert("Completa todos los campos");
      return;
    }

    await addDoc(collection(db, "noticias"), {
      titulo,
      descripcion,
      imagen,
      fecha: new Date(),
    });

    setTitulo("");
    setDescripcion("");
    setImagen("");

    obtenerNoticias();
  };

  // GALERÍA
  const galeria = [

    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',

    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',

    'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop',

    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
  ];

  return (

    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* HEADER */}
      <header className="bg-blue-950 text-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-extrabold">
              Secundaria y Bachilleres Catemaco
            </h1>

            <p className="text-blue-200 mt-1">
              Periódico y Anuario Escolar
            </p>

          </div>

          <nav className="hidden md:flex gap-8 text-lg">

            <a href="#inicio" className="hover:text-yellow-300 transition">
              Inicio
            </a>

            <a href="#noticias" className="hover:text-yellow-300 transition">
              Noticias
            </a>

            <a href="#revistas" className="hover:text-yellow-300 transition">
              Revistas
            </a>

            <a href="#galeria" className="hover:text-yellow-300 transition">
              Galería
            </a>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl px-6 text-white">

          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            Bienvenidos a Campus News
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Noticias, revistas y recuerdos de nuestra comunidad escolar.
          </p>

          <a
            href="#noticias"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl font-bold text-lg transition shadow-xl"
          >
            Explorar Noticias
          </a>

        </div>

      </section>

      {/* FORMULARIO */}
      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold mb-8 text-center text-blue-950">
            Publicar Noticia
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 h-40 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="text"
              placeholder="URL de imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <button
              onClick={guardarNoticia}
              className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-4 rounded-2xl transition w-full text-lg font-semibold"
            >
              Publicar noticia
            </button>

          </div>

        </div>

      </section>

      {/* NOTICIAS */}
      <section
        id="noticias"
        className="py-24 px-6"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-extrabold text-blue-950 mb-5">
              Últimas Noticias
            </h2>

            <p className="text-gray-600 text-xl">
              Mantente informado sobre las actividades escolares.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {noticias.map((noticia) => (

              <div
                key={noticia.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
              >

                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="h-64 w-full object-cover"
                />

                <div className="p-7">

                  <h3 className="text-2xl font-bold mb-4 text-blue-950">
                    {noticia.titulo}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {noticia.descripcion}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* REVISTAS */}
      <section
        id="revistas"
        className="py-24 px-6 bg-white"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-extrabold text-blue-950 mb-5">
              Revistas Escolares
            </h2>

            <p className="text-gray-600 text-xl">
              Explora nuestras ediciones digitales.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {revistas.map((revista) => (

              <div
                key={revista.id}
                className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
              >

                <img
                  src={revista.portada}
                  alt={revista.titulo}
                  className="h-96 w-full object-cover bg-white"
                />

                <div className="p-7">

                  <h3 className="text-2xl font-bold mb-4 text-blue-950">
                    {revista.titulo}
                  </h3>

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {revista.descripcion}
                  </p>

                  <div className="flex gap-4 flex-wrap">

                    <a
                      href={revista.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-2xl transition font-semibold"
                    >
                      Ver Revista
                    </a>

                    <a
                      href={revista.pdf}
                      download
                      className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-2xl transition font-semibold"
                    >
                      Descargar
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* GALERÍA */}
      <section
        id="galeria"
        className="py-24 px-6"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-extrabold text-blue-950 mb-5">
              Galería Escolar
            </h2>

            <p className="text-gray-600 text-xl">
              Revive los mejores momentos escolares.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {galeria.map((img, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
              >

                <img
                  src={img}
                  alt="Galería"
                  className="h-80 w-full object-cover"
                />

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-300 py-16 mt-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h3 className="text-3xl font-bold mb-4 text-white">
            Campus News
          </h3>

          <p className="mb-3 text-lg">
            Periódico y Anuario Escolar Digital
          </p>

          <p className="text-gray-500">
            © 2026 Todos los derechos reservados.
          </p>

        </div>

      </footer>

    </div>
  );
}