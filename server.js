const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Base de datos simulada en memoria (Nuestra agenda)
let agendaItems = [
    { id: 1, titulo: 'Comprar insumos', descripcion: 'Ir al supermercado a buscar verduras y lácteos', completado: false },
    { id: 2, titulo: 'Estudiar APIs', descripcion: 'Probar rutas CRUD y documentar con Postman', completado: true }
];

// 1. READ (GET): Obtener todos los elementos
app.get('/api/agenda', (req, res) => {
    res.json(agendaItems);
});

// 2. CREATE (POST): Agregar un nuevo elemento
app.post('/api/agenda', (req, res) => {
    const nuevoItem = {
        id: Date.now(),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completado: false
    };
    agendaItems.push(nuevoItem);
    res.status(201).json({ mensaje: 'Elemento creado con éxito', item: nuevoItem });
});

// 3. UPDATE (PUT): Modificar un elemento existente
app.put('/api/agenda/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descripcion, completado } = req.body;
    
    let item = agendaItems.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ mensaje: 'Elemento no encontrado' });
    }

    if (titulo !== undefined) item.titulo = titulo;
    if (descripcion !== undefined) item.descripcion = descripcion;
    if (completado !== undefined) item.completado = completado;

    res.json({ mensaje: 'Elemento actualizado con éxito', item });
});

// 4. DELETE (DELETE): Eliminar un elemento
app.delete('/api/agenda/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = agendaItems.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Elemento no encontrado' });
    }

    agendaItems.splice(index, 1);
    res.json({ mensaje: 'Elemento eliminado con éxito' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});