import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://prueba-crud-laravel.onrender.com";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await axios.get(API_URL);
    setUsuarios(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { nombre, email });
      setEditId(null);
    } else {
      await axios.post(API_URL, { nombre, email });
    }
    setNombre("");
    setEmail("");
    fetchUsuarios();
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsuarios();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#001f3b] via-[#0c476f] to-[#011931] p-4">
      <div className="bg-white/5 shadow-2xl rounded-3xl max-w-2xl w-full p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 drop-shadow">CRUD Usuarios</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 justify-center"
        >
          <input
            className="flex-1 px-4 py-2 rounded-lg border border-[#005f7f] bg-white/80 text-slate-900 placeholder:text-slate-500 shadow focus:outline-none focus:ring-2 focus:ring-[#247a9d]"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <input
            className="flex-1 px-4 py-2 rounded-lg border border-[#005f7f] bg-white/80 text-slate-900 placeholder:text-slate-500 shadow focus:outline-none focus:ring-2 focus:ring-[#247a9d]"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
           style={{ cursor: "pointer" }}
            className="px-5 py-2 rounded-lg bg-[#247a9d] text-white font-semibold shadow hover:bg-[#005f7f] transition"
            type="submit"
          >
            {editId ? "Actualizar" : "Crear"}
          </button>
        </form>

        {/* MOBILE: Cards */}
        <div className="md:hidden flex flex-col gap-5">
          {usuarios.length === 0 ? (
            <div className="bg-white/70 rounded-xl p-5 text-center text-slate-400 shadow">
              Sin usuarios registrados.
            </div>
          ) : (
            usuarios.map(u => (
              <div key={u.id} className="bg-white/70 rounded-xl p-5 shadow flex flex-col gap-2 border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-300 pb-2 mb-2">
                  <span className="text-xs font-semibold text-slate-500">ID:</span>
                  <span className="text-sm font-bold text-slate-800">{u.id}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-300 pb-2 mb-2">
                  <span className="text-xs font-semibold text-slate-500">Nombre:</span>
                  <span className="text-sm text-slate-800">{u.nombre}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-300 pb-2 mb-2">
                  <span className="text-xs font-semibold text-slate-500">Email:</span>
                  <span className="text-sm text-slate-800 break-all">{u.email}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-[#05596c] text-white py-2 rounded-lg shadow hover:bg-[#004054] transition font-semibold cursor-pointer"
                    onClick={() => handleEdit(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-[#0c2b47] text-white py-2 rounded-lg shadow hover:bg-[#00152b] transition font-semibold cursor-pointer "
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white/70 text-slate-800 shadow rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#2a7194] text-white">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    Sin usuarios registrados.
                  </td>
                </tr>
              ) : (
                usuarios.map(u => (
                  <tr key={u.id} className="hover:bg-blue-50/50 transition border-b border-slate-300 last:border-none">
                    <td className="px-4 py-2">{u.id}</td>
                    <td className="px-4 py-2">{u.nombre}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">

                      <button
                       style={{ cursor: "pointer" }}
                        className="bg-[#05596c] text-white px-4 py-1 rounded-lg shadow hover:bg-[#004054] transition"
                        onClick={() => handleEdit(u)}
                      >
                        Editar
                      </button>
                      <button
                       style={{ cursor: "pointer" }}
                        className="bg-[#0c2b47] text-white px-4 py-1 rounded-lg shadow hover:bg-[#00152b] transition"
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="mt-8 text-white/70 text-sm">
        Powered by <span className="font-bold text-blue-300">React</span> & <span className="font-bold text-cyan-300">Tailwind CSS v4</span>
      </footer>
    </div>
  );
}
