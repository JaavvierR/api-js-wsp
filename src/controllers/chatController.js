const RagService = require('../services/ragService');
const path = require('path');

let documentChunks = null;

exports.initializeVectorStore = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../catalogo_.pdf');
    documentChunks = await RagService.processDocument(filePath);
    res.json({ 
      message: 'Documento inicializado correctamente',
      chunkCount: documentChunks.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!documentChunks) {
      return res.status(400).json({ message: 'Documento no inicializado. Ejecuta primero /init' });
    }

    const response = await RagService.generateResponse(question, documentChunks);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};